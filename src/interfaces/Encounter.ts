export interface Encounter {
  readonly id: number;
  name: string;
  description: string;
  isActive: boolean;
  round: number;
  turn: number;
  owner: number;
  readonly createdAt: Date;
}
