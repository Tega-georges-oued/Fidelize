import { useState } from "react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Badge from "../../UI/Badge";
import { mockEntities as entities } from "../Entities/EntitiesList";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export interface FidelizationAction {
  id: string;
  entityId: string;
  type: "sms" | "whatsapp" | "email" | "visit" | "newsletter";
  title: string;
  description: string;
  scheduledDate: Date;
  status: "scheduled" | "sent" | "completed" | "cancelled";
  feedback?: string;
  createdAt: Date;
}

export default function Fidelization() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const fidelizationActions: FidelizationAction[] = [
    {
      id: "1",
      entityId: "1",
      type: "email",
      title: "Email de remerciement",
      description:
        "Envoyer un email de remerciement pour la fidélité du client",
      scheduledDate: new Date(2023, 5, 15, 14, 30),
      status: "completed",
      feedback: "Client très satisfait de la communication",
      createdAt: new Date(2023, 5, 10),
    },
    {
      id: "2",
      entityId: "2",
      type: "sms",
      title: "Rappel promotion",
      description: "Envoyer un SMS pour rappeler la promotion en cours",
      scheduledDate: new Date(2023, 5, 18, 10, 0),
      status: "scheduled",
      createdAt: new Date(2023, 5, 12),
    },
    {
      id: "3",
      entityId: "3",
      type: "whatsapp",
      title: "Enquête satisfaction",
      description: "Envoyer un questionnaire de satisfaction via WhatsApp",
      scheduledDate: new Date(2023, 5, 20, 16, 15),
      status: "sent",
      feedback: "Message délivré avec succès",
      createdAt: new Date(2023, 5, 14),
    },
    {
      id: "4",
      entityId: "1",
      type: "visit",
      title: "Visite de suivi",
      description: "Visite programmée pour discuter des besoins du client",
      scheduledDate: new Date(2023, 6, 2, 9, 0),
      status: "scheduled",
      createdAt: new Date(2023, 5, 18),
    },
    {
      id: "5",
      entityId: "4",
      type: "newsletter",
      title: "Newsletter mensuelle",
      description: "Envoi de la newsletter avec les dernières nouvelles",
      scheduledDate: new Date(2023, 5, 25, 8, 0),
      status: "completed",
      feedback: "Taux d'ouverture de 45%",
      createdAt: new Date(2023, 5, 20),
    },
    {
      id: "6",
      entityId: "3",
      type: "email",
      title: "Offre spéciale",
      description: "Email avec offre spéciale pour les clients fidèles",
      scheduledDate: new Date(2023, 6, 5, 11, 30),
      status: "cancelled",
      feedback: "Annulé à la demande du client",
      createdAt: new Date(2023, 5, 22),
    },
  ];

  // Filtrage des actions de fidélisation
  const filteredActions = fidelizationActions.filter(
    (action: {
      entityId: string;
      title: string;
      description: string;
      status: string;
      type: string;
    }) => {
      const entity = entities.find((e) => e.id === action.entityId);
      const matchesSearch =
        action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity?.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || action.status === statusFilter;
      const matchesType = typeFilter === "all" || action.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    }
  );

  const getEntityName = (entityId: string) => {
    const entity = entities.find((e) => e.id === entityId);
    return entity?.companyName || "Entreprise inconnue";
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      scheduled: "info" as const,
      sent: "warning" as const,
      completed: "success" as const,
      cancelled: "danger" as const,
    };
    const labels = {
      scheduled: "Programmée",
      sent: "Envoyée",
      completed: "Terminée",
      cancelled: "Annulée",
    };
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      sms: PhoneIcon,
      whatsapp: ChatBubbleLeftRightIcon,
      email: EnvelopeIcon,
      visit: CalendarIcon,
      newsletter: EnvelopeIcon,
    };
    return icons[type as keyof typeof icons] || HeartIcon;
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      sms: "info" as const,
      whatsapp: "success" as const,
      email: "warning" as const,
      visit: "default" as const,
      newsletter: "info" as const,
    };
    const labels = {
      sms: "SMS",
      whatsapp: "WhatsApp",
      email: "Email",
      visit: "Visite",
      newsletter: "Newsletter",
    };
    return (
      <Badge variant={variants[type as keyof typeof variants]}>
        {labels[type as keyof typeof labels]}
      </Badge>
    );
  };

  // Statistiques
  const totalActions = fidelizationActions.length;
  const scheduledActions = fidelizationActions.filter(
    (a) => a.status === "scheduled"
  ).length;
  const completedActions = fidelizationActions.filter(
    (a) => a.status === "completed"
  ).length;
  const successRate =
    totalActions > 0 ? (completedActions / totalActions) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Actions de Fidélisation
          </h2>
          <p className="text-gray-600">
            Gérez vos actions de fidélisation client
          </p>
        </div>
        <Button>
          <PlusIcon className="h-5 w-5 mr-2" />
          Nouvelle Action
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
                placeholder="Rechercher par titre, description ou entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Tous les types</option>
              <option value="sms">SMS</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
              <option value="visit">Visite</option>
              <option value="newsletter">Newsletter</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="scheduled">Programmées</option>
              <option value="sent">Envoyées</option>
              <option value="completed">Terminées</option>
              <option value="cancelled">Annulées</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {totalActions}
            </div>
            <div className="text-sm text-gray-600">Total Actions</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {scheduledActions}
            </div>
            <div className="text-sm text-gray-600">Programmées</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {completedActions}
            </div>
            <div className="text-sm text-gray-600">Terminées</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {successRate.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600">Taux de Succès</div>
          </div>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Actions Rapides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="secondary" className="justify-start">
            <EnvelopeIcon className="h-5 w-5 mr-2" />
            Envoyer Newsletter
          </Button>
          <Button variant="secondary" className="justify-start">
            <PhoneIcon className="h-5 w-5 mr-2" />
            Campagne SMS
          </Button>
          <Button variant="secondary" className="justify-start">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Planifier Visites
          </Button>
        </div>
      </Card>

      {/* Liste des actions */}
      {filteredActions.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Aucune action de fidélisation
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                ? "Aucune action ne correspond aux critères de recherche."
                : "Commencez par créer votre première action de fidélisation."}
            </p>
            <div className="mt-6">
              <Button>
                <PlusIcon className="h-5 w-5 mr-2" />
                Nouvelle Action
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredActions.map((action) => {
            const TypeIcon = getTypeIcon(action.type);
            return (
              <Card key={action.id}>
                <div className="space-y-4">
                  {/* En-tête de l'action */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <TypeIcon className="h-5 w-5 text-indigo-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {getEntityName(action.entityId)}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {getTypeBadge(action.type)}
                      {getStatusBadge(action.status)}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700">{action.description}</p>

                  {/* Date programmée */}
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>
                      Programmée pour le{" "}
                      {format(
                        new Date(action.scheduledDate),
                        "dd MMM yyyy à HH:mm",
                        { locale: fr }
                      )}
                    </span>
                  </div>

                  {/* Feedback */}
                  {action.feedback && (
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Retour
                      </h4>
                      <p className="text-sm text-gray-700">{action.feedback}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                    {action.status === "scheduled" && (
                      <>
                        <Button variant="success" size="sm">
                          Marquer comme Envoyée
                        </Button>
                        <Button variant="danger" size="sm">
                          Annuler
                        </Button>
                      </>
                    )}
                    {action.status === "sent" && (
                      <Button variant="success" size="sm">
                        Marquer comme Terminée
                      </Button>
                    )}
                    <Button variant="secondary" size="sm">
                      Modifier
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
