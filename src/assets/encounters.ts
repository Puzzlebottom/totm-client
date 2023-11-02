type Encounter = {
  readonly id: number;
  name: string;
  description: string;
  isActive: boolean;
  round: number;
  turn: number;
  owner: number;
  readonly createdAt: Date;
};

const encounters: Encounter[] = [
  {
    id: 0,
    name: 'Amazing Encounter',
    description:
      'An encounter with various monsters in an environment of some kind',
    isActive: false,
    round: 0,
    turn: 0,
    owner: 0,
    createdAt: new Date(),
  },
];

export default encounters;
