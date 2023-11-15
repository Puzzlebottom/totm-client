import { useEffect, useReducer, useRef } from 'react';
import { Encounter } from '../interfaces/Encounter';
import Trie from '../utilities/Trie';

type Props = {
  data: Encounter[];
  filterEncounters: (result: Encounter[]) => void;
  selectEncounter: (encounterId: number) => void;
};

export default function EncounterSearchBar({
  data,
  filterEncounters,
  selectEncounter,
}: Props) {
  const initialState: {
    searchValue: string;
    autocompleteValue: string;
    errorMessage: string;
    searchResults: Encounter[];
  } = {
    searchValue: '',
    autocompleteValue: '',
    errorMessage: '',
    searchResults: [],
  };

  const index = useRef<Trie>(new Trie());

  const ACTIONS = {
    UPDATE_SEARCH_VALUE: 'UPDATE_SEARCHVALUE',
    UPDATE_AUTOCOMPLETE: 'UPDATE_AUTOCOMPLETE',
    UPDATE_ERROR_MESSAGE: 'UPDATE_ERROR_MESSAGE',
    UPDATE_SEARCH_RESULTS: 'UPDATE_SEARCH_RESULTS',
  } as const;

  type Action =
    | { type: typeof ACTIONS.UPDATE_SEARCH_VALUE; value: string }
    | { type: typeof ACTIONS.UPDATE_AUTOCOMPLETE; value: string }
    | { type: typeof ACTIONS.UPDATE_ERROR_MESSAGE; value: string }
    | { type: typeof ACTIONS.UPDATE_SEARCH_RESULTS; value: Encounter[] };

  const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
      case ACTIONS.UPDATE_SEARCH_VALUE:
        return { ...state, searchValue: action.value };
      case ACTIONS.UPDATE_AUTOCOMPLETE:
        return { ...state, autocompleteValue: action.value };
      case ACTIONS.UPDATE_ERROR_MESSAGE:
        return { ...state, errorMessage: action.value };
      case ACTIONS.UPDATE_SEARCH_RESULTS:
        return { ...state, searchResults: action.value };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const autoComplete = (prefix: string): void => {
    const suggestions = index.current.findSuggestions(prefix.toLowerCase());

    if (suggestions.length === 0) {
      dispatch({ type: ACTIONS.UPDATE_AUTOCOMPLETE, value: '' });
      dispatch({ type: ACTIONS.UPDATE_SEARCH_RESULTS, value: [] });
    } else {
      const filteredEncounters = data.filter((encounter) =>
        suggestions.includes(encounter.name.toLowerCase())
      );
      const [current, next] = filteredEncounters
        .map((encounter) => encounter.name)
        .sort((a, b) => a.length - b.length || a.localeCompare(b));
      const suggestion = next && current === prefix ? next : current;
      const caseBlendedSuggestion = prefix + suggestion.slice(prefix.length);

      dispatch({
        type: ACTIONS.UPDATE_AUTOCOMPLETE,
        value: caseBlendedSuggestion,
      });
      dispatch({
        type: ACTIONS.UPDATE_SEARCH_RESULTS,
        value: filteredEncounters,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    dispatch({ type: ACTIONS.UPDATE_SEARCH_VALUE, value: e.target.value });
    dispatch({ type: ACTIONS.UPDATE_ERROR_MESSAGE, value: '' });

    if (e.target.value === '') {
      dispatch({ type: ACTIONS.UPDATE_AUTOCOMPLETE, value: '' });
      dispatch({ type: ACTIONS.UPDATE_SEARCH_RESULTS, value: data });
    } else {
      autoComplete(e.target.value);
    }
  };

  const handleSearch = () => {
    if (state.searchValue === '') {
      dispatch({
        type: ACTIONS.UPDATE_ERROR_MESSAGE,
        value: 'Enter a name to search...',
      });
      return;
    }

    if (state.searchResults.length === 0) {
      dispatch({
        type: ACTIONS.UPDATE_ERROR_MESSAGE,
        value: `No encounter exists called ${state.searchValue}`,
      });
      dispatch({ type: ACTIONS.UPDATE_SEARCH_VALUE, value: '' });
      dispatch({ type: ACTIONS.UPDATE_AUTOCOMPLETE, value: '' });
      dispatch({ type: ACTIONS.UPDATE_SEARCH_RESULTS, value: data });
      return;
    }

    if (state.searchResults.length === 1) {
      dispatch({ type: ACTIONS.UPDATE_SEARCH_VALUE, value: '' });
      dispatch({ type: ACTIONS.UPDATE_AUTOCOMPLETE, value: '' });
      dispatch({ type: ACTIONS.UPDATE_SEARCH_RESULTS, value: data });
      dispatch({ type: ACTIONS.UPDATE_ERROR_MESSAGE, value: '' });
      selectEncounter(state.searchResults[0].id);
      return;
    }

    const matches = state.searchResults.filter(
      (encounter) => encounter.name === state.searchValue
    );

    if (matches.length === 1) {
      dispatch({ type: ACTIONS.UPDATE_SEARCH_VALUE, value: '' });
      dispatch({ type: ACTIONS.UPDATE_AUTOCOMPLETE, value: '' });
      dispatch({ type: ACTIONS.UPDATE_SEARCH_RESULTS, value: data });
      dispatch({ type: ACTIONS.UPDATE_ERROR_MESSAGE, value: '' });
      selectEncounter(matches[0].id);
      return;
    }

    if (matches.length > 1) {
      return;
    }

    dispatch({
      type: ACTIONS.UPDATE_ERROR_MESSAGE,
      value: `No encounter exists called ${state.searchValue}`,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    if (
      e.key === 'ArrowRight' &&
      state.autocompleteValue.length > state.searchValue.length
    ) {
      dispatch({
        type: ACTIONS.UPDATE_SEARCH_VALUE,
        value: state.autocompleteValue,
      });
      autoComplete(state.autocompleteValue);
    }
  };

  useEffect(() => {
    data.forEach((encounter) => {
      index.current.insert(encounter.name);
    });
  }, [data]);

  useEffect(() => {
    filterEncounters(state.searchResults);
  }, [state.searchResults, filterEncounters]);

  return (
    <form aria-label="encounter search form">
      {state.errorMessage && <div>{state.errorMessage}</div>}
      <div>
        <input
          type="text"
          value={state.searchValue}
          placeholder="Search encounter by name..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="encounter-search-input"
          aria-label="encounter search input"
        />
        <input
          type="text"
          value={state.autocompleteValue}
          className="encounter-search-autocomplete"
          aria-label="encounter search autocomplete"
          readOnly
          tabIndex={-1}
        />
      </div>
    </form>
  );
}
