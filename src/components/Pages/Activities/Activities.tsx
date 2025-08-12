import React, { useState } from "react";
import {
  Plus,
  Calendar,
  Clock,
  Phone,
  Mail,
  Users,
  MapPin,
  Filter,
  Search,
} from "lucide-react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";

const Activities: React.FC = () => {
  const [activeView, setActiveView] = useState<"list" | "calendar">("list");
  const [searchTerm, setSearchTerm] = useState("");

  const tasks = [
    {
      id: 1,
      type: "meeting",
      title: "Réunion de suivi - Société ABC",
      client: "Société ABC",
      contact: "Jean Dupont",
      date: "2024-01-20",
      time: "14:00",
      duration: "1h",
      status: "scheduled",
      priority: "high",
      notes: "Présentation des nouvelles fonctionnalités",
    },
    {
      id: 2,
      type: "call",
      title: "Appel de prospection - Innovation Corp",
      client: "Innovation Corp",
      contact: "Marie Martin",
      date: "2024-01-20",
      time: "10:30",
      duration: "30min",
      status: "completed",
      priority: "medium",
      notes: "Premier contact établi, intérêt confirmé",
    },
    {
      id: 3,
      type: "email",
      title: "Envoi proposition - Tech Solutions",
      client: "Tech Solutions",
      contact: "Pierre Durand",
      date: "2024-01-19",
      time: "16:45",
      duration: "-",
      status: "completed",
      priority: "high",
      notes: "Proposition commerciale détaillée envoyée",
    },
    {
      id: 4,
      type: "meeting",
      title: "Présentation produit - Global Industries",
      client: "Global Industries",
      contact: "Sophie Legrand",
      date: "2024-01-21",
      time: "09:00",
      duration: "2h",
      status: "scheduled",
      priority: "high",
      notes: "Démonstration complète de la plateforme",
    },
    {
      id: 5,
      type: "task",
      title: "Préparation contrat - Modern Systems",
      client: "Modern Systems",
      contact: "Sarah Wilson",
      date: "2024-01-22",
      time: "11:00",
      duration: "1h",
      status: "pending",
      priority: "medium",
      notes: "Finaliser les termes du contrat",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return Users;
      case "call":
        return Phone;
      case "email":
        return Mail;
      case "task":
        return Clock;
      default:
        return Calendar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const filteredtasks = tasks.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const todaytasks = filteredtasks.filter(
    (activity) => activity.date === "2024-01-20"
  );
  const upcomingtasks = filteredtasks.filter(
    (activity) => activity.date > "2024-01-20"
  );
  const pasttasks = filteredtasks.filter(
    (activity) => activity.date < "2024-01-20"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activités</h1>
          <p className="text-gray-600">Suivez vos tâches et rendez-vous</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView("list")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === "list"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Liste
            </button>
            <button
              onClick={() => setActiveView("calendar")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === "calendar"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Calendrier
            </button>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nouvelle Activité</span>
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aujourd'hui</p>
              <p className="text-2xl font-semibold text-gray-900">
                {todaytasks.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">À venir</p>
              <p className="text-2xl font-semibold text-gray-900">
                {upcomingtasks.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Réunions</p>
              <p className="text-2xl font-semibold text-gray-900">
                {tasks.filter((a) => a.type === "meeting").length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Phone className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Appels</p>
              <p className="text-2xl font-semibold text-gray-900">
                {tasks.filter((a) => a.type === "call").length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une activité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>Filtres</span>
          </button>
        </div>
      </Card>

      {/* tasks List */}
      <div className="space-y-6">
        {/* Today */}
        {todaytasks.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Aujourd'hui
            </h2>
            <div className="space-y-4">
              {todaytasks.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <Card
                    key={activity.id}
                    className={`p-6 border-l-4 ${getPriorityColor(
                      activity.priority
                    )}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {activity.title}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              activity.status
                            )}`}
                          >
                            {activity.status}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            {activity.client}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {activity.time} ({activity.duration})
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {activity.contact}
                          </div>
                        </div>

                        {activity.notes && (
                          <p className="mt-3 text-gray-600">{activity.notes}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Upcoming */}
        {upcomingtasks.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              À venir
            </h2>
            <div className="space-y-4">
              {upcomingtasks.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <Card
                    key={activity.id}
                    className={`p-6 border-l-4 ${getPriorityColor(
                      activity.priority
                    )}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Icon className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {activity.title}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              activity.status
                            )}`}
                          >
                            {activity.status}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {activity.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            {activity.time} ({activity.duration})
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            {activity.client}
                          </div>
                        </div>

                        {activity.notes && (
                          <p className="mt-3 text-gray-600">{activity.notes}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Past */}
        {pasttasks.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Terminées
            </h2>
            <div className="space-y-4">
              {pasttasks.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <Card key={activity.id} className="p-6 bg-gray-50">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Icon className="h-5 w-5 text-green-600" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {activity.title}
                          </h3>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            Terminé
                          </span>
                        </div>

                        <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {activity.date}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            {activity.client}
                          </div>
                        </div>

                        {activity.notes && (
                          <p className="mt-3 text-gray-600">{activity.notes}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
