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

export default function AddEncounterModal({
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
      <h3>Edit Encounter</h3>
      <form aria-label="Edit Encounter Form">
        {encounter && (
          <>
            <label htmlFor="name">
              <span>Name {errors.name && `${errors.name.message}`}</span>
              <input
                {...register('name')}
                placeholder="Enter a description"
                aria-invalid={errors.name ? 'true' : undefined}
                autoComplete="off"
                autoFocus={isOpen}
              />
            </label>
            <label htmlFor="description">
              <span>
                Description{' '}
                {errors.description && `${errors.description.message}`}
              </span>
              <input
                {...register('description')}
                placeholder="Enter a description"
                aria-invalid={errors.description ? 'true' : undefined}
                autoComplete="off"
              />
            </label>
            <footer>
              <button type="button" className="secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                disabled={isSubmitting}
                type="button"
                onClick={handleSubmit(submit)}
              >
                Save
              </button>
            </footer>
          </>
        )}
      </form>
    </Modal>
  );
}
