import { useReducer } from 'react';
import { Encounter } from '../interfaces/Encounter';

const ACTIONS = {
  ADD_ENCOUNTER: 'ADD_ENCOUNTER',
  DELETE_ENCOUNTER: 'DELETE_ENCOUNTER',
} as const;

type State = {
  encounters: Encounter[];
};

type Action =
  | { type: typeof ACTIONS.ADD_ENCOUNTER; encounter: Encounter }
  | { type: typeof ACTIONS.DELETE_ENCOUNTER; encounterId: number };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTIONS.ADD_ENCOUNTER:
      return { encounters: [...state.encounters, action.encounter] };

    case ACTIONS.DELETE_ENCOUNTER:
      return {
        encounters: state.encounters.filter(
          (encounter) => encounter.id !== action.encounterId
        ),
      };

    default:
      return state;
  }
};

export default function useEncounters(encounters: Encounter[]): {
  encounters: Encounter[];
  addEncounter: (encounter: Encounter) => void;
  deleteEncounter: (encounterId: number) => void;
} {
  const initialState: State = { encounters: [...encounters] };
  const [state, dispatch] = useReducer(reducer, initialState);

  const addEncounter = (encounter: Encounter) => {
    dispatch({ type: ACTIONS.ADD_ENCOUNTER, encounter });
  };

  const deleteEncounter = (encounterId: number) => {
    dispatch({ type: ACTIONS.DELETE_ENCOUNTER, encounterId });
  };

  return { encounters: state.encounters, addEncounter, deleteEncounter };
}
