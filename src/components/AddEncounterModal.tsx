/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/jsx-props-no-spreading */
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Encounter,
  encounterFormSchema,
  EncounterFormData,
} from '../interfaces/Encounter';
import Modal from './Modal';

type Props = {
  isOpen: boolean;
  onSubmit: (data: Encounter) => void;
  onClose: () => void;
};

export default function AddEncounterModal({
  isOpen,
  onSubmit,
  onClose,
}: Props): React.ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EncounterFormData>({
    resolver: zodResolver(encounterFormSchema),
  });

  const submit = (data: FieldValues) => {
    onSubmit({ ...data } as Encounter);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} hasCloseBtn onClose={onClose}>
      <article>
        <h3>Create New Encounter</h3>
        <form aria-label="New Encounter Form" onSubmit={handleSubmit(submit)}>
          <span className={errors.name ? 'warning' : ''}>
            Name {errors.name && `${errors.name.message}`}
          </span>
          <input
            {...register('name')}
            aria-label="name"
            placeholder="Enter a name"
            aria-invalid={errors.name ? 'true' : undefined}
            autoComplete="off"
            autoFocus={isOpen}
          />
          <span className={errors.description ? 'warning' : ''}>
            Description {errors.description && `${errors.description.message}`}
          </span>
          <textarea
            {...register('description')}
            rows={4}
            aria-label="description"
            placeholder="Enter a description"
            aria-invalid={errors.description ? 'true' : undefined}
            autoComplete="off"
          />
          <button aria-label="submit" type="submit" hidden />
        </form>
        <footer>
          <button
            type="button"
            aria-label="cancel"
            className="button-secondary-solid"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            aria-label="create"
            disabled={isSubmitting}
            className="button-primary-solid"
            onClick={handleSubmit(submit)}
          >
            Create
          </button>
        </footer>
      </article>
    </Modal>
  );
}
