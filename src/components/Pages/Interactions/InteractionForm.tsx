import React, { useState } from 'react';
import { useStore } from '../../../store/useStore';
import { mockEntities as entities } from '../Entities/EntitiesList';
import Button from '../../UI/Button';
import { Interaction } from '../../../types';

interface InteractionFormProps {
  interaction?: Interaction;
  onClose: () => void;
  onSave: (interaction: Omit<Interaction, 'id' | 'date' | 'userId'>) => void;
}

const InteractionForm: React.FC<InteractionFormProps> = ({
  interaction,
  onClose,
  onSave,
}) => {
  const { contacts } = useStore();
  const [formData, setFormData] = useState({
    type: interaction?.type || 'call' as const,
    subject: interaction?.subject || '',
    description: interaction?.description || '',
    entityId: interaction?.entityId || '',
    contactId: interaction?.contactId || '',
    duration: interaction?.duration || 0,
    outcome: interaction?.outcome || '',
    followUpRequired: interaction?.followUpRequired || false,
    followUpDate: interaction?.followUpDate ? 
      new Date(interaction.followUpDate).toISOString().split('T')[0] : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    if (!formData.entityId) {
      newErrors.entityId = 'L\'entreprise est requise';
    }

    if (formData.type === 'call' && formData.duration <= 0) {
      newErrors.duration = 'La durée est requise pour un appel';
    }

    if (formData.followUpRequired && !formData.followUpDate) {
      newErrors.followUpDate = 'La date de suivi est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const interactionData = {
        ...formData,
        followUpDate: formData.followUpDate ? new Date(formData.followUpDate) : undefined,
        attachments: [],
      };
      onSave(interactionData);
      onClose();
    }
  };

  const handleChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getEntityContacts = (entityId: string) => {
    return contacts.filter(c => c.entityId === entityId);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type d'interaction *
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="call">Appel téléphonique</option>
            <option value="email">Email</option>
            <option value="meeting">Réunion</option>
            <option value="visit">Visite</option>
            <option value="sms">SMS</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Entreprise *
          </label>
          <select
            value={formData.entityId}
            onChange={(e) => {
              handleChange('entityId', e.target.value);
              handleChange('contactId', ''); // Reset contact when entity changes
            }}
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
            Contact (optionnel)
          </label>
          <select
            value={formData.contactId}
            onChange={(e) => handleChange('contactId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!formData.entityId}
          >
            <option value="">Sélectionner un contact</option>
            {formData.entityId && getEntityContacts(formData.entityId).map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.name} - {contact.role}
              </option>
            ))}
          </select>
        </div>

        {formData.type === 'call' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Durée (minutes) *
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => handleChange('duration', parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.duration ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="30"
              min="1"
            />
            {errors.duration && (
              <p className="text-red-500 text-xs mt-1">{errors.duration}</p>
            )}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sujet *
        </label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.subject ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Ex: Suivi commercial - Proposition audit"
        />
        {errors.subject && (
          <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
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
          placeholder="Détails de l'interaction..."
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Résultat/Outcome
        </label>
        <textarea
          rows={2}
          value={formData.outcome}
          onChange={(e) => handleChange('outcome', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Résultat de l'interaction..."
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.followUpRequired}
            onChange={(e) => handleChange('followUpRequired', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">
            Suivi requis
          </span>
        </label>

        {formData.followUpRequired && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date de suivi *
            </label>
            <input
              type="date"
              value={formData.followUpDate}
              onChange={(e) => handleChange('followUpDate', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.followUpDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.followUpDate && (
              <p className="text-red-500 text-xs mt-1">{errors.followUpDate}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">
          {interaction ? 'Modifier' : 'Enregistrer'} l'Interaction
        </Button>
      </div>
    </form>
  );
};

export default InteractionForm;