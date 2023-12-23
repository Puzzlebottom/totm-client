import { z } from 'zod';

export const userLoginFormSchema = z.object({
  email: z.string().email('required!'),
  password: z.string().min(1, 'required!'),
});

export type UserLoginFormData = z.infer<typeof userLoginFormSchema>;

export const userRegistrationFormSchema = z
  .object({
    email: z.string().email('required!'),
    password: z
      .string()
      .min(8, 'must be at least 8 characters!')
      .max(50, 'too long!'),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'Passwords must match!',
    }
  );

export type UserRegistrationFormData = z.infer<
  typeof userRegistrationFormSchema
>;
