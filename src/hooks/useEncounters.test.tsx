import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import useEncounters from './useEncounters';
import { Encounter } from '../interfaces/Encounter';

interface EncounterUtilities {
  encounters: Encounter[];
  addEncounter: (encounter: Encounter) => void;
  deleteEncounter: (encounterId: number) => void;
}

const encounterMock: Encounter = {
  id: 0,
  name: 'test',
  description: 'test',
  isActive: false,
  round: 0,
  turn: 0,
  owner: 0,
  createdAt: Date.now(),
};

describe('useEncounters', () => {
  function setup(encounters: Encounter[]): EncounterUtilities {
    const returnValue: EncounterUtilities = {
      encounters: [],
      addEncounter: () => undefined,
      deleteEncounter: () => undefined,
    };
    function TestComponent(): null {
      Object.assign(returnValue, useEncounters(encounters));
      return null;
    }
    render(<TestComponent />);
    return returnValue;
  }

  describe('addEncounter', () => {
    it('adds an Encounter', () => {
      const useEncountersData = setup([]);

      const newEncounter: Encounter = { ...encounterMock };

      const previousNumberOfEncounters = useEncountersData.encounters.length;
      act(() => useEncountersData.addEncounter(newEncounter));

      expect(useEncountersData.encounters.length).toEqual(
        previousNumberOfEncounters + 1
      );
      expect(useEncountersData.encounters[0]).toEqual(newEncounter);
    });
  });
  describe('deleteEncounter', () => {
    it('deletes an Encounter', () => {
      const useEncountersData = setup([{ ...encounterMock }]);

      const selectedEncounter: Encounter = { ...encounterMock };

      const previousNumberOfEncounters = useEncountersData.encounters.length;
      act(() => useEncountersData.deleteEncounter(selectedEncounter.id));

      expect(useEncountersData.encounters.length).toEqual(
        previousNumberOfEncounters - 1
      );
    });
  });
});
