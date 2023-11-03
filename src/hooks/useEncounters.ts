import { useReducer } from 'react';
import { Encounter } from '../interfaces/Encounter';

enum ActionType {
  ADD_ENCOUNTER = 'ADD_ENCOUNTER',
  DELETE_ENCOUNTER = 'DELETE_ENCOUNTER',
}

interface State {
  encounters: Encounter[];
}

interface Action {
  type: ActionType;
  payload: Encounter;
}

type Reducer = (state: State, action: Action) => State;

const reducers: {
  ADD_ENCOUNTER: Reducer;
  DELETE_ENCOUNTER: Reducer;
} = {
  ADD_ENCOUNTER(state, action) {
    return { encounters: [...state.encounters, action.payload] };
  },
  DELETE_ENCOUNTER(state, action) {
    return {
      encounters: state.encounters.filter(
        (encounter) => encounter.id !== action.payload.id
      ),
    };
  },
};

const reducer: Reducer = (state, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }
  return state;
};

interface EncounterUtilities {
  encounters: Encounter[];
  addEncounter: (encounter: Encounter) => void;
  deleteEncounter: (encounter: Encounter) => void;
}

export default function useEncounters(
  retrievedEncounters: Encounter[]
): EncounterUtilities {
  const initialState: State = { encounters: [...retrievedEncounters] };
  const [state, dispatch] = useReducer(reducer, initialState);

  const { encounters } = state;
  const addEncounter = (encounter: Encounter) => {
    dispatch({ type: ActionType.ADD_ENCOUNTER, payload: encounter });
  };
  const deleteEncounter = (encounter: Encounter) => {
    dispatch({ type: ActionType.DELETE_ENCOUNTER, payload: encounter });
  };

  return { encounters, addEncounter, deleteEncounter };
}
