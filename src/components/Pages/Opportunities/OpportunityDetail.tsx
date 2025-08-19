import React, { useState } from 'react';
import { 
  Target, 
  Building2, 
  DollarSign, 
  Calendar,
  TrendingUp,
  User,
  FileText,
  Plus,
  Edit,
  Archive,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare
} from 'lucide-react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Badge from '../../UI/Badge';
import Modal from '../../UI/Modal';
import { Opportunity } from './Opportunities';
import { mockEntities as entities } from '../Entities/EntitiesList';

interface OpportunityDetailProps {
  opportunity: Opportunity;
  onClose: () => void;
  onEdit: () => void;
}

const OpportunityDetail: React.FC<OpportunityDetailProps> = ({ opportunity, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getEntityName = (entityId: string) => {
    const entity = entities.find(e => e.id === entityId);
    return entity?.companyName || 'Entreprise inconnue';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'spontaneous': return 'bg-purple-100 text-purple-800';
      case 'technical': return 'bg-orange-100 text-orange-800';
      case 'tender': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    if (probability >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: Target },
    { id: 'timeline', name: 'Chronologie', icon: Clock },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'communications', name: 'Communications', icon: MessageSquare },
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
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Valeur</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(opportunity.value)}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Probabilité</p>
                    <p className={`text-lg font-semibold ${getProbabilityColor(opportunity.probability)}`}>
                      {opportunity.probability}%
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Valeur Pondérée</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency((opportunity.value * opportunity.probability) / 100)}
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-orange-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Jours restants</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {Math.ceil((new Date(opportunity.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Opportunity Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-medium text-gray-900 mb-4">Informations générales</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entreprise</span>
                    <span className="font-medium">{getEntityName(opportunity.entityId)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <Badge variant="info" size="sm">
                      {opportunity.type === 'spontaneous' ? 'Spontanée' :
                       opportunity.type === 'technical' ? 'Technique' : 'Appel d\'offres'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Statut</span>
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
                  <div className="flex justify-between">
                    <span className="text-gray-600">Créée le</span>
                    <span className="font-medium">
                      {new Date(opportunity.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-medium text-gray-900 mb-4">Planning</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date limite</span>
                    <span className="font-medium">
                      {new Date(opportunity.deadline).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temps restant</span>
                    <span className={`font-medium ${
                      Math.ceil((new Date(opportunity.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) < 7
                        ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {Math.ceil((new Date(opportunity.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} jours
                    </span>
                  </div>
                  {opportunity.requiresApproval && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Approbation</span>
                      <span className={`font-medium ${
                        opportunity.approvedBy ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {opportunity.approvedBy ? `Approuvée par ${opportunity.approvedBy}` : 'En attente'}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Description */}
            <Card className="p-6">
              <h4 className="font-medium text-gray-900 mb-3">Description</h4>
              <p className="text-gray-600">{opportunity.description}</p>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h4 className="font-medium text-gray-900 mb-4">Actions rapides</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="secondary" size="sm" className="justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Générer Proposition
                </Button>
                <Button variant="secondary" size="sm" className="justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Envoyer Email
                </Button>
                <Button variant="secondary" size="sm" className="justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Planifier RDV
                </Button>
                <Button variant="secondary" size="sm" className="justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter Note
                </Button>
              </div>
            </Card>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Chronologie</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter Événement
              </Button>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  type: 'created',
                  title: 'Opportunité créée',
                  description: 'Opportunité créée dans le système',
                  date: opportunity.createdAt,
                  user: 'Système',
                  icon: Plus,
                  color: 'text-blue-600'
                },
                {
                  type: 'updated',
                  title: 'Probabilité mise à jour',
                  description: `Probabilité passée de 60% à ${opportunity.probability}%`,
                  date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                  user: 'Marie Dubois',
                  icon: TrendingUp,
                  color: 'text-green-600'
                },
                {
                  type: 'document',
                  title: 'Document ajouté',
                  description: 'Proposition commerciale v1.0',
                  date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                  user: 'Jean Martin',
                  icon: FileText,
                  color: 'text-purple-600'
                }
              ].map((event, index) => {
                const Icon = event.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className={`flex-shrink-0 p-2 rounded-lg bg-white ${event.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                        <span className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <p className="text-xs text-gray-500 mt-2">Par {event.user}</p>
                    </div>
                  </div>
                );
              })}
            </div>
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
    <Modal isOpen={true} onClose={onClose} title={opportunity.title} size="xl">
      <div className="space-y-6">
        {/* Opportunity Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{opportunity.title}</h1>
              <div className="flex items-center space-x-3 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(opportunity.status)}`}>
                  {opportunity.status === 'won' ? 'Gagnée' :
                   opportunity.status === 'lost' ? 'Perdue' :
                   opportunity.status === 'submitted' ? 'Soumise' : 'Brouillon'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(opportunity.type)}`}>
                  {opportunity.type === 'spontaneous' ? 'Spontanée' :
                   opportunity.type === 'technical' ? 'Technique' : 'Appel d\'offres'}
                </span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className={`w-4 h-4 ${getProbabilityColor(opportunity.probability)}`} />
                  <span className={`text-sm font-medium ${getProbabilityColor(opportunity.probability)}`}>
                    {opportunity.probability}%
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Building2 className="w-4 h-4" />
                  <span>{getEntityName(opportunity.entityId)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{formatCurrency(opportunity.value)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(opportunity.deadline).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            {opportunity.status === 'submitted' && (
              <>
                <Button variant="success">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marquer Gagnée
                </Button>
                <Button variant="danger">
                  <XCircle className="h-4 w-4 mr-2" />
                  Marquer Perdue
                </Button>
              </>
            )}
            <Button variant="secondary">
              <Archive className="h-4 w-4 mr-2" />
              Archiver
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

export default OpportunityDetail;