/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Clock,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  Edit,
  Archive,
  MoreVertical,
} from "lucide-react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";
import Table from "../../UI/Table";
import MissionForm from "./MissionForm";
import MissionDetail from "./MissionDetail";

interface Mission {
  id: number;
  title: string;
  client: string;
  type: string;
  status: string;
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  timeSpent: number;
  estimatedTime: number;
  manager: string;
  team: string[];
  priority: string;
  documents: number;
  tasks: { completed: number; total: number };
  profitability: number;
}

const Missions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("active");
  const [showMissionDetail, setShowMissionDetail] = useState(false);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);

  const mockMissions: Mission[] = [
    {
      id: 1,
      title: "Audit Légal - Société ABC",
      client: "Société ABC",
      type: "Audit Légal",
      status: "En cours",
      progress: 65,
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      budget: 45000,
      timeSpent: 120,
      estimatedTime: 180,
      manager: "Marie Dubois",
      team: ["Jean Martin", "Sophie Laurent"],
      priority: "Haute",
      documents: 12,
      tasks: { completed: 8, total: 12 },
      profitability: 85,
    },
    {
      id: 2,
      title: "PCA - Innovation Corp",
      client: "Innovation Corp",
      type: "Plan de Continuité",
      status: "Planifiée",
      progress: 0,
      startDate: "2024-02-01",
      endDate: "2024-04-30",
      budget: 32000,
      timeSpent: 0,
      estimatedTime: 150,
      manager: "Pierre Durand",
      team: ["Marie Dubois"],
      priority: "Moyenne",
      documents: 3,
      tasks: { completed: 0, total: 8 },
      profitability: 0,
    },
    {
      id: 3,
      title: "Formation Comptabilité - Tech Solutions",
      client: "Tech Solutions",
      type: "Formation",
      status: "Terminée",
      progress: 100,
      startDate: "2023-11-01",
      endDate: "2023-12-15",
      budget: 18000,
      timeSpent: 85,
      estimatedTime: 80,
      manager: "Sophie Laurent",
      team: ["Jean Martin"],
      priority: "Basse",
      documents: 8,
      tasks: { completed: 6, total: 6 },
      profitability: 92,
    },
    {
      id: 4,
      title: "Conseil Fiscal - Entreprise XYZ",
      client: "Entreprise XYZ",
      type: "Conseil",
      status: "Terminée",
      progress: 100,
      startDate: "2024-05-01",
      endDate: "2024-06-30",
      budget: 25000,
      timeSpent: 100,
      estimatedTime: 110,
      manager: "Jean Martin",
      team: ["Pierre Durand"],
      priority: "Moyenne",
      documents: 5,
      tasks: { completed: 10, total: 10 },
      profitability: 88,
    },
    {
      id: 5,
      title: "Audit Interne - Groupe LMN",
      client: "Groupe LMN",
      type: "Audit Interne",
      status: "Planifiée",
      progress: 0,
      startDate: "2024-09-01",
      endDate: "2024-11-30",
      budget: 40000,
      timeSpent: 0,
      estimatedTime: 200,
      manager: "Sophie Laurent",
      team: ["Marie Dubois", "Pierre Durand"],
      priority: "Haute",
      documents: 2,
      tasks: { completed: 0, total: 15 },
      profitability: 0,
    },
  ];

  const handleSaveMission = (missionData: Omit<Mission, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingMission) {
      setMissions(prev => prev.map(mission => 
        mission.id === editingMission.id 
          ? { 
              ...missionData, 
              id: editingMission.id,
              createdAt: editingMission.createdAt,
              updatedAt: new Date()
            }
          : mission
      ));
    } else {
      const newMission: Mission = {
        ...missionData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setMissions(prev => [...prev, newMission]);
    }
    setEditingMission(null);
    setIsModalOpen(false);
  };

  const handleEditMission = (mission: Mission) => {
    setEditingMission(mission);
    setIsModalOpen(true);
  };

  const handleDeleteMission = (missionId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) {
      setMissions(prev => prev.filter(mission => mission.id !== missionId));
    }
  };

  const missionTypes = [
    { id: "audit", name: "Audit Légal", color: "bg-blue-100 text-blue-800" },
    {
      id: "pca",
      name: "Plan de Continuité",
      color: "bg-green-100 text-green-800",
    },
    {
      id: "formation",
      name: "Formation",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "cac",
      name: "Commissariat aux Comptes",
      color: "bg-orange-100 text-orange-800",
    },
    { id: "conseil", name: "Conseil", color: "bg-gray-100 text-gray-800" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "bg-blue-100 text-blue-800";
      case "Planifiée":
        return "bg-yellow-100 text-yellow-800";
      case "Terminée":
        return "bg-green-100 text-green-800";
      case "En retard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Haute":
        return "text-red-600";
      case "Moyenne":
        return "text-yellow-600";
      case "Basse":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const truncateTitle = (title: string, maxLength: number = 20) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  const columns = [
    {
      key: "title",
      title: "Mission",
      render: (mission: Mission) => (
        <div>
          <div className="font-medium text-gray-900">
            {truncateTitle(mission.title)}
          </div>
          <div className="text-sm text-gray-500">{mission.client}</div>
        </div>
      ),
    },
    {
      key: "etat",
      title: "État",
      render: (mission: Mission) => {
        if (mission.status === "Planifiée") {
          return (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => console.log(`Démarrer mission ${mission.id}`)}
            >
              Démarrer ({mission.progress}%)
            </Button>
          );
        } else {
          return (
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                mission.status
              )}`}
            >
              {mission.status} ({mission.progress}%)
            </span>
          );
        }
      },
    },
    {
      key: "manager",
      title: "Responsable",
      render: (mission: Mission) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <span className="text-sm text-gray-900">{mission.manager}</span>
        </div>
      ),
    },
    {
      key: "dates",
      title: "Échéances",
      render: (mission: Mission) => (
        <div className="text-sm">
          <div className="text-gray-900">{mission.endDate}</div>
          <div className="text-gray-500">Début: {mission.startDate}</div>
        </div>
      ),
    },
    {
      key: "profitability",
      title: "Rentabilité",
      render: (mission: Mission) => (
        <div className="flex items-center space-x-1">
          <TrendingUp
            className={`h-4 w-4 ${
              mission.profitability > 80
                ? "text-green-600"
                : mission.profitability > 60
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          />
          <span
            className={`text-sm font-medium ${
              mission.profitability > 80
                ? "text-green-600"
                : mission.profitability > 60
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {mission.profitability}%
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (mission: Mission) => (
        <div className="relative group">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <MoreVertical className="h-4 w-4 text-gray-600" />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <div className="py-2">
              <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                <Eye className="w-4 h-4" />
                <span>Voir les détails</span>
              </button>
              <button 
                onClick={() => handleEditMission(mission)}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
              >
                <Edit className="w-4 w-4" />
                <span>Modifier</span>
              </button>
              <button 
                onClick={() => handleDeleteMission(mission.id.toString())}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
              >
                <Archive className="w-4 h-4" />
                <span>Supprimer</span>
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const filteredMissions = missions.filter((mission) => {
    const matchesSearch =
      mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" &&
        ["En cours", "Planifiée"].includes(mission.status)) ||
      (activeTab === "completed" && mission.status === "Terminée");
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 max-w-full overflow-x-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Missions</h1>
          <p className="text-gray-600">
            Gérez vos missions d'audit, PCA, formations et conseils
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2"
          onClick={() => {
            setEditingMission(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          <span>Nouvelle Mission</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Missions Actives
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  missions.filter((m) =>
                    ["En cours", "Planifiée"].includes(m.status)
                  ).length
                }
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Terminées ce mois
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {missions.filter((m) => m.status === "Terminée").length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Rentabilité Moyenne
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(
                  missions.reduce((acc, m) => acc + m.profitability, 0) /
                    missions.length
                )}
                %
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En Retard</p>
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une mission..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filtres</span>
            </button>
          </div>

          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "active"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Actives
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "completed"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Terminées
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Toutes
            </button>
          </div>
        </div>
      </Card>

      {/* Missions Table */}
      <Card>
        <Table
          data={filteredMissions}
          columns={columns}
          className="min-w-full"
        />
      </Card>

      {/* Mission Detail Modal */}
      {selectedMission && (
        <Modal
          isOpen={!!selectedMission}
          onClose={() => setSelectedMission(null)}
          title={selectedMission.title}
          size="xl"
        >
          <div className="space-y-6">
            {/* Mission Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Informations Générales
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Client:</span>{" "}
                    {selectedMission.client}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span>{" "}
                    {selectedMission.type}
                  </div>
                  <div>
                    <span className="font-medium">Responsable:</span>{" "}
                    {selectedMission.manager}
                  </div>
                  <div>
                    <span className="font-medium">Équipe:</span>{" "}
                    {selectedMission.team.join(", ")}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Planning</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Début:</span>{" "}
                    {selectedMission.startDate}
                  </div>
                  <div>
                    <span className="font-medium">Fin:</span>{" "}
                    {selectedMission.endDate}
                  </div>
                  <div>
                    <span className="font-medium">Progression:</span>{" "}
                    {selectedMission.progress}%
                  </div>
                  <div>
                    <span className="font-medium">Priorité:</span>
                    <span
                      className={`ml-1 ${getPriorityColor(
                        selectedMission.priority
                      )}`}
                    >
                      {selectedMission.priority}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Financier</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Budget:</span> €
                    {selectedMission.budget.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Temps passé:</span>{" "}
                    {selectedMission.timeSpent}h
                  </div>
                  <div>
                    <span className="font-medium">Temps estimé:</span>{" "}
                    {selectedMission.estimatedTime}h
                  </div>
                  <div>
                    <span className="font-medium">Rentabilité:</span>
                    <span
                      className={`ml-1 ${
                        selectedMission.profitability > 80
                          ? "text-green-600"
                          : selectedMission.profitability > 60
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedMission.profitability}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">
                  Progression des Tâches
                </h4>
                <span className="text-sm text-gray-600">
                  {selectedMission.tasks.completed}/
                  {selectedMission.tasks.total} tâches
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{
                    width: `${
                      (selectedMission.tasks.completed /
                        selectedMission.tasks.total) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="secondary">
                <FileText className="h-4 w-4 mr-2" />
                Documents ({selectedMission.documents})
              </Button>
              <Button variant="secondary">
                <Clock className="h-4 w-4 mr-2" />
                Feuilles de Temps
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Mission Detail Component */}
      {selectedMission && showMissionDetail && (
        <MissionDetail
          mission={selectedMission}
          onClose={() => {
            setSelectedMission(null);
            setShowMissionDetail(false);
          }}
          onEdit={() => {
            setEditingMission(selectedMission);
            setShowMissionDetail(false);
            setIsModalOpen(true);
          }}
        />
      )}

      {/* Create Mission Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMission(null);
        }}
        title={editingMission ? "Modifier la Mission" : "Nouvelle Mission"}
        size="lg"
      >
        <MissionForm
          mission={editingMission}
          onClose={() => {
            setIsModalOpen(false);
            setEditingMission(null);
          }}
          onSave={handleSaveMission}
        />
      </Modal>
    </div>
  );
};

export default Missions;