export interface Timer {
  notes: string;
  initiative: number;
  roundsRemaining: number;
  expires: boolean;
  reminderText: string;
  triggers: ReminderTriggers;
}

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
