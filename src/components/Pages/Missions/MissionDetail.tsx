import React, { useState } from 'react';
import { 
  Briefcase, 
  Clock, 
  User, 
  DollarSign, 
  Calendar,
  CheckCircle,
  AlertCircle,
  FileText,
  Plus,
  Edit,
  Archive,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Badge from '../../UI/Badge';
import Modal from '../../UI/Modal';
import { Mission } from '../../../types';

interface MissionDetailProps {
  mission: Mission;
  onClose: () => void;
  onEdit: () => void;
}

const MissionDetail: React.FC<MissionDetailProps> = ({ mission, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500';
      case 'high': return 'border-l-orange-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: Briefcase },
    { id: 'activities', name: 'Activités', icon: CheckCircle },
    { id: 'tasks', name: 'Tâches', icon: Target },
    { id: 'timesheets', name: 'Temps', icon: Clock },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'team', name: 'Équipe', icon: Users },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progression</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Avancement global</span>
                    <span>{mission.activities?.length ? 
                      Math.round((mission.activities.filter(a => a.status === 'completed').length / mission.activities.length) * 100) 
                      : 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full" 
                      style={{ width: `${mission.activities?.length ? 
                        (mission.activities.filter(a => a.status === 'completed').length / mission.activities.length) * 100 
                        : 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {mission.activities?.filter(a => a.status === 'completed').length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Activités terminées</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {mission.activities?.filter(a => a.status === 'in_progress').length || 0}
                    </div>
                    <div className="text-sm text-gray-600">En cours</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mission.profitability || 0}%
                    </div>
                    <div className="text-sm text-gray-600">Rentabilité</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-medium text-gray-900 mb-4">Informations financières</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget alloué</span>
                    <span className="font-medium">{formatCurrency(mission.budget)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coût actuel</span>
                    <span className="font-medium">{formatCurrency(mission.actualCost || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rentabilité</span>
                    <span className={`font-medium ${
                      (mission.profitability || 0) > 80 ? 'text-green-600' :
                      (mission.profitability || 0) > 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {mission.profitability || 0}%
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-medium text-gray-900 mb-4">Planning</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date de début</span>
                    <span className="font-medium">
                      {new Date(mission.startDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  {mission.endDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date de fin</span>
                      <span className="font-medium">
                        {new Date(mission.endDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Équipe assignée</span>
                    <span className="font-medium">{mission.assignedUsers?.length || 0} personnes</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h4 className="font-medium text-gray-900 mb-4">Activité récente</h4>
              <div className="space-y-3">
                {[
                  {
                    type: 'task_completed',
                    title: 'Tâche terminée',
                    description: 'Analyse des risques financiers',
                    time: 'Il y a 2 heures',
                    user: 'Marie Dubois'
                  },
                  {
                    type: 'document_added',
                    title: 'Document ajouté',
                    description: 'Rapport d\'audit préliminaire',
                    time: 'Il y a 1 jour',
                    user: 'Jean Martin'
                  },
                  {
                    type: 'milestone_reached',
                    title: 'Jalon atteint',
                    description: 'Phase 1 - Analyse terminée',
                    time: 'Il y a 3 jours',
                    user: 'Sophie Laurent'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time} par {activity.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case 'activities':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Activités ({mission.activities?.length || 0})
              </h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Activité
              </Button>
            </div>
            
            {!mission.activities || mission.activities.length === 0 ? (
              <Card className="p-8 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Aucune activité enregistrée</p>
                <Button className="mt-4" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer une activité
                </Button>
              </Card>
            ) : (
              <div className="space-y-3">
                {mission.activities.map((activity) => (
                  <Card key={activity.id} className={`p-4 border-l-4 ${getPriorityColor('medium')}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <Badge 
                            variant={
                              activity.status === 'completed' ? 'success' :
                              activity.status === 'in_progress' ? 'warning' :
                              activity.status === 'blocked' ? 'danger' : 'default'
                            }
                            size="sm"
                          >
                            {activity.status === 'completed' ? 'Terminée' :
                             activity.status === 'in_progress' ? 'En cours' :
                             activity.status === 'blocked' ? 'Bloquée' : 'En attente'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {activity.assignedTo}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(activity.startDate).toLocaleDateString('fr-FR')}
                          </span>
                          {activity.endDate && (
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(activity.endDate).toLocaleDateString('fr-FR')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="secondary" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 'tasks':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Tâches ({mission.tasks?.length || 0})
              </h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Tâche
              </Button>
            </div>
            
            {!mission.tasks || mission.tasks.length === 0 ? (
              <Card className="p-8 text-center">
                <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Aucune tâche enregistrée</p>
                <Button className="mt-4" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer une tâche
                </Button>
              </Card>
            ) : (
              <div className="space-y-3">
                {mission.tasks.map((task) => (
                  <Card key={task.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={task.status === 'completed'}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          readOnly
                        />
                        <div className="flex-1">
                          <h4 className={`font-medium ${
                            task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                          }`}>
                            {task.title}
                          </h4>
                          <p className="text-sm text-gray-600">{task.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {task.assignedTo}
                            </span>
                            {task.dueDate && (
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                              </span>
                            )}
                            {task.estimatedHours && (
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {task.estimatedHours}h estimées
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            task.priority === 'urgent' ? 'danger' :
                            task.priority === 'high' ? 'warning' :
                            task.priority === 'medium' ? 'info' : 'default'
                          }
                          size="sm"
                        >
                          {task.priority === 'urgent' ? 'Urgent' :
                           task.priority === 'high' ? 'Haute' :
                           task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                        </Badge>
                        <Button variant="secondary" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <Card className="p-8 text-center">
            <p className="text-gray-600">Contenu à venir...</p>
          </Card>
        );
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={mission.title} size="xl">
      <div className="space-y-6">
        {/* Mission Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{mission.title}</h1>
              <div className="flex items-center space-x-3 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(mission.status)}`}>
                  {mission.status === 'active' ? 'Active' :
                   mission.status === 'completed' ? 'Terminée' :
                   mission.status === 'draft' ? 'Brouillon' :
                   mission.status === 'archived' ? 'Archivée' : 'Annulée'}
                </span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-900">{mission.profitability || 0}%</span>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{formatCurrency(mission.budget)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(mission.startDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{mission.assignedUsers?.length || 0} membres</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <Button variant="secondary">
              <Archive className="h-4 w-4 mr-2" />
              Archiver
            </Button>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-gray-600">{mission.description}</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {renderTabContent()}
        </div>
      </div>
    </Modal>
  );
};

export default MissionDetail;