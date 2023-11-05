import { z } from 'zod';

export const encounterSchema = z.object({
  id: z.number().readonly(),
  name: z.string(),
  description: z.string(),
  isActive: z.boolean(),
  round: z.number(),
  turn: z.number(),
  owner: z.number(),
  createdAt: z.number(),
});

export type Encounter = z.infer<typeof encounterSchema>;

export const encounterFormSchema = z.object({
  name: z.string().min(1, 'required!').max(50, 'too long!'),
  description: z.string().min(1, 'required!').max(300, 'too long!'),
});

export type EncounterFormData = z.infer<typeof encounterFormSchema>;
