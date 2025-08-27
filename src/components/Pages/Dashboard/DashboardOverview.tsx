import React from "react";
import {
  Building2,
  Users,
  Briefcase,
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle,
  // AlertTriangle,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useStore } from "../../../store/useStore";
import { mockEntities } from "../Entities/EntitiesList";
import { mockOpportunities } from "../Opportunities/Opportunities";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease";
  icon: React.ReactNode;
  color: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  color,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <div
              className={`flex items-center mt-2 text-sm ${
                changeType === "increase" ? "text-green-600" : "text-red-600"
              }`}
            >
              {changeType === "increase" ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span>{Math.abs(change)}% vs mois dernier</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      </div>
    </div>
  );
};

export const DashboardOverview: React.FC = () => {
  const { contacts } = useStore();

  // Calculs des KPIs réels
  const totalEntities = mockEntities.length;
  const totalContacts = contacts.length;
  const activeOpportunities = mockOpportunities.filter(
    (o) => o.status === "submitted"
  ).length;
  const wonOpportunities = mockOpportunities.filter(
    (o) => o.status === "won"
  ).length;
  const totalOpportunityValue = mockOpportunities
    .filter((o) => o.status === "submitted")
    .reduce((sum, opp) => sum + (opp.value * opp.probability) / 100, 0);

  // Calculs des missions
  const activeMissions = 12; // Mock data
  const completedMissions = 8;
  const totalRevenue = 125_000_000; // FCFA

  const kpis = [
    {
      title: "Entreprises totales",
      value: totalEntities,
      change: 8,
      changeType: "increase" as const,
      icon: <Building2 className="w-6 h-6 text-white" />,
      color: "bg-blue-500",
    },
    {
      title: "Contacts actifs",
      value: totalContacts,
      change: 15,
      changeType: "increase" as const,
      icon: <Users className="w-6 h-6 text-white" />,
      color: "bg-green-500",
    },
    {
      title: "Missions actives",
      value: activeMissions,
      change: 5,
      changeType: "increase" as const,
      icon: <Briefcase className="w-6 h-6 text-white" />,
      color: "bg-orange-500",
    },
    {
      title: "Missions terminées",
      value: completedMissions,
      change: 15,
      changeType: "increase" as const,
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      color: "bg-purple-500",
    },
    {
      title: "CA réalisé",
      value: `${(totalRevenue / 1_000_000).toFixed(0)}M FCFA`,
      change: 18,
      changeType: "increase" as const,
      icon: <DollarSign className="w-6 h-6 text-white" />,
      color: "bg-emerald-500",
    },
    {
      title: "Opportunités actives",
      value: activeOpportunities,
      change: 12,
      changeType: "increase" as const,
      icon: <Target className="w-6 h-6 text-white" />,
      color: "bg-indigo-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "opportunity",
      title: "Nouvelle opportunité - ALPHA Industries",
      description: "Audit annuel pour l'exercice 2024 - 45M FCFA",
      time: "Il y a 2 heures",
      icon: <Target className="w-4 h-4 text-purple-600" />,
      status: "new",
    },
    {
      id: 2,
      type: "contact",
      title: "Nouveau contact - BETA Télécoms",
      description: "Marie Ouédraogo ajoutée comme Directrice Financière",
      time: "Il y a 4 heures",
      icon: <Users className="w-4 h-4 text-green-600" />,
      status: "new",
    },
    {
      id: 3,
      type: "opportunity",
      title: "Opportunité gagnée - GAMMA ONG",
      description: "Formation en comptabilité - 15M FCFA",
      time: "Il y a 1 jour",
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
      status: "completed",
    },
    {
      id: 4,
      type: "communication",
      title: "Email de suivi envoyé",
      description: "Suivi automatique pour ALPHA Industries",
      time: "Il y a 2 jours",
      icon: <Mail className="w-4 h-4 text-blue-600" />,
      status: "completed",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Appel de suivi - ALPHA Industries",
      dueDate: "Aujourd'hui 14:00",
      priority: "high",
      assignee: "Jean Martin",
      type: "call",
    },
    {
      id: 2,
      title: "Présentation offre - BETA Télécoms",
      dueDate: "Demain 10:00",
      priority: "medium",
      assignee: "Marie Dubois",
      type: "meeting",
    },
    {
      id: 3,
      title: "Envoi proposition - Nouveau prospect",
      dueDate: "Vendredi 16:00",
      priority: "low",
      assignee: "Pierre Durand",
      type: "email",
    },
    {
      id: 4,
      title: "Suivi interaction - GAMMA ONG",
      dueDate: "Lundi 09:00",
      priority: "medium",
      assignee: "Sophie Laurent",
      type: "call",
    },
    {
      id: 5,
      title: "Analyse document - Nouveau client",
      dueDate: "Mardi 11:00",
      priority: "high",
      assignee: "Marie Dubois",
      type: "analysis",
    },
    {
      id: 6,
      title: "Finaliser mission - ALPHA Industries",
      dueDate: "Mercredi 15:00",
      priority: "medium",
      assignee: "Sophie Laurent",
      type: "mission",
    },
  ];

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="w-3 h-3 mr-1" />;
      case "meeting":
        return <Calendar className="w-3 h-3 mr-1" />;
      case "email":
        return <Mail className="w-3 h-3 mr-1" />;
      case "sms":
        return <MessageSquare className="w-3 h-3 mr-1" />;
      case "analysis":
        return <Brain className="w-3 h-3 mr-1" />;
      case "mission":
        return <Briefcase className="w-3 h-3 mr-1" />;
      default:
        return <Clock className="w-3 h-3 mr-1" />;
    }
  };

  // Import missing icons
  const Brain = ({ className }: { className: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">
            Vue d'ensemble de votre activité CRM -{" "}
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>30 derniers jours</option>
            <option>90 derniers jours</option>
            <option>Cette année</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Actualiser
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activités récentes */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Activités récentes
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 p-2 rounded-lg bg-gray-100">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {activity.time}
                    </p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === "new"
                        ? "bg-blue-100 text-blue-800"
                        : activity.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : activity.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {activity.status === "new"
                      ? "Nouveau"
                      : activity.status === "pending"
                      ? "En attente"
                      : activity.status === "completed"
                      ? "Terminé"
                      : "Urgent"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tâches à venir */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Tâches à venir
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        {getTaskIcon(task.type)}
                        <p className="text-sm font-medium text-gray-900">
                          {task.title}
                        </p>
                      </div>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{task.dueDate}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Assigné à {task.assignee}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {task.priority === "high"
                        ? "Haute"
                        : task.priority === "medium"
                        ? "Moyenne"
                        : "Basse"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Voir toutes les tâches →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Actions rapides
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <Building2 className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">
                  Nouvelle Entreprise
                </div>
                <div className="text-sm text-gray-500">
                  Ajouter un client/prospect
                </div>
              </div>
            </button>
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
              <Users className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Nouveau Contact</div>
                <div className="text-sm text-gray-500">Ajouter un contact</div>
              </div>
            </button>
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
              <Target className="w-6 h-6 text-purple-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">
                  Nouvelle Opportunité
                </div>
                <div className="text-sm text-gray-500">
                  Créer une opportunité
                </div>
              </div>
            </button>
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
              <Briefcase className="w-6 h-6 text-orange-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">
                  Nouvelle Mission
                </div>
                <div className="text-sm text-gray-500">Créer une mission</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
