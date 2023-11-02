import { Agent } from '../interfaces/Agent';

const agents: Agent[] = [
  {
    id: 0,
    encounterId: 0,
    name: 'Cool Dude',
    notes: '',
    clusterIds: [],
    aggro: null,
    vitals: {
      initiative: 0,
      initiativeBonus: 0,
      maxHitPoints: 0,
      hitPoints: 0,
      armorClass: 0,
      attackBonus: 0,
      spellSave: 0,
    },
    actions: {
      action: true,
      move: true,
      bonus: true,
      reaction: true,
      free: true,
      exclamation: true,
    },
    saves: {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
    },
    passives: {
      perception: 0,
      investigation: 0,
      insight: 0,
    },
  },
];

export default agents;
