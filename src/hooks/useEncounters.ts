import { useEffect, useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Encounter } from '../interfaces/Encounter';
import { getEncounters } from '../api/encounterRequests';

const ACTIONS = {
  SET_ENCOUNTERS: 'SET_ENCOUNTERS',
  ADD_ENCOUNTER: 'ADD_ENCOUNTER',
  UPDATE_ENCOUNTER: 'UPDATE_ENCOUNTER',
  DELETE_ENCOUNTER: 'DELETE_ENCOUNTER',
} as const;

type State = {
  encounters: Encounter[];
};

type Action =
  | { type: typeof ACTIONS.SET_ENCOUNTERS; encounters: Encounter[] }
  | { type: typeof ACTIONS.ADD_ENCOUNTER; encounter: Encounter }
  | { type: typeof ACTIONS.UPDATE_ENCOUNTER; encounter: Encounter }
  | { type: typeof ACTIONS.DELETE_ENCOUNTER; encounterId: number };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_ENCOUNTERS:
      return { encounters: action.encounters };

    case ACTIONS.ADD_ENCOUNTER:
      return { encounters: [...state.encounters, action.encounter] };

    case ACTIONS.UPDATE_ENCOUNTER:
      return {
        encounters: [
          ...state.encounters.filter(
            (encounter) => encounter.id !== action.encounter.id
          ),
          action.encounter,
        ],
      };

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

export default function useEncounters(): {
  encounters: Encounter[];
  addEncounter: (encounter: Encounter) => void;
  updateEncounter: (encounter: Encounter) => void;
  deleteEncounter: (encounterId: number) => void;
} {
  const initialState: State = { encounters: [] };
  const [state, dispatch] = useReducer(reducer, initialState);

  const setEncounters = (encounters: Encounter[]) => {
    dispatch({ type: ACTIONS.SET_ENCOUNTERS, encounters });
  };

  const addEncounter = (encounter: Encounter) => {
    dispatch({ type: ACTIONS.ADD_ENCOUNTER, encounter });
  };

  const updateEncounter = (encounter: Encounter) => {
    dispatch({ type: ACTIONS.UPDATE_ENCOUNTER, encounter });
  };

  const deleteEncounter = (encounterId: number) => {
    dispatch({ type: ACTIONS.DELETE_ENCOUNTER, encounterId });
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['encounters'],
    queryFn: () => getEncounters(),
  });

  // if (isLoading) console.log('LOADING');
  // if (isError) console.log(error.message);

  useEffect(() => {
    if (data) {
      setEncounters(data);
    }
  }, [data]);

  return {
    encounters: state.encounters,
    addEncounter,
    updateEncounter,
    deleteEncounter,
  };
}
