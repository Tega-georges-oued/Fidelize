import { useState } from "react";
import { useStore } from "../../../store/useStore";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Badge from "../../UI/Badge";
import Modal from "../../UI/Modal";
import { mockEntities as entities } from "../Entities/EntitiesList";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  EllipsisVerticalIcon, // Ajouté pour les trois points
} from "@heroicons/react/24/outline";
import { Edit, Eye, Trash2 } from "lucide-react";

export default function Contacts() {
  const { contacts } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntityId, setSelectedEntityId] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  // Filtrage des contacts
  const filteredContacts = contacts.filter((contact) => {
    const entity = entities.find((e) => e.id === contact.entityId);
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entity?.companyName &&
        entity.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesEntity =
      selectedEntityId === "all" || contact.entityId === selectedEntityId;
    return matchesSearch && matchesEntity;
  });

  const getEntityName = (entityId: string) => {
    const entity = entities.find((e) => e.id === entityId);
    return entity?.companyName || "Entreprise inconnue";
  };

  const getEntityStatus = (entityId: string) => {
    const entity = entities.find((e) => e.id === entityId);
    return entity?.status || "prospect";
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      prospect: "info" as const,
      qualified: "warning" as const,
      client: "success" as const,
    };
    const labels = {
      prospect: "Prospect",
      qualified: "Qualifié",
      client: "Client",
    };
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Gestion des Contacts
          </h2>
          <p className="text-gray-600">
            Gérez les contacts clés de vos entreprises
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Nouveau Contact
        </Button>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, email, rôle ou entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedEntityId}
              onChange={(e) => setSelectedEntityId(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Toutes les entreprises</option>
              {entities.map((entity) => (
                <option key={entity.id} value={entity.id}>
                  {entity.companyName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {contacts.length}
            </div>
            <div className="text-sm text-gray-600">Total Contacts</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {contacts.filter((c) => c.isPrimary).length}
            </div>
            <div className="text-sm text-gray-600">Contacts Principaux</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {contacts.filter((c) => c.whatsapp).length}
            </div>
            <div className="text-sm text-gray-600">Avec WhatsApp</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(contacts.map((c) => c.entityId)).size}
            </div>
            <div className="text-sm text-gray-600">Entreprises Couvertes</div>
          </div>
        </Card>
      </div>

      {/* Liste des contacts */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                          onClick={() => setSelectedContact(contact)}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entreprise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                {/* Supprimé la colonne Type */}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {contact.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {contact.name}
                          {contact.isPrimary && (
                            <Badge variant="success" size="sm">
                              Principal
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        <BuildingOfficeIcon className="h-4 w-4 mr-1 text-gray-400" />
                        {getEntityName(contact.entityId)}
                      </div>
                      <div className="mt-1">
                        {getStatusBadge(getEntityStatus(contact.entityId))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {contact.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <EnvelopeIcon className="h-4 w-4 mr-2" />
                        <a
                          href={`mailto:${contact.email}`}
                          className="hover:text-indigo-600"
                        >
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <PhoneIcon className="h-4 w-4 mr-2" />
                        <a
                          href={`tel:${contact.phone}`}
                          className="hover:text-indigo-600"
                        >
                          {contact.phone}
                        </a>
                      </div>
                      {contact.whatsapp && (
                        <div className="flex items-center text-sm text-green-600">
                          <span className="text-xs mr-2">📱</span>
                          <a
                            href={`https://wa.me/${contact.whatsapp.replace(
                              /[^0-9]/g,
                              ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-700"
                          >
                            WhatsApp
                          </a>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative group">
                      <button className="p-2 rounded-lg hover:bg-gray-100">
                        <EllipsisVerticalIcon className="w-5 h-5 text-gray-600" />
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        <div className="py-2">
                          <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                            <Eye className="w-4 h-4" />
                            <span>Voir les détails</span>
                          </button>
                          <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                            <Edit className="w-4 h-4" />
                            <span>Modifier</span>
                          </button>
                          <button className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                            <Trash2 className="w-4 h-4" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              {searchTerm || selectedEntityId !== "all"
                ? "Aucun contact ne correspond aux critères de recherche."
                : "Aucun contact enregistré pour le moment."}
            </div>
          </div>
        )}
      </Card>

    {/* Create Contact Modal */}
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Nouveau Contact"
      size="lg"
    >
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Jean Dupont"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Entreprise
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Sélectionner une entreprise</option>
              {entities.map((entity) => (
                <option key={entity.id} value={entity.id}>
                  {entity.companyName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rôle/Fonction
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Directeur Général"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="jean.dupont@entreprise.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+226 70 12 34 56"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp (optionnel)
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+226 70 12 34 56"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Contact principal de l'entreprise
            </span>
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Annuler
          </Button>
          <Button type="submit">Créer le Contact</Button>
        </div>
      </form>
    </Modal>

    {/* Contact Detail Modal */}
    {selectedContact && (
      <Modal
        isOpen={!!selectedContact}
        onClose={() => setSelectedContact(null)}
        title={`Détails - ${selectedContact.name}`}
        size="lg"
      >
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Informations personnelles
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Nom:</span> {selectedContact.name}
                </div>
                <div>
                  <span className="font-medium">Rôle:</span> {selectedContact.role}
                </div>
                <div>
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {selectedContact.email}
                  </a>
                </div>
                <div>
                  <span className="font-medium">Téléphone:</span>{" "}
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {selectedContact.phone}
                  </a>
                </div>
                {selectedContact.whatsapp && (
                  <div>
                    <span className="font-medium">WhatsApp:</span>{" "}
                    <a
                      href={`https://wa.me/${selectedContact.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800"
                    >
                      {selectedContact.whatsapp}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Entreprise</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Nom:</span>{" "}
                  {getEntityName(selectedContact.entityId)}
                </div>
                <div>
                  <span className="font-medium">Statut:</span>{" "}
                  {getStatusBadge(getEntityStatus(selectedContact.entityId))}
                </div>
                <div>
                  <span className="font-medium">Type de contact:</span>{" "}
                  {selectedContact.isPrimary ? (
                    <Badge variant="success" size="sm">Principal</Badge>
                  ) : (
                    <Badge variant="default" size="sm">Secondaire</Badge>
                  )}
                </div>
                <div>
                  <span className="font-medium">Ajouté le:</span>{" "}
                  {new Date(selectedContact.createdAt).toLocaleDateString("fr-FR")}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Actions rapides</h4>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm">
                <PhoneIcon className="h-4 w-4 mr-2" />
                Appeler
              </Button>
              <Button variant="secondary" size="sm">
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                Envoyer un email
              </Button>
              {selectedContact.whatsapp && (
                <Button variant="secondary" size="sm">
                  📱 WhatsApp
                </Button>
              )}
              <Button variant="secondary" size="sm">
                📅 Planifier RDV
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="secondary">
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <Button variant="danger">
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    )}
    </div>
  );
}
