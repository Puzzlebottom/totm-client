type Saves = {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
};

type Passives = {
  perception: number;
  investigation: number;
  insight: number;
};

type Actions = {
  action: boolean;
  move: boolean;
  bonus: boolean;
  reaction: boolean;
  free?: boolean;
  exclamation?: boolean;
};

type Vitals = {
  initiative: number;
  initiativeBonus: number;
  maxHitPoints: number;
  hitPoints: number;
  armorClass: number;
  attackBonus: number;
  spellSave: number;
};

export interface Agent {
  readonly id?: number;
  readonly encounterId?: number;
  name: string;
  notes: string;
  aggro: number | null;
  clusterIds: number[];
  vitals: Vitals;
  actions: Actions;
  saves: Saves;
  passives: Passives;
}
