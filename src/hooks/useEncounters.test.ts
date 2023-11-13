import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { afterEach } from 'node:test';
import useEncounters, { Action, reducer } from './useEncounters';
import { Encounter } from '../interfaces/Encounter';

vi.mock('@tanstack/react-query', async () => {
  const encounters: { default: Encounter[] } = await vi.importActual(
    '../mocks/encounters'
  );
  return {
    useQuery: vi.fn().mockReturnValue({
      data: encounters.default,
      isLoading: false,
      error: {},
    }),
  };
});

const mockEncounter: Encounter = {
  id: 4,
  name: 'Test Encounter 4',
  description: 'Cool Description 4',
  isActive: false,
  round: 0,
  turn: 0,
  owner: 0,
  createdAt: Date.now(),
};

describe('useEncounters', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return a list of all saved encounters', () => {
    const { result } = renderHook(useEncounters);

    expect(result.current).toHaveProperty('encounters');
    expect(result.current.displayedEncounters).toHaveLength(3);
  });

  it('should return a list of encounters to be displayed', () => {
    const { result } = renderHook(useEncounters);

    expect(result.current).toHaveProperty('displayedEncounters');
    expect(result.current.displayedEncounters).toHaveLength(3);
  });

  it('should modify displayedEncounters when filterEncounters is called', () => {
    const { result } = renderHook(useEncounters);

    act(() => result.current.filterEncounters([mockEncounter]));

    expect(result.current.displayedEncounters).toEqual([mockEncounter]);
  });

  it('should not modify encounters when filterEncounters is called', () => {
    const { result } = renderHook(useEncounters);

    const initialEncounters = [...result.current.encounters];

    act(() => result.current.filterEncounters([mockEncounter]));

    expect(result.current.encounters).toEqual(initialEncounters);
  });

  it('should return null as selectedEncounter when no encounter is selected', () => {
    const { result } = renderHook(useEncounters);

    expect(result.current.selectedEncounter).toBeNull();
  });

  it('should return null as selectedEncounter when an invalid encounterId is provided', () => {
    const { result } = renderHook(useEncounters);

    act(() => result.current.selectEncounter(-Infinity));

    expect(result.current.selectedEncounter).toBeNull();
  });

  it('should return the correct encounter as selectedEncounter when an encounter is selected', () => {
    const { result } = renderHook(useEncounters);

    expect(result.current.selectedEncounter).toBeNull();

    act(() => result.current.selectEncounter(0));

    expect(result.current.selectedEncounter).toEqual(
      result.current.encounters[0]
    );

    act(() => result.current.selectEncounter(1));

    expect(result.current.selectedEncounter).toEqual(
      result.current.encounters[1]
    );
  });

  it('should delete an encounter from both encounters and displayedEncounters', () => {
    const { result } = renderHook(useEncounters);

    expect(result.current.encounters).toHaveLength(3);
    expect(result.current.displayedEncounters).toHaveLength(3);

    act(() => result.current.deleteEncounter(0));

    expect(result.current.encounters).toHaveLength(2);
    expect(result.current.displayedEncounters).toHaveLength(2);
  });

  it('should add new encounters to both encounters and displayedEncounters', () => {
    const { result } = renderHook(useEncounters);

    expect(result.current.encounters).toHaveLength(3);
    expect(result.current.displayedEncounters).toHaveLength(3);

    act(() => result.current.addEncounter(mockEncounter));

    expect(result.current.encounters).toContain(mockEncounter);
    expect(result.current.displayedEncounters).toContain(mockEncounter);
  });

  it('should reset the displayedEncounters to match encounters when an encounter is added', () => {
    const { result } = renderHook(useEncounters);

    expect(result.current.encounters).toEqual(
      result.current.displayedEncounters
    );

    act(() => result.current.filterEncounters([]));

    expect(result.current.displayedEncounters).toEqual([]);

    act(() => result.current.addEncounter(mockEncounter));

    expect(result.current.displayedEncounters).toHaveLength(4);
    expect(result.current.displayedEncounters).toEqual(
      result.current.encounters
    );
  });

  it('should modify both encounters and displayedEncounters when an encounter is updated', () => {
    const { result } = renderHook(useEncounters);

    act(() => result.current.addEncounter(mockEncounter));

    expect(result.current.encounters[3].name).toEqual('Test Encounter 4');
    expect(result.current.encounters[3].description).toEqual(
      'Cool Description 4'
    );

    act(() =>
      result.current.updateEncounter({
        ...mockEncounter,
        name: 'Updated Name',
        description: 'Updated Description',
      })
    );

    expect(result.current.encounters[3].name).toEqual('Updated Name');
    expect(result.current.encounters[3].description).toEqual(
      'Updated Description'
    );
    expect(result.current.displayedEncounters[3].name).toEqual('Updated Name');
    expect(result.current.displayedEncounters[3].description).toEqual(
      'Updated Description'
    );
  });

  it('should make the correct encounter active when runEncounter is called', () => {
    const { result } = renderHook(useEncounters);

    expect(result.current.encounters[0].isActive).toEqual(false);
    expect(result.current.encounters[1].isActive).toEqual(false);
    expect(result.current.encounters[2].isActive).toEqual(false);

    act(() => result.current.runEncounter(0));

    expect(result.current.encounters[0].isActive).toEqual(true);
    expect(result.current.encounters[1].isActive).toEqual(false);
    expect(result.current.encounters[2].isActive).toEqual(false);
  });

  it('should set displayedEncounters to an empty array when runEncounter is called', () => {
    const { result } = renderHook(useEncounters);

    expect(result.current.displayedEncounters).toHaveLength(3);

    act(() => result.current.runEncounter(0));

    expect(result.current.displayedEncounters).toHaveLength(0);
  });

  it('should set selectedEncounter to null when runEncounter is called', () => {
    const { result } = renderHook(useEncounters);

    expect(result.current.selectedEncounter).toBeNull();

    act(() => result.current.runEncounter(0));

    expect(result.current.selectedEncounter).toBeNull();
  });

  it('should return the state unchanged if the reducer is called with an invalid action type', () => {
    const result = reducer(
      { encounters: [], displayedEncounters: [], selectedEncounter: null },
      { type: 'NON_EXISTENT_ACTION', mockEncounter } as unknown as Action
    );

    expect(result).toEqual({
      encounters: [],
      displayedEncounters: [],
      selectedEncounter: null,
    });
  });
});
