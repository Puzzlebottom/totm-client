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

const testEncounter: Encounter = {
  id: 12,
  name: 'Above the Clouds',
  description: 'Soaring in the golden realm of angels',
  isActive: false,
  round: 0,
  turn: 0,
  owner: 0,
  createdAt: Date.now(),
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
    onSubmit({ ...testEncounter, ...data });
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} hasCloseBtn onClose={onClose}>
      <h3>Create New Encounter</h3>
      <form aria-label="New Encounter Form">
        <label htmlFor="name">
          <span>Name {errors.name && `${errors.name.message}`}</span>
          <input
            {...register('name')}
            aria-label="name"
            placeholder="Enter a name"
            aria-invalid={errors.name ? 'true' : undefined}
            autoComplete="off"
            autoFocus={isOpen}
          />
        </label>
        <label htmlFor="description">
          <span>
            Description {errors.description && `${errors.description.message}`}
          </span>
          <input
            {...register('description')}
            aria-label="description"
            placeholder="Enter a description"
            aria-invalid={errors.description ? 'true' : undefined}
            autoComplete="off"
          />
        </label>
      </form>
      <footer>
        <button
          type="button"
          aria-label="cancel"
          className="secondary"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          aria-label="create"
          disabled={isSubmitting}
          onClick={handleSubmit(submit)}
        >
          Create
        </button>
      </footer>
    </Modal>
  );
}
