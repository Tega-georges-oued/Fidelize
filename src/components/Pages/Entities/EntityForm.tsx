import React, { useState } from 'react';
import Button from '../../UI/Button';
import { Entity } from '../../../types';

interface EntityFormProps {
  entity?: Entity;
  onClose: () => void;
  onSave: (entity: Omit<Entity, 'id'>) => void;
}

const EntityForm: React.FC<EntityFormProps> = ({ entity, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    companyName: entity?.companyName || '',
    nif: entity?.nif || '',
    sector: entity?.sector || '',
    region: entity?.region || '',
    parentOrganization: entity?.parentOrganization || '',
    status: entity?.status || 'prospect' as const,
    priority: entity?.priority || 'medium' as const,
    revenue: entity?.revenue || undefined,
    employees: entity?.employees || undefined,
    score: entity?.score || 0,
    address: {
      street: entity?.address?.street || '',
      city: entity?.address?.city || '',
      postalCode: entity?.address?.postalCode || '',
      country: entity?.address?.country || 'Burkina Faso',
    },
    legalInfo: {
      legalForm: entity?.legalInfo?.legalForm || '',
      registrationNumber: entity?.legalInfo?.registrationNumber || '',
      vatNumber: entity?.legalInfo?.vatNumber || '',
      documents: entity?.legalInfo?.documents || [],
    },
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

    if (formData.revenue && formData.revenue < 0) {
      newErrors.revenue = 'Le chiffre d\'affaires ne peut pas être négatif';
    }

    if (formData.employees && formData.employees < 0) {
      newErrors.employees = 'Le nombre d\'employés ne peut pas être négatif';
    }

    if (!formData.address.street.trim()) {
      newErrors.street = 'L\'adresse est requise';
    }

    if (!formData.address.city.trim()) {
      newErrors.city = 'La ville est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateScore = () => {
    let score = 0;

    // CA (40%)
    if (formData.revenue) {
      if (formData.revenue >= 100_000_000) score += 40;
      else if (formData.revenue >= 50_000_000) score += 30;
      else if (formData.revenue >= 10_000_000) score += 20;
      else score += 10;
    } else {
      score += 5; // Score minimal si pas de CA renseigné
    }

    // Effectifs (30%)
    if (formData.employees) {
      if (formData.employees >= 100) score += 30;
      else if (formData.employees >= 50) score += 25;
      else if (formData.employees >= 20) score += 20;
      else if (formData.employees >= 10) score += 15;
      else score += 10;
    } else {
      score += 5; // Score minimal si pas d'effectifs renseignés
    }

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
        createdAt: entity?.createdAt || new Date(),
        updatedAt: new Date(),
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

  const handleAddressChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLegalInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      legalInfo: { ...prev.legalInfo, [field]: value }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            NIF (optionnel)
          </label>
          <input
            type="text"
            value={formData.nif}
            onChange={(e) => handleChange('nif', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 1234567890"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <option value="Agriculture">Agriculture</option>
            <option value="Mines">Mines</option>
            <option value="Transport">Transport</option>
            <option value="Santé">Santé</option>
            <option value="Éducation">Éducation</option>
          </select>
          {errors.sector && <p className="text-red-500 text-xs mt-1">{errors.sector}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tutelle/Groupe (optionnel)
          </label>
          <input
            type="text"
            value={formData.parentOrganization}
            onChange={(e) => handleChange('parentOrganization', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Ministère de l'Énergie"
          />
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
            <option value="Diourbel">Diourbel</option>
            <option value="Fatick">Fatick</option>
            <option value="Kolda">Kolda</option>
            <option value="Louga">Louga</option>
            <option value="Matam">Matam</option>
            <option value="Sédhiou">Sédhiou</option>
            <option value="Tambacounda">Tambacounda</option>
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

      {/* Section Adresse */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Adresse</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse *
            </label>
            <input
              type="text"
              value={formData.address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.street ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Ex: Avenue Kwame Nkrumah"
            />
            {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ville *
            </label>
            <input
              type="text"
              value={formData.address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.city ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Ex: Ouagadougou"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Code postal (optionnel)
            </label>
            <input
              type="text"
              value={formData.address.postalCode}
              onChange={(e) => handleAddressChange('postalCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: 01 BP 1234"
            />
          </div>
        </div>
      </div>

      {/* Section Informations légales */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Informations légales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Forme juridique
            </label>
            <select
              value={formData.legalInfo.legalForm}
              onChange={(e) => handleLegalInfoChange('legalForm', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionner une forme juridique</option>
              <option value="SA">Société Anonyme (SA)</option>
              <option value="SARL">Société à Responsabilité Limitée (SARL)</option>
              <option value="SNC">Société en Nom Collectif (SNC)</option>
              <option value="SCS">Société en Commandite Simple (SCS)</option>
              <option value="GIE">Groupement d'Intérêt Économique (GIE)</option>
              <option value="Association">Association</option>
              <option value="ONG">Organisation Non Gouvernementale (ONG)</option>
              <option value="EPE">Entreprise Publique d'État (EPE)</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numéro RCCM (optionnel)
            </label>
            <input
              type="text"
              value={formData.legalInfo.registrationNumber}
              onChange={(e) => handleLegalInfoChange('registrationNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: BF-OUA-2023-A-001"
            />
          </div>
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
            onChange={(e) => handleChange('revenue', parseInt(e.target.value) || undefined)}
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
            onChange={(e) => handleChange('employees', parseInt(e.target.value) || undefined)}
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