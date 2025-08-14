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
  AlertTriangle,
} from "lucide-react";

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
  const kpis = [
    {
      title: "Entreprises totales",
      value: "1,247",
      change: 12,
      changeType: "increase" as const,
      icon: <Building2 className="w-6 h-6 text-white" />,
      color: "bg-blue-500",
    },
    {
      title: "Contacts actifs",
      value: "3,891",
      change: 8,
      changeType: "increase" as const,
      icon: <Users className="w-6 h-6 text-white" />,
      color: "bg-green-500",
    },
    {
      title: "Missions en cours",
      value: "47",
      change: -5,
      changeType: "decrease" as const,
      icon: <Briefcase className="w-6 h-6 text-white" />,
      color: "bg-orange-500",
    },
    {
      title: "Opportunités actives",
      value: "23",
      change: 15,
      changeType: "increase" as const,
      icon: <Target className="w-6 h-6 text-white" />,
      color: "bg-purple-500",
    },
    {
      title: "CA potentiel",
      value: "€2.4M",
      change: 22,
      changeType: "increase" as const,
      icon: <DollarSign className="w-6 h-6 text-white" />,
      color: "bg-emerald-500",
    },
    {
      title: "Taux de conversion",
      value: "68%",
      change: 3,
      changeType: "increase" as const,
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      color: "bg-indigo-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "mission",
      title: "Mission PCA - Société ALPHA",
      description: "Nouvelle mission de Plan de Continuité d'Activité initiée",
      time: "Il y a 2 heures",
      icon: <Briefcase className="w-4 h-4 text-orange-600" />,
      status: "new",
    },
    {
      id: 2,
      type: "opportunity",
      title: "Opportunité - Audit légal BETA Corp",
      description: "Proposition envoyée, en attente de retour client",
      time: "Il y a 4 heures",
      icon: <Target className="w-4 h-4 text-purple-600" />,
      status: "pending",
    },
    {
      id: 3,
      type: "completed",
      title: "Mission formation - GAMMA Industries",
      description: "Formation comptabilité avancée terminée avec succès",
      time: "Il y a 1 jour",
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
      status: "completed",
    },
    {
      id: 4,
      type: "alert",
      title: "Échéance proche - Mission DELTA",
      description: "Livrable attendu dans 3 jours",
      time: "Il y a 2 jours",
      icon: <AlertTriangle className="w-4 h-4 text-red-600" />,
      status: "urgent",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Révision rapport audit - EPSILON",
      dueDate: "Aujourd'hui 16:00",
      priority: "high",
      assignee: "Marie Dubois",
    },
    {
      id: 2,
      title: "Appel de suivi - Prospect ZETA",
      dueDate: "Demain 10:00",
      priority: "medium",
      assignee: "Jean Martin",
    },
    {
      id: 3,
      title: "Préparation formation PCA",
      dueDate: "Vendredi 14:00",
      priority: "medium",
      assignee: "Sophie Laurent",
    },
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Vue d'ensemble de votre activité CRM</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>30 derniers jours</option>
            <option>90 derniers jours</option>
            <option>Cette année</option>
          </select>
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
                      <p className="text-sm font-medium text-gray-900">
                        {task.title}
                      </p>
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
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {task.priority === "high" ? "Haute" : "Moyenne"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
