type Timer = {
  notes: string;
  initiative: number;
  roundsRemaining: number;
  expires: boolean;
  reminderText: string;
  triggers: ReminderTriggers;
};

type ReminderTriggers = {
  ownerStart: boolean;
  ownerEnd: boolean;
  memberStart: boolean;
  memberEnd: boolean;
  allStart: boolean;
  allEnd: boolean;
  roundStart: boolean;
  roundEnd: boolean;
  expiry: boolean;
};

type Cluster = {
  readonly id: number;
  readonly encounterId?: number;
  readonly ownerId?: number;
  name: string;
  type: 'location' | 'melee' | 'condition' | 'status' | 'spell';
  agentIds: number[];
  timer?: Timer;
};

const clusters: Cluster[] = [
  {
    id: 0,
    encounterId: 0,
    name: 'In a location',
    type: 'location',
    agentIds: [],
  },
];

export default clusters;
