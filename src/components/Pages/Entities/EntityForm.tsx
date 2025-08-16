import React, { useState } from 'react';
import Button from '../../UI/Button';
import { Entity } from './EntitiesList';

interface EntityFormProps {
  entity?: Entity;
  onClose: () => void;
  onSave: (entity: Omit<Entity, 'id'>) => void;
}

const EntityForm: React.FC<EntityFormProps> = ({ entity, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    companyName: entity?.companyName || '',
    sector: entity?.sector || '',
    region: entity?.region || '',
    status: entity?.status || 'prospect' as const,
    priority: entity?.priority || 'medium' as const,
    revenue: entity?.revenue || 0,
    employees: entity?.employees || 0,
    contactsCount: entity?.contactsCount || 0,
    missionsCount: entity?.missionsCount || 0,
    score: entity?.score || 0,
    lastInteraction: entity?.lastInteraction || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Le nom de l\'entreprise est requis';
    }

    if (!formData.sector) {
      newErrors.sector = 'Le secteur est requis';
    }

    if (!formData.region) {
      newErrors.region = 'La région est requise';
    }

    if (formData.revenue < 0) {
      newErrors.revenue = 'Le chiffre d\'affaires ne peut pas être négatif';
    }

    if (formData.employees < 0) {
      newErrors.employees = 'Le nombre d\'employés ne peut pas être négatif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateScore = () => {
    let score = 0;

    // CA (40%)
    if (formData.revenue >= 100_000_000) score += 40;
    else if (formData.revenue >= 50_000_000) score += 30;
    else if (formData.revenue >= 10_000_000) score += 20;
    else score += 10;

    // Effectifs (30%)
    if (formData.employees >= 100) score += 30;
    else if (formData.employees >= 50) score += 25;
    else if (formData.employees >= 20) score += 20;
    else if (formData.employees >= 10) score += 15;
    else score += 10;

    // Statut (30%)
    if (formData.status === 'client') score += 30;
    else score += 15;

    return Math.min(100, score);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const entityData = {
        ...formData,
        score: calculateScore(),
      };
      onSave(entityData);
      onClose();
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom de l'entreprise *
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.companyName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Ex: ALPHA Industries SA"
          />
          {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secteur d'activité *
          </label>
          <select
            value={formData.sector}
            onChange={(e) => handleChange('sector', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.sector ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Sélectionner un secteur</option>
            <option value="Industrie">Industrie</option>
            <option value="Télécommunications">Télécommunications</option>
            <option value="Banque">Banque</option>
            <option value="ONG">ONG</option>
            <option value="EPE">EPE</option>
            <option value="Commerce">Commerce</option>
            <option value="Services">Services</option>
          </select>
          {errors.sector && <p className="text-red-500 text-xs mt-1">{errors.sector}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Région *
          </label>
          <select
            value={formData.region}
            onChange={(e) => handleChange('region', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.region ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Sélectionner une région</option>
            <option value="Dakar">Dakar</option>
            <option value="Thiès">Thiès</option>
            <option value="Saint-Louis">Saint-Louis</option>
            <option value="Kaolack">Kaolack</option>
            <option value="Ziguinchor">Ziguinchor</option>
          </select>
          {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
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
            <option value="prospect">Prospect</option>
            <option value="client">Client</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chiffre d'affaires (FCFA)
          </label>
          <input
            type="number"
            value={formData.revenue}
            onChange={(e) => handleChange('revenue', parseInt(e.target.value) || 0)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.revenue ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="2500000"
          />
          {errors.revenue && <p className="text-red-500 text-xs mt-1">{errors.revenue}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre d'employés
          </label>
          <input
            type="number"
            value={formData.employees}
            onChange={(e) => handleChange('employees', parseInt(e.target.value) || 0)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.employees ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="150"
          />
          {errors.employees && <p className="text-red-500 text-xs mt-1">{errors.employees}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Priorité
        </label>
        <select
          value={formData.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="low">Faible</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
          <option value="critical">Critique</option>
        </select>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Score calculé automatiquement</h4>
        <div className="text-2xl font-bold text-blue-600">{calculateScore()}/100</div>
        <p className="text-xs text-blue-700 mt-1">
          Basé sur le CA, les effectifs et le statut client
        </p>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">
          {entity ? 'Modifier' : 'Créer'} l'Entreprise
        </Button>
      </div>
    </form>
  );
};

export default EntityForm;