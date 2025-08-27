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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="type">
            Type d'opportunité *
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="spontaneous">Spontanée</option>
            <option value="technical">Technique</option>
            <option value="tender">Appel d'offres</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="status">
            Statut
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="draft">Brouillon</option>
            <option value="submitted">Soumise</option>
            <option value="won">Gagnée</option>
            <option value="lost">Perdue</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="value">
            Valeur estimée (FCFA) *
          </label>
          <input
            id="value"
            type="number"
            value={formData.value}
            onChange={(e) => handleChange('value', parseInt(e.target.value) || 0)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.value ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="45000000"
            min="0"
            aria-invalid={!!errors.value}
            aria-describedby={errors.value ? 'value-error' : undefined}
          />
          {errors.value && (
            <p id="value-error" className="text-red-500 text-xs mt-1">{errors.value}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="probability">
            Probabilité de succès (%) *
          </label>
          <input
            id="probability"
            type="number"
            value={formData.probability}
            onChange={(e) => handleChange('probability', parseInt(e.target.value) || 0)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.probability ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="75"
            min="0"
            max="100"
            aria-invalid={!!errors.probability}
            aria-describedby={errors.probability ? 'probability-error' : undefined}
          />
          {errors.probability && (
            <p id="probability-error" className="text-red-500 text-xs mt-1">{errors.probability}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="deadline">
          Date limite *
        </label>
        <input
          id="deadline"
          type="date"
          value={formData.deadline}
          onChange={(e) => handleChange('deadline', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.deadline ? 'border-red-300' : 'border-gray-300'
          }`}
          aria-invalid={!!errors.deadline}
          aria-describedby={errors.deadline ? 'deadline-error' : undefined}
        />
        {errors.deadline && (
          <p id="deadline-error" className="text-red-500 text-xs mt-1">{errors.deadline}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
          Description *
        </label>
        <textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Description détaillée de l'opportunité..."
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'description-error' : undefined}
        />
        {errors.description && (
          <p id="description-error" className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      {formData.value > 50_000_000 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <div>
              <h4 className="text-sm font-medium text-orange-800">Approbation requise</h4>
              <p className="text-sm text-orange-700">
                Cette opportunité nécessite une approbation car sa valeur dépasse 50M FCFA.
              </p>
            </div>
          </div>
        </div>
      )}

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