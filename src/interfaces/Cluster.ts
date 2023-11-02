import { Timer } from './Timer';

export interface Cluster {
  readonly id: number;
  readonly encounterId?: number;
  readonly ownerId?: number;
  name: string;
  type: 'location' | 'melee' | 'condition' | 'status' | 'spell';
  agentIds: number[];
  timer?: Timer;
}
