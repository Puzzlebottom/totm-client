import { useReducer } from 'react';
import { Encounter } from '../interfaces/Encounter';

const enum ActionType {
  ADD_ENCOUNTER = 'ADD_ENCOUNTER',
  DELETE_ENCOUNTER = 'DELETE_ENCOUNTER',
}

type State = {
  encounters: Encounter[];
};

type Payload = Encounter | number;

type Action<T extends ActionType, P extends Payload> = {
  type: T;
  payload: P;
};

type Reducer<S extends State, A extends Action<ActionType, Payload>> = (
  state: S,
  action: A
) => S;

const reducer: Reducer<State, Action<ActionType, Payload>> = (
  state,
  action
) => {
  switch (action.type) {
    case ActionType.ADD_ENCOUNTER:
      return { encounters: [...state.encounters, action.payload as Encounter] };

    case ActionType.DELETE_ENCOUNTER:
      return {
        encounters: state.encounters.filter(
          (encounter) => encounter.id !== (action.payload as number)
        ),
      };

    default:
      return state;
  }
};

type EncounterUtilities = {
  encounters: Encounter[];
  addEncounter: (encounter: Encounter) => void;
  deleteEncounter: (encounterId: number) => void;
};

export default function useEncounters(
  encounters: Encounter[]
): EncounterUtilities {
  const initialState: State = { encounters: [...encounters] };
  const [state, dispatch] = useReducer(reducer, initialState);

  const addEncounter = (encounter: Encounter): void => {
    dispatch({ type: ActionType.ADD_ENCOUNTER, payload: encounter });
  };

  const deleteEncounter = (encounterId: number): void => {
    dispatch({ type: ActionType.DELETE_ENCOUNTER, payload: encounterId });
  };

  return { encounters: state.encounters, addEncounter, deleteEncounter };
}
