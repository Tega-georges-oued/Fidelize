import React, { useState } from "react";
import EntityForm from "./EntityForm";
import EntityDetail from "./EntityDetail";
import { Entity } from "../../../types";
import {
  Building2,
  Search,
  Filter,
  Plus,
  MapPin,
  Users,
  DollarSign,
  Star,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import Modal from "../../UI/Modal";
import Button from "../../UI/Button";

// eslint-disable-next-line react-refresh/only-export-components
export const mockEntities: Entity[] = [
  {
    id: "1",
    companyName: "ALPHA Industries SA",
    nif: "1234567890",
    sector: "Industrie",
    region: "Dakar",
    parentOrganization: "Groupe ALPHA International",
    status: "client",
    priority: "high",
    score: 85,
    revenue: 2500000,
    employees: 150,
    address: {
      street: "Avenue Léopold Sédar Senghor",
      city: "Dakar",
      postalCode: "BP 1234",
      country: "Sénégal",
    },
    legalInfo: {
      legalForm: "SA",
      registrationNumber: "SN-DKR-2020-A-001",
      vatNumber: "SN123456789",
      documents: [],
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-01"),
    lastInteraction: new Date("2024-01-15"),
  },
  {
    id: "2",
    companyName: "BETA Télécoms",
    nif: "0987654321",
    sector: "Télécommunications",
    region: "Thiès",
    status: "prospect",
    priority: "medium",
    score: 72,
    revenue: 1800000,
    employees: 95,
    address: {
      street: "Route de Dakar",
      city: "Thiès",
      postalCode: "BP 5678",
      country: "Sénégal",
    },
    legalInfo: {
      legalForm: "SARL",
      registrationNumber: "SN-THS-2021-B-002",
      documents: [],
    },
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-11-28"),
    lastInteraction: new Date("2024-01-12"),
  },
  {
    id: "3",
    companyName: "GAMMA ONG",
    nif: "1122334455",
    sector: "ONG",
    region: "Saint-Louis",
    status: "client",
    priority: "critical",
    score: 92,
    revenue: 800000,
    employees: 45,
    address: {
      street: "Rue Blaise Diagne",
      city: "Saint-Louis",
      postalCode: "BP 9012",
      country: "Sénégal",
    },
    legalInfo: {
      legalForm: "ONG",
      registrationNumber: "SN-STL-2019-C-003",
      documents: [],
    },
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-12-15"),
    lastInteraction: new Date("2024-01-18"),
  },
];

export const EntitiesList: React.FC = () => {
  const [entities] = useState<Entity[]>(mockEntities);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [editingEntity, setEditingEntity] = useState<Entity | null>(null);
  const [entitiesList, setEntitiesList] = useState<Entity[]>(mockEntities);
  const [showDetail, setShowDetail] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "client"
      ? "bg-blue-100 text-blue-800"
      : "bg-purple-100 text-purple-800";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSaveEntity = (entityData: Omit<Entity, 'id'>) => {
    if (editingEntity) {
      // Modifier une entité existante
      setEntitiesList(prev => prev.map(entity => 
        entity.id === editingEntity.id 
          ? { ...entityData, id: editingEntity.id }
          : entity
      ));
    } else {
      // Créer une nouvelle entité
      const newEntity: Entity = {
        ...entityData,
        id: Date.now().toString(),
      };
      setEntitiesList(prev => [...prev, newEntity]);
    }
    setEditingEntity(null);
    setIsModalOpen(false);
  };

  const handleEditEntity = (entity: Entity) => {
    setEditingEntity(entity);
    setIsModalOpen(true);
  };

  const handleDeleteEntity = (entityId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette entreprise ?')) {
      setEntitiesList(prev => prev.filter(entity => entity.id !== entityId));
    }
  };

  const filteredEntities = entitiesList.filter((entity) => {
    const matchesSearch =
      entity.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.sector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || entity.status === selectedStatus;
    const matchesSector =
      selectedSector === "all" || entity.sector === selectedSector;

    return matchesSearch && matchesStatus && matchesSector;
  });

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Entreprises</h1>
          <p className="text-gray-600">
            Gestion centralisée de vos clients et prospects
          </p>
        </div>
        <button 
          onClick={() => {
            setEditingEntity(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nouvelle entreprise</span>
        </button>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="client">Clients</option>
            <option value="prospect">Prospects</option>
          </select>

          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les secteurs</option>
            <option value="Industrie">Industrie</option>
            <option value="Télécommunications">Télécommunications</option>
            <option value="ONG">ONG</option>
            <option value="EPE">EPE</option>
          </select>

          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filtres avancés</span>
          </button>
        </div>
      </div>

      {/* Liste des entreprises */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredEntities.length} entreprise
              {filteredEntities.length > 1 ? "s" : ""}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Trier par:</span>
              <select className="text-sm border border-gray-300 rounded px-2 py-1">
                <option>Score (décroissant)</option>
                <option>Nom (A-Z)</option>
                <option>Dernière interaction</option>
                <option>Chiffre d'affaires</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredEntities.map((entity) => (
            <div
              key={entity.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {entity.companyName}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          entity.status
                        )}`}
                      >
                        {entity.status === "client" ? "Client" : "Prospect"}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          entity.priority
                        )}`}
                      >
                        {entity.priority === "critical"
                          ? "Critique"
                          : entity.priority === "high"
                          ? "Haute"
                          : entity.priority === "medium"
                          ? "Moyenne"
                          : "Faible"}
                      </span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {entity.region} • {entity.sector}
                        </span>
                      </div>
                      {entity.revenue && (
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{formatCurrency(entity.revenue)}</span>
                        </div>
                      )}
                      {entity.employees && (
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{entity.employees} employés</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-900">
                        {entity.score}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">Score</span>
                  </div>

                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {entity.contactsCount}
                    </div>
                    <span className="text-xs text-gray-500">Contacts</span>
                  </div>

                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {entity.missionsCount}
                    </div>
                    <span className="text-xs text-gray-500">Missions</span>
                  </div>

                  <div className="relative group">
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>

                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <div className="py-2">
                        <button 
                          onClick={() => {
                            setSelectedEntity(entity);
                            setShowDetail(true);
                          }}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                          <Eye className="w-4 h-4" />
                          <span>Voir les détails</span>
                        </button>
                        <button 
                          onClick={() => handleEditEntity(entity)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Modifier</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteEntity(entity.id)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {entity.lastInteraction && (
                <div className="mt-3 text-xs text-gray-500">
                  Dernière interaction:{" "}
                  {new Date(entity.lastInteraction).toLocaleDateString("fr-FR")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Create Entity Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEntity(null);
        }}
        title={editingEntity ? "Modifier l'Entreprise" : "Nouvelle Entreprise"}
        size="lg"
      >
        <EntityForm
          entity={editingEntity}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEntity(null);
          }}
          onSave={handleSaveEntity}
        />
      </Modal>

      {/* Entity Detail Modal - Old version, keeping for reference */}
      {selectedEntity && !showDetail && (
        <Modal
          isOpen={!!selectedEntity}
          onClose={() => setSelectedEntity(null)}
          title={selectedEntity.companyName}
          size="xl"
        >
          <div className="space-y-6">
            {/* Entity Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Informations générales
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Secteur:</span> {selectedEntity.sector}
                  </div>
                  <div>
                    <span className="font-medium">Région:</span> {selectedEntity.region}
                  </div>
                  <div>
                    <span className="font-medium">Statut:</span>{" "}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedEntity.status)}`}>
                      {selectedEntity.status === "client" ? "Client" : "Prospect"}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Priorité:</span>{" "}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedEntity.priority)}`}>
                      {selectedEntity.priority === "critical" ? "Critique" :
                       selectedEntity.priority === "high" ? "Haute" :
                       selectedEntity.priority === "medium" ? "Moyenne" : "Faible"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Données financières</h4>
                <div className="space-y-2 text-sm">
                  {selectedEntity.revenue && (
                    <div>
                      <span className="font-medium">CA:</span> {formatCurrency(selectedEntity.revenue)}
                    </div>
                  )}
                  {selectedEntity.employees && (
                    <div>
                      <span className="font-medium">Employés:</span> {selectedEntity.employees}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Score:</span>{" "}
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold">{selectedEntity.score}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Activité</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Contacts:</span> {selectedEntity.contactsCount}
                  </div>
                  <div>
                    <span className="font-medium">Missions:</span> {selectedEntity.missionsCount}
                  </div>
                  {selectedEntity.lastInteraction && (
                    <div>
                      <span className="font-medium">Dernière interaction:</span>{" "}
                      {new Date(selectedEntity.lastInteraction).toLocaleDateString("fr-FR")}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Actions rapides</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="secondary" size="sm" className="justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler
                </Button>
                <Button variant="secondary" size="sm" className="justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button variant="secondary" size="sm" className="justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  RDV
                </Button>
                <Button variant="secondary" size="sm" className="justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Opportunité
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="secondary">
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              <Button 
                onClick={() => handleDeleteEntity(selectedEntity.id)}
                variant="danger"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
              <Button>
                Voir tous les détails
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* New Entity Detail Component */}
      {selectedEntity && showDetail && (
        <EntityDetail
          entity={selectedEntity}
          onClose={() => {
            setSelectedEntity(null);
            setShowDetail(false);
          }}
          onEdit={() => {
            setEditingEntity(selectedEntity);
            setShowDetail(false);
            setIsModalOpen(true);
          }}
        />
      )}
    </div>
  );
};