import React, { useState } from "react";
// import { useStore } from '../../../store/useStore';
import { mockEntities as entities } from "../Entities/EntitiesList";
import Button from "../../UI/Button";
import { Contact } from "../../../types";

interface ContactFormProps {
  contact?: Contact;
  onClose: () => void;
  onSave: (contact: Omit<Contact, "id" | "createdAt">) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    entityId: contact?.entityId || "",
    name: contact?.name || "",
    role: contact?.role || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    whatsapp: contact?.whatsapp || "",
    isPrimary: contact?.isPrimary || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.entityId) {
      newErrors.entityId = "L'entreprise est requise";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Le rôle est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom complet *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Ex: Jean Dupont"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Entreprise *
          </label>
          <select
            value={formData.entityId}
            onChange={(e) => handleChange("entityId", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.entityId ? "border-red-300" : "border-gray-300"
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
            Rôle/Fonction *
          </label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.role ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Ex: Directeur Général"
          />
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="jean.dupont@entreprise.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.phone ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="+226 70 12 34 56"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            WhatsApp (optionnel)
          </label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => handleChange("whatsapp", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+226 70 12 34 56"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isPrimary}
            onChange={(e) => handleChange("isPrimary", e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">
            Contact principal de l'entreprise
          </span>
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">
          {contact ? "Modifier" : "Créer"} le Contact
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
