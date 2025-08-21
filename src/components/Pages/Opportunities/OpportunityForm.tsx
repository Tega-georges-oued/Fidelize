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
    deadline: opportunity?.deadline ? 
      new Date(opportunity.deadline).toISOString().split('T')[0] : '',
    status: opportunity?.status || 'draft' as const,
    requiresApproval: opportunity?.requiresApproval || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }

    if (!formData.entityId) {
      newErrors.entityId = 'L\'entreprise est requise';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    if (formData.value <= 0) {
      newErrors.value = 'La valeur doit être supérieure à 0';
    }

    if (formData.probability < 0 || formData.probability > 100) {
      newErrors.probability = 'La probabilité doit être entre 0 et 100';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'La date limite est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const opportunityData = {
        ...formData,
        deadline: new Date(formData.deadline),
        requiresApproval: formData.value > 50_000_000, // Auto-détection si > 50M FCFA
      };
      onSave(opportunityData);
      onClose();
    }
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre de l'opportunité *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.title ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Ex: Audit annuel pour ALPHA Industries"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Entreprise *
          </label>
          <select
            value={formData.entityId}
            onChange={(e) => handleChange('entityId', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.entityId ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Sélectionner une entreprise</option>
            {entities.map((entity) => (
              <option key={entity.id} value={entity.id}>
                {entity.companyName}
              </option>
            ))}
          </select>
          {errors.entityId && (
            <p className="text-red-500 text-xs mt-1">{errors.entityId}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type d'opportunité *
          </label>
          <select
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valeur estimée (FCFA) *
          </label>
          <input
            type="number"
            value={formData.value}
            onChange={(e) => handleChange('value', parseInt(e.target.value) || 0)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.value ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="45000000"
          />
          {errors.value && (
            <p className="text-red-500 text-xs mt-1">{errors.value}</p>
          )}
          {formData.value > 50_000_000 && (
            <p className="text-orange-600 text-xs mt-1">
              ⚠️ Cette opportunité nécessitera une approbation (> 50M FCFA)
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Probabilité de succès (%) *
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.probability}
            onChange={(e) => handleChange('probability', parseInt(e.target.value) || 0)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.probability ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="75"
          />
          {errors.probability && (
            <p className="text-red-500 text-xs mt-1">{errors.probability}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date limite *
        </label>
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => handleChange('deadline', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.deadline ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.deadline && (
          <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Description détaillée de l'opportunité..."
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Valeur pondérée calculée</h4>
        <div className="text-2xl font-bold text-blue-600">
          {((formData.value * formData.probability) / 100).toLocaleString()} FCFA
        </div>
        <p className="text-xs text-blue-700 mt-1">
          Basée sur la valeur estimée et la probabilité de succès
        </p>
      </div>

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