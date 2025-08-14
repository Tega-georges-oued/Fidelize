import { useState } from "react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Badge from "../../UI/Badge";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import {
  // Plus,
  // Search,
  // Filter,
  // Clock,
  // User,
  // FileText,
  // CheckCircle,
  // AlertCircle,
  // TrendingUp,
  Eye,
  Edit,
  Archive,
  MoreVertical,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { mockEntities as entities } from "../Entities/EntitiesList";
import Modal from "../../UI/Modal";

export interface Opportunity {
  id: string;
  entityId: string;
  title: string;
  description: string;
  type: "spontaneous" | "technical" | "tender";
  value: number; // Valeur estimée en FCFA
  probability: number; // Probabilité de succès (0-100)
  deadline: Date;
  status: "draft" | "submitted" | "won" | "lost";
  requiresApproval: boolean; // Si > 50M FCFA
  approvedBy?: string;
  createdAt: Date;
}

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    entityId: "1",
    title: "Audit Annuel pour ALPHA Industries",
    description: "Audit légal annuel pour l'exercice 2024",
    type: "technical",
    value: 45000000,
    probability: 75,
    deadline: new Date("2025-03-15"),
    status: "submitted",
    requiresApproval: false,
    createdAt: new Date("2025-01-10"),
  },
  {
    id: "2",
    entityId: "2",
    title: "Offre pour BETA Télécoms",
    description: "Proposition spontanée pour services de conseil fiscal",
    type: "spontaneous",
    value: 25000000,
    probability: 40,
    deadline: new Date("2025-02-28"),
    status: "draft",
    requiresApproval: false,
    createdAt: new Date("2025-01-20"),
  },
  {
    id: "3",
    entityId: "3",
    title: "Appel d'Offres GAMMA ONG",
    description: "Réponse à appel d'offres pour formation en comptabilité",
    type: "tender",
    value: 15000000,
    probability: 90,
    deadline: new Date("2024-12-31"),
    status: "won",
    requiresApproval: false,
    createdAt: new Date("2024-11-15"),
  },
  {
    id: "4",
    entityId: "1",
    title: "Conseil Stratégique pour ALPHA",
    description: "Conseil en optimisation fiscale",
    type: "spontaneous",
    value: 60000000,
    probability: 60,
    deadline: new Date("2025-04-30"),
    status: "submitted",
    requiresApproval: true,
    approvedBy: "DG",
    createdAt: new Date("2025-02-05"),
  },
  {
    id: "5",
    entityId: "2",
    title: "Formation pour BETA Télécoms",
    description: "Formation en gestion financière",
    type: "technical",
    value: 30000000,
    probability: 20,
    deadline: new Date("2025-01-31"),
    status: "lost",
    requiresApproval: false,
    createdAt: new Date("2024-12-20"),
  },
  {
    id: "6",
    entityId: "3",
    title: "Audit Spécial pour GAMMA ONG",
    description: "Audit interne spécial",
    type: "technical",
    value: 20000000,
    probability: 0,
    deadline: new Date("2025-06-15"),
    status: "draft",
    requiresApproval: false,
    createdAt: new Date("2025-03-01"),
  },
];

export default function Opportunities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  // Filtrage des opportunités
  const filteredOpportunities = mockOpportunities.filter((opportunity) => {
    const entity = entities.find((e) => e.id === opportunity.entityId);
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (entity?.companyName &&
        entity.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      statusFilter === "all" || opportunity.status === statusFilter;
    const matchesType = typeFilter === "all" || opportunity.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getEntityName = (entityId: string) => {
    const entity = entities.find((e) => e.id === entityId);
    return entity?.companyName || "Entreprise inconnue";
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: "default" as const,
      submitted: "warning" as const,
      won: "success" as const,
      lost: "danger" as const,
    };
    const labels = {
      draft: "Brouillon",
      submitted: "Soumise",
      won: "Gagnée",
      lost: "Perdue",
    };
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      spontaneous: "info" as const,
      technical: "warning" as const,
      tender: "success" as const,
    };
    const labels = {
      spontaneous: "Spontanée",
      technical: "Technique",
      tender: "Appel d'offres",
    };
    return (
      <Badge variant={variants[type as keyof typeof variants]}>
        {labels[type as keyof typeof labels]}
      </Badge>
    );
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-green-600 bg-green-100";
    if (probability >= 60) return "text-yellow-600 bg-yellow-100";
    if (probability >= 40) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // const isDeadlineClose = (deadline: Date) => {
  //   const daysUntilDeadline = differenceInDays(new Date(deadline), new Date());
  //   return daysUntilDeadline <= 2 && daysUntilDeadline >= 0;
  // };

  // const isOverdue = (deadline: Date) => {
  //   return isAfter(new Date(), new Date(deadline));
  // };

  // Statistiques
  const totalOpportunities = mockOpportunities.length;
  const activeOpportunities = mockOpportunities.filter(
    (o) => o.status === "submitted"
  ).length;
  const wonOpportunities = mockOpportunities.filter(
    (o) => o.status === "won"
  ).length;
  const totalValue = mockOpportunities.reduce(
    (sum, opp) => sum + (opp.value * opp.probability) / 100,
    0
  );

  const truncateTitle = (title: string, maxLength: number = 20) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Gestion des Opportunités
          </h2>
          <p className="text-gray-600">
            Suivez vos opportunités commerciales et offres
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Nouvelle Opportunité
        </Button>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par titre, description ou entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les types</option>
            <option value="spontaneous">Spontanées</option>
            <option value="technical">Techniques</option>
            <option value="tender">Appels d'offres</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="draft">Brouillons</option>
            <option value="submitted">Soumises</option>
            <option value="won">Gagnées</option>
            <option value="lost">Perdues</option>
          </select>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {totalOpportunities}
            </div>
            <div className="text-sm text-gray-600">Total Opportunités</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {activeOpportunities}
            </div>
            <div className="text-sm text-gray-600">En Cours</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {wonOpportunities}
            </div>
            <div className="text-sm text-gray-600">Gagnées</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {totalValue > 0 ? `${(totalValue / 1_000_000).toFixed(1)}M` : "0"}
            </div>
            <div className="text-sm text-gray-600">Valeur Pondérée</div>
          </div>
        </Card>
      </div>

      {/* Liste des opportunités */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredOpportunities.length} opportunité
              {filteredOpportunities.length > 1 ? "s" : ""}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Trier par:</span>
              <select className="text-sm border border-gray-300 rounded px-2 py-1">
                <option>Probabilité (décroissante)</option>
                <option>Valeur (décroissante)</option>
                <option>Échéance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <ChartBarIcon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {truncateTitle(opportunity.title)}
                      </h3>
                      {getTypeBadge(opportunity.type)}
                      {getStatusBadge(opportunity.status)}
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <BuildingOfficeIcon className="w-4 h-4" />
                        <span>{getEntityName(opportunity.entityId)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CurrencyDollarIcon className="w-4 h-4" />
                        <span>{formatCurrency(opportunity.value)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>
                          {format(
                            new Date(opportunity.deadline),
                            "dd MMM yyyy",
                            {
                              locale: fr,
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div
                      className={`text-sm font-medium ${getProbabilityColor(
                        opportunity.probability
                      )}`}
                    >
                      {opportunity.probability}%
                    </div>
                    <span className="text-xs text-gray-500">Probabilité</span>
                  </div>

                  <div className="relative group">
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>

                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <div className="py-2">
                        <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                          onClick={() => setSelectedOpportunity(opportunity)}
                          <Eye className="w-4 h-4" />
                          <span>Voir les détails</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                          <Edit className="w-4 h-4" />
                          <span>Modifier</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                          <Archive className="w-4 h-4" />
                          <span>Archiver</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Opportunity Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouvelle Opportunité"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre de l'opportunité
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Audit annuel pour ALPHA Industries"
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
                Type d'opportunité
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Sélectionner un type</option>
                <option value="spontaneous">Spontanée</option>
                <option value="technical">Technique</option>
                <option value="tender">Appel d'offres</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valeur estimée (FCFA)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="45000000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Probabilité de succès (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="75"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date limite
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Description détaillée de l'opportunité..."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit">Créer l'Opportunité</Button>
          </div>
        </form>
      </Modal>

      {/* Opportunity Detail Modal */}
      {selectedOpportunity && (
        <Modal
          isOpen={!!selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          title={selectedOpportunity.title}
          size="xl"
        >
          <div className="space-y-6">
            {/* Opportunity Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Informations Générales
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Entreprise:</span>{" "}
                    {getEntityName(selectedOpportunity.entityId)}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span>{" "}
                    {getTypeBadge(selectedOpportunity.type)}
                  </div>
                  <div>
                    <span className="font-medium">Statut:</span>{" "}
                    {getStatusBadge(selectedOpportunity.status)}
                  </div>
                  <div>
                    <span className="font-medium">Créée le:</span>{" "}
                    {format(new Date(selectedOpportunity.createdAt), "dd MMM yyyy", { locale: fr })}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Financier</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Valeur:</span>{" "}
                    {formatCurrency(selectedOpportunity.value)}
                  </div>
                  <div>
                    <span className="font-medium">Probabilité:</span>{" "}
                    <span className={getProbabilityColor(selectedOpportunity.probability)}>
                      {selectedOpportunity.probability}%
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Valeur pondérée:</span>{" "}
                    {formatCurrency((selectedOpportunity.value * selectedOpportunity.probability) / 100)}
                  </div>
                  {selectedOpportunity.requiresApproval && (
                    <div>
                      <span className="font-medium">Approbation:</span>{" "}
                      <span className="text-orange-600">Requise</span>
                      {selectedOpportunity.approvedBy && (
                        <span className="text-green-600"> - Approuvée par {selectedOpportunity.approvedBy}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Planning</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Échéance:</span>{" "}
                    {format(new Date(selectedOpportunity.deadline), "dd MMM yyyy", { locale: fr })}
                  </div>
                  <div>
                    <span className="font-medium">Jours restants:</span>{" "}
                    {Math.ceil((new Date(selectedOpportunity.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} jours
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600">{selectedOpportunity.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="secondary">
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              {selectedOpportunity.status === 'draft' && (
                <Button>
                  Soumettre l'offre
                </Button>
              )}
              {selectedOpportunity.status === 'submitted' && (
                <>
                  <Button variant="success">
                    Marquer comme gagnée
                  </Button>
                  <Button variant="danger">
                    Marquer comme perdue
                  </Button>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
