/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/jsx-props-no-spreading */
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import {
  Encounter,
  encounterFormSchema,
  EncounterFormData,
} from '../interfaces/Encounter';
import Modal from './Modal';

type Props = {
  encounter: Encounter | null;
  isOpen: boolean;
  onSubmit: (data: Encounter) => void;
  onClose: () => void;
};

export default function EditEncounterModal({
  encounter,
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
    defaultValues: {
      name: encounter?.name,
      description: encounter?.description,
    },
    resolver: zodResolver(encounterFormSchema),
  });

  const submit = (data: FieldValues) => {
    if (encounter) {
      onSubmit({ ...encounter, ...data });
      reset();
      onClose();
    }
  };

  useEffect(() => {
    if (encounter) {
      reset({
        name: encounter.name,
        description: encounter.description,
      });
    }
  }, [encounter, reset]);

  return (
    <Modal isOpen={isOpen} hasCloseBtn onClose={onClose}>
      <article>
        <h3>Edit Encounter</h3>
        <form aria-label="Edit Encounter Form" onSubmit={handleSubmit(submit)}>
          <span className={errors.name ? 'warning' : ''}>
            Name {errors.name && `${errors.name.message}`}
          </span>
          <input
            {...register('name')}
            aria-label="edit name"
            placeholder="Enter a description"
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
            aria-label="edit description"
            placeholder="Enter a description"
            aria-invalid={errors.description ? 'true' : undefined}
            autoComplete="off"
          />
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
            aria-label="save"
            disabled={isSubmitting}
            className="button-primary-solid"
            onClick={handleSubmit(submit)}
          >
            Save
          </button>
        </footer>
        <button aria-label="submit" type="submit" hidden />
      </article>
    </Modal>
  );
}
