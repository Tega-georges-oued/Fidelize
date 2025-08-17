import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  DollarSign, 
  Star, 
  Phone, 
  Mail, 
  Calendar,
  Plus,
  Edit,
  Trash2,
  FileText,
  Target,
  Briefcase,
  TrendingUp,
  Clock,
  MessageSquare
} from 'lucide-react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Badge from '../../UI/Badge';
import Modal from '../../UI/Modal';
import { Entity } from '../../../types';
import { useStore } from '../../../store/useStore';
import { mockOpportunities } from '../Opportunities/Opportunities';

interface EntityDetailProps {
  entity: Entity;
  onClose: () => void;
  onEdit: () => void;
}

const EntityDetail: React.FC<EntityDetailProps> = ({ entity, onClose, onEdit }) => {
  const { contacts } = useStore();
  const [activeTab, setActiveTab] = useState('overview');

  const entityContacts = contacts.filter(c => c.entityId === entity.id);
  const entityOpportunities = mockOpportunities.filter(o => o.entityId === entity.id);
  
  const totalOpportunityValue = entityOpportunities.reduce((sum, opp) => sum + opp.value, 0);
  const avgProbability = entityOpportunities.length > 0 
    ? entityOpportunities.reduce((sum, opp) => sum + opp.probability, 0) / entityOpportunities.length 
    : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    return status === 'client' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-purple-100 text-purple-800';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: Building2 },
    { id: 'contacts', name: 'Contacts', icon: Users },
    { id: 'opportunities', name: 'Opportunités', icon: Target },
    { id: 'missions', name: 'Missions', icon: Briefcase },
    { id: 'interactions', name: 'Interactions', icon: MessageSquare },
    { id: 'documents', name: 'Documents', icon: FileText },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Contacts</p>
                    <p className="text-2xl font-semibold text-gray-900">{entityContacts.length}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-green-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Opportunités</p>
                    <p className="text-2xl font-semibold text-gray-900">{entityOpportunities.length}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Valeur Pipeline</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {totalOpportunityValue > 0 ? `${(totalOpportunityValue / 1_000_000).toFixed(1)}M` : '0'}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Prob. Moyenne</p>
                    <p className="text-2xl font-semibold text-gray-900">{avgProbability.toFixed(0)}%</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
              <div className="space-y-4">
                {[
                  {
                    type: 'opportunity',
                    title: 'Nouvelle opportunité créée',
                    description: 'Audit annuel - 45M FCFA',
                    time: 'Il y a 2 heures',
                    icon: Target,
                    color: 'text-green-600'
                  },
                  {
                    type: 'contact',
                    title: 'Contact mis à jour',
                    description: 'Informations de Marie Dubois mises à jour',
                    time: 'Il y a 1 jour',
                    icon: Users,
                    color: 'text-blue-600'
                  },
                  {
                    type: 'interaction',
                    title: 'Appel téléphonique',
                    description: 'Suivi commercial - 30 minutes',
                    time: 'Il y a 3 jours',
                    icon: Phone,
                    color: 'text-purple-600'
                  }
                ].map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Icon className={`h-5 w-5 ${activity.color} mt-0.5`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        );

      case 'contacts':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Contacts ({entityContacts.length})
              </h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Contact
              </Button>
            </div>
            
            {entityContacts.length === 0 ? (
              <Card className="p-8 text-center">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Aucun contact enregistré</p>
                <Button className="mt-4" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un contact
                </Button>
              </Card>
            ) : (
              <div className="space-y-3">
                {entityContacts.map((contact) => (
                  <Card key={contact.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {contact.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{contact.name}</h4>
                            {contact.isPrimary && (
                              <Badge variant="success" size="sm">Principal</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{contact.role}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {contact.email}
                            </span>
                            <span className="flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {contact.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="secondary" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
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

      case 'opportunities':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Opportunités ({entityOpportunities.length})
              </h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Opportunité
              </Button>
            </div>
            
            {entityOpportunities.length === 0 ? (
              <Card className="p-8 text-center">
                <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Aucune opportunité enregistrée</p>
                <Button className="mt-4" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer une opportunité
                </Button>
              </Card>
            ) : (
              <div className="space-y-3">
                {entityOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{opportunity.title}</h4>
                          <Badge 
                            variant={
                              opportunity.status === 'won' ? 'success' :
                              opportunity.status === 'lost' ? 'danger' :
                              opportunity.status === 'submitted' ? 'warning' : 'default'
                            }
                            size="sm"
                          >
                            {opportunity.status === 'won' ? 'Gagnée' :
                             opportunity.status === 'lost' ? 'Perdue' :
                             opportunity.status === 'submitted' ? 'Soumise' : 'Brouillon'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{opportunity.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {formatCurrency(opportunity.value)}
                          </span>
                          <span className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {opportunity.probability}%
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(opportunity.deadline).toLocaleDateString('fr-FR')}
                          </span>
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

      default:
        return (
          <Card className="p-8 text-center">
            <p className="text-gray-600">Contenu à venir...</p>
          </Card>
        );
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={entity.companyName} size="xl">
      <div className="space-y-6">
        {/* Entity Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{entity.companyName}</h1>
              <div className="flex items-center space-x-3 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(entity.status)}`}>
                  {entity.status === 'client' ? 'Client' : 'Prospect'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(entity.priority)}`}>
                  Priorité {entity.priority === 'critical' ? 'Critique' : 
                           entity.priority === 'high' ? 'Haute' :
                           entity.priority === 'medium' ? 'Moyenne' : 'Faible'}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-900">{entity.score}</span>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{entity.region} • {entity.sector}</span>
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
          <div className="flex space-x-2">
            <Button variant="secondary" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <Button variant="secondary">
              <Phone className="h-4 w-4 mr-2" />
              Appeler
            </Button>
            <Button variant="secondary">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
          </div>
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

export default EntityDetail;