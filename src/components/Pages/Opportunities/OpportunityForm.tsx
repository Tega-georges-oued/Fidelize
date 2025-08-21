import React, { useState } from 'react';
import { useStore } from '../../../store/useStore';
import { mockEntities as entities } from '../Entities/EntitiesList';
import Button from '../../UI/Button';
import { Opportunity } from './Opportunities';

interface OpportunityFormProps {
  opportunity?: Opportunity;
  onClose: () => void;
  onSave: (opportunity: Omit<Opportunity, 'id' | 'createdAt'>) => void;
}

const OpportunityForm: React.FC<OpportunityFormProps> = ({
  opportunity,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    entityId: opportunity?.entityId || '',
    title: opportunity?.title || '',
    description: opportunity?.description || '',
    type: opportunity?.type || 'spontaneous' as const,
    value: opportunity?.value || 0,
    probability: opportunity?.probability || 50,
    deadline: opportunity?.deadline 
      ? new Date(opportunity.deadline).toISOString().split('T')[0] 
      : '',
    status: opportunity?.status || 'draft' as const,
    requiresApproval: opportunity?.requiresApproval || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.entityId) newErrors.entityId = 'L\'entreprise est requise';
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    if (formData.value <= 0) newErrors.value = 'La valeur doit être supérieure à 0';
    if (formData.probability < 0 || formData.probability > 100) 
      newErrors.probability = 'La probabilité doit être entre 0 et 100';
    if (!formData.deadline) newErrors.deadline = 'La date limite est requise';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const deadlineDate = new Date(formData.deadline);
      if (isNaN(deadlineDate.getTime())) {
        setErrors((prev) => ({ ...prev, deadline: 'Date invalide' }));
        return;
      }

      const opportunityData = {
        ...formData,
        deadline: deadlineDate,
        requiresApproval: formData.value > 50_000_000,
      };
      onSave(opportunityData);
      onClose();
    }
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    let parsedValue = value;
    if (typeof value === 'string' && (field === 'value' || field === 'probability')) {
      parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) parsedValue = 0; // Gestion des entrées invalides
    }

    setFormData((prev) => ({ 
      ...prev, 
      [field]: parsedValue 
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (
          (field === 'title' && parsedValue.toString().trim()) ||
          (field === 'description' && parsedValue.toString().trim()) ||
          (field === 'value' && parsedValue > 0) ||
          (field === 'probability' && parsedValue >= 0 && parsedValue <= 100) ||
          (field === 'deadline' && parsedValue)
        ) {
          delete newErrors[field];
        }
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
            Titre de l'opportunité *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.title ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Ex: Audit annuel pour ALPHA Industries"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p id="title-error" className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="entityId">
            Entreprise *
          </label>
          <select
            id="entityId"
            value={formData.entityId}
            onChange={(e) => handleChange('entityId', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.entityId ? 'border-red-300' : 'border-gray-300'
            }`}
            aria-invalid={!!errors.entityId}
            aria-describedby={errors.entityId ? 'entityId-error' : undefined}
          >
            <option value="">Sélectionner une entreprise</option>
            {entities.map((entity) => (
              <option key={entity.id} value={entity.id}>
                {entity.companyName}
              </option>
            ))}
          </select>
          {errors.entityId && (
            <p id="entityId-error" className="text-red-500 text-xs mt-1">{errors.entityId}</p>
          )}
        </div>
      </div>

      {/* ... (reste du code pour les autres champs reste similaire, avec ajout de id, aria-invalid, aria-describedby) ... */}

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">
          {opportunity ? 'Modifier' : 'Créer'} l'Opportunité
        </Button>
      </div>
    </form>
  );
};

export default OpportunityForm;