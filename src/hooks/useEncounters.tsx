import { useCallback, useEffect, useReducer } from 'react';
import { useQuery } from '@apollo/client';
import { getEncounters } from '../api/encounterRequests';
import { Encounter } from '../interfaces/Encounter';

const ACTIONS = {
  SET_ENCOUNTERS: 'SET_ENCOUNTERS',
  SET_DISPLAYED_ENCOUNTERS: 'SET_DISPLAYED_ENCOUNTERS',
  ADD_ENCOUNTER: 'ADD_ENCOUNTER',
  UPDATE_ENCOUNTER: 'UPDATE_ENCOUNTER',
  DELETE_ENCOUNTER: 'DELETE_ENCOUNTER',
  SELECT_ENCOUNTER: 'SELECT_ENCOUNTER',
  RUN_ENCOUNTER: 'RUN_ENCOUNTER',
} as const;

type State = {
  encounters: Encounter[];
  displayedEncounters: Encounter[];
  selectedEncounter: Encounter | null;
};

export type Action =
  | { type: typeof ACTIONS.SET_ENCOUNTERS; encounters: Encounter[] }
  | { type: typeof ACTIONS.SET_DISPLAYED_ENCOUNTERS; encounters: Encounter[] }
  | { type: typeof ACTIONS.ADD_ENCOUNTER; encounter: Encounter }
  | { type: typeof ACTIONS.UPDATE_ENCOUNTER; encounter: Encounter }
  | { type: typeof ACTIONS.DELETE_ENCOUNTER; encounterId: number }
  | { type: typeof ACTIONS.SELECT_ENCOUNTER; encounterId: number }
  | { type: typeof ACTIONS.RUN_ENCOUNTER; encounterId: number };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_ENCOUNTERS:
      return {
        ...state,
        encounters: action.encounters,
        displayedEncounters: action.encounters,
      };

    case ACTIONS.SET_DISPLAYED_ENCOUNTERS:
      return { ...state, displayedEncounters: action.encounters };

    case ACTIONS.ADD_ENCOUNTER:
      return {
        ...state,
        encounters: [...state.encounters, action.encounter],
        displayedEncounters: [...state.encounters, action.encounter],
      };

    case ACTIONS.UPDATE_ENCOUNTER:
      return {
        ...state,
        encounters: [
          ...state.encounters.filter(
            (encounter) => encounter.id !== action.encounter.id
          ),
          action.encounter,
        ],
        displayedEncounters: [
          ...state.encounters.filter(
            (encounter) => encounter.id !== action.encounter.id
          ),
          action.encounter,
        ],
      };

    case ACTIONS.DELETE_ENCOUNTER:
      return {
        ...state,
        encounters: state.encounters.filter(
          (encounter) => encounter.id !== action.encounterId
        ),
        displayedEncounters: state.displayedEncounters.filter(
          (encounter) => encounter.id !== action.encounterId
        ),
      };

    case ACTIONS.SELECT_ENCOUNTER:
      return {
        ...state,
        selectedEncounter:
          state.encounters.find(
            (encounter) => encounter.id === action.encounterId
          ) || null,
      };

    case ACTIONS.RUN_ENCOUNTER:
      return {
        ...state,
        encounters: state.encounters.map((encounter) => {
          if (encounter.id === action.encounterId) {
            return { ...encounter, isActive: true };
          }
          return encounter;
        }),
        displayedEncounters: [],
        selectedEncounter: null,
      };

    default:
      return state;
  }
};

export default function useEncounters(): {
  encounters: Encounter[];
  displayedEncounters: Encounter[];
  selectedEncounter: Encounter | null;
  addEncounter: (encounter: Encounter) => void;
  updateEncounter: (encounter: Encounter) => void;
  deleteEncounter: (encounterId: number) => void;
  selectEncounter: (encounterId: number) => void;
  filterEncounters: (encounters: Encounter[]) => void;
  runEncounter: (encounterId: number) => void;
} {
  const initialState: State = {
    encounters: [],
    displayedEncounters: [],
    selectedEncounter: null,
  };

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

  const selectEncounter = (encounterId: number) => {
    dispatch({ type: ACTIONS.SELECT_ENCOUNTER, encounterId });
  };

  const filterEncounters = useCallback((encounters: Encounter[]) => {
    dispatch({ type: ACTIONS.SET_DISPLAYED_ENCOUNTERS, encounters });
  }, []);

  const runEncounter = (encounterId: number) => {
    dispatch({ type: ACTIONS.RUN_ENCOUNTER, encounterId });
  };

  const { data } = useQuery(getEncounters);

  useEffect(() => {
    if (data) {
      setEncounters(data.allEncounters);
    }
  }, [data]);

  return {
    encounters: state.encounters,
    displayedEncounters: state.displayedEncounters,
    selectedEncounter: state.selectedEncounter,
    addEncounter,
    updateEncounter,
    deleteEncounter,
    selectEncounter,
    filterEncounters,
    runEncounter,
  };
}
