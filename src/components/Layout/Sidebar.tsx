import React from "react";
import {
  Building2,
  Users,
  Briefcase,
  Target,
  FileText,
  BarChart3,
  Settings,
  Search,
  Bell,
  MessageSquare,
  Calendar,
  TrendingUp,
  Shield,
  Database,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  {
    id: "dashboard",
    label: "Tableau de bord",
    icon: BarChart3,
    color: "text-blue-600",
  },
  {
    id: "entities",
    label: "Entreprises",
    icon: Building2,
    color: "text-green-600",
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: Users,
    color: "text-purple-600",
  },
  {
    id: "missions",
    label: "Missions",
    icon: Briefcase,
    color: "text-orange-600",
  },
  {
    id: "activities",
    label: "Activites",
    icon: Briefcase,
    color: "text-orange-600",
  },
  {
    id: "opportunities",
    label: "Opportunités",
    icon: Target,
    color: "text-red-600",
  },
  {
    id: "needs-analysis",
    label: "Analyse des besoins",
    icon: Search,
    color: "text-indigo-600",
  },
  {
    id: "communications",
    label: "Communications",
    icon: MessageSquare,
    color: "text-pink-600",
  },
  {
    id: "calendar",
    label: "Calendrier",
    icon: Calendar,
    color: "text-teal-600",
  },
  {
    id: "interactions",
    label: "Interactions",
    icon: MessageSquare,
    color: "text-indigo-600",
  },
  {
    id: "reports",
    label: "Rapports",
    icon: TrendingUp,
    color: "text-yellow-600",
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
    color: "text-gray-600",
  },
  {
    id: "templates",
    label: "Templates",
    icon: FileText,
    color: "text-gray-600",
  },
  {
    id: "alerts",
    label: "Alertes",
    icon: Bell,
    color: "text-red-500",
  },
  {
    id: "security",
    label: "Sécurité",
    icon: Shield,
    color: "text-blue-500",
  },
  {
    id: "data-management",
    label: "Gestion des données",
    icon: Database,
    color: "text-gray-500",
  },
  {
    id: "settings",
    label: "Paramètres",
    icon: Settings,
    color: "text-gray-500",
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  return (
    <div className="w-64 bg-white shadow-lg h-full overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Fidalli CRM</h1>
            <p className="text-sm text-gray-500">Cabinet d'expertise</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-blue-600" : item.color
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Version 3.0
          </h3>
          <p className="text-xs text-gray-600">
            CRM intégré pour la gestion complète du cycle client
          </p>
        </div>
      </div>
    </div>
  );
};
