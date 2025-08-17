import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  Users,
  MapPin,
  Calendar,
  Clock,
  MessageSquare,
  Video,
  FileText,
  Eye,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Badge from '../../UI/Badge';
import Modal from '../../UI/Modal';
import InteractionForm from './InteractionForm';
import { useStore } from '../../../store/useStore';
import { mockEntities as entities } from '../Entities/EntitiesList';
import { Interaction } from '../../../types';

const Interactions: React.FC = () => {
  const { contacts } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState<Interaction | null>(null);
  const [editingInteraction, setEditingInteraction] = useState<Interaction | null>(null);

  // Mock data for interactions
  const [interactions, setInteractions] = useState<Interaction[]>([
    {
      id: '1',
      type: 'call',
      subject: 'Suivi commercial - ALPHA Industries',
      description: 'Discussion sur la proposition d\'audit annuel. Client intéressé mais souhaite des précisions sur le planning.',
      date: new Date('2024-01-20T14:30:00'),
      duration: 45,
      entityId: '1',
      contactId: '1',
      userId: 'user1',
      outcome: 'Rendez-vous programmé pour présentation détaillée',
      followUpRequired: true,
      followUpDate: new Date('2024-01-25T10:00:00'),
      attachments: []
    },
    {
      id: '2',
      type: 'email',
      subject: 'Envoi proposition - BETA Télécoms',
      description: 'Envoi de la proposition commerciale pour mission de conseil fiscal.',
      date: new Date('2024-01-19T16:15:00'),
      entityId: '2',
      contactId: '2',
      userId: 'user1',
      outcome: 'Proposition envoyée, accusé de réception reçu',
      followUpRequired: true,
      followUpDate: new Date('2024-01-26T09:00:00'),
      attachments: ['proposition_beta_telecom.pdf']
    },
    {
      id: '3',
      type: 'meeting',
      subject: 'Réunion de lancement - GAMMA ONG',
      description: 'Réunion de lancement du projet de formation comptable. Présentation de l\'équipe et du planning.',
      date: new Date('2024-01-18T09:00:00'),
      duration: 120,
      entityId: '3',
      userId: 'user1',
      outcome: 'Projet validé, planning approuvé',
      followUpRequired: false,
      attachments: ['planning_formation_gamma.pdf', 'contrat_signe.pdf']
    },
    {
      id: '4',
      type: 'visit',
      subject: 'Visite sur site - ALPHA Industries',
      description: 'Visite des locaux pour évaluation des besoins en audit interne.',
      date: new Date('2024-01-17T14:00:00'),
      duration: 180,
      entityId: '1',
      contactId: '1',
      userId: 'user1',
      outcome: 'Besoins identifiés, proposition à préparer',
      followUpRequired: true,
      followUpDate: new Date('2024-01-24T14:00:00'),
      attachments: ['rapport_visite.pdf']
    }
  ]);

  const getEntityName = (entityId: string) => {
    const entity = entities.find(e => e.id === entityId);
    return entity?.companyName || 'Entreprise inconnue';
  };

  const getContactName = (contactId?: string) => {
    if (!contactId) return null;
    const contact = contacts.find(c => c.id === contactId);
    return contact?.name || 'Contact inconnu';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone;
      case 'email': return Mail;
      case 'meeting': return Users;
      case 'visit': return MapPin;
      case 'sms': return MessageSquare;
      case 'whatsapp': return MessageSquare;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-blue-100 text-blue-800';
      case 'email': return 'bg-green-100 text-green-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      case 'visit': return 'bg-orange-100 text-orange-800';
      case 'sms': return 'bg-yellow-100 text-yellow-800';
      case 'whatsapp': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'call': return 'Appel';
      case 'email': return 'Email';
      case 'meeting': return 'Réunion';
      case 'visit': return 'Visite';
      case 'sms': return 'SMS';
      case 'whatsapp': return 'WhatsApp';
      default: return type;
    }
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
    }
    return `${mins}min`;
  };

  const filteredInteractions = interactions.filter(interaction => {
    const entity = entities.find(e => e.id === interaction.entityId);
    const contact = contacts.find(c => c.id === interaction.contactId);
    
    const matchesSearch = 
      interaction.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entity?.companyName && entity.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact?.name && contact.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'all' || interaction.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const handleSaveInteraction = (interactionData: Omit<Interaction, 'id' | 'date' | 'userId'>) => {
    if (editingInteraction) {
      setInteractions(prev => prev.map(interaction => 
        interaction.id === editingInteraction.id 
          ? { 
              ...interactionData, 
              id: editingInteraction.id,
              date: editingInteraction.date,
              userId: editingInteraction.userId
            }
          : interaction
      ));
    } else {
      const newInteraction: Interaction = {
        ...interactionData,
        id: Date.now().toString(),
        date: new Date(),
        userId: 'user1'
      };
      setInteractions(prev => [newInteraction, ...prev]);
    }
    setEditingInteraction(null);
    setIsModalOpen(false);
  };

  const handleEditInteraction = (interaction: Interaction) => {
    setEditingInteraction(interaction);
    setIsModalOpen(true);
  };

  const handleDeleteInteraction = (interactionId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette interaction ?')) {
      setInteractions(prev => prev.filter(interaction => interaction.id !== interactionId));
    }
  };

  // Statistics
  const totalInteractions = interactions.length;
  const todayInteractions = interactions.filter(i => 
    new Date(i.date).toDateString() === new Date().toDateString()
  ).length;
  const followUpRequired = interactions.filter(i => i.followUpRequired).length;
  const avgDuration = interactions
    .filter(i => i.duration)
    .reduce((sum, i) => sum + (i.duration || 0), 0) / 
    interactions.filter(i => i.duration).length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interactions</h1>
          <p className="text-gray-600">
            Suivez toutes vos interactions avec les clients et prospects
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingInteraction(null);
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nouvelle Interaction</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Interactions</p>
              <p className="text-2xl font-semibold text-gray-900">{totalInteractions}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aujourd'hui</p>
              <p className="text-2xl font-semibold text-gray-900">{todayInteractions}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Durée Moyenne</p>
              <p className="text-2xl font-semibold text-gray-900">
                {avgDuration > 0 ? formatDuration(Math.round(avgDuration)) : '0min'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Suivi Requis</p>
              <p className="text-2xl font-semibold text-gray-900">{followUpRequired}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une interaction..."
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

          <div className="flex space-x-2">
            {[
              { id: 'all', name: 'Tous' },
              { id: 'call', name: 'Appels' },
              { id: 'email', name: 'Emails' },
              { id: 'meeting', name: 'Réunions' },
              { id: 'visit', name: 'Visites' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === type.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Interactions List */}
      <div className="space-y-4">
        {filteredInteractions.map((interaction) => {
          const Icon = getTypeIcon(interaction.type);
          const contactName = getContactName(interaction.contactId);
          
          return (
            <Card key={interaction.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-lg ${getTypeColor(interaction.type)}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {interaction.subject}
                      </h3>
                      <Badge variant="info" size="sm">
                        {getTypeLabel(interaction.type)}
                      </Badge>
                      {interaction.followUpRequired && (
                        <Badge variant="warning" size="sm">
                          Suivi requis
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {interaction.description}
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDateTime(interaction.date)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{getEntityName(interaction.entityId)}</span>
                      </div>

                      {contactName && (
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{contactName}</span>
                        </div>
                      )}

                      {interaction.duration && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDuration(interaction.duration)}</span>
                        </div>
                      )}

                      {interaction.attachments.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4" />
                          <span>{interaction.attachments.length} pièce(s) jointe(s)</span>
                        </div>
                      )}
                    </div>

                    {interaction.outcome && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Résultat</h4>
                        <p className="text-sm text-gray-700">{interaction.outcome}</p>
                      </div>
                    )}

                    {interaction.followUpRequired && interaction.followUpDate && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                        <h4 className="text-sm font-medium text-yellow-800 mb-1">Suivi programmé</h4>
                        <p className="text-sm text-yellow-700">
                          {formatDateTime(interaction.followUpDate)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative group">
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>

                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-2">
                      <button 
                        onClick={() => setSelectedInteraction(interaction)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Voir les détails</span>
                      </button>
                      <button 
                        onClick={() => handleEditInteraction(interaction)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Modifier</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteInteraction(interaction.id)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}

        {filteredInteractions.length === 0 && (
          <Card className="p-12 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune interaction trouvée
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedType !== 'all'
                ? 'Aucune interaction ne correspond aux critères de recherche.'
                : 'Commencez par enregistrer votre première interaction.'}
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Interaction
            </Button>
          </Card>
        )}
      </div>

      {/* Create/Edit Interaction Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingInteraction(null);
        }}
        title={editingInteraction ? 'Modifier l\'Interaction' : 'Nouvelle Interaction'}
        size="lg"
      >
        <InteractionForm
          interaction={editingInteraction}
          onClose={() => {
            setIsModalOpen(false);
            setEditingInteraction(null);
          }}
          onSave={handleSaveInteraction}
        />
      </Modal>

      {/* Interaction Detail Modal */}
      {selectedInteraction && (
        <Modal
          isOpen={!!selectedInteraction}
          onClose={() => setSelectedInteraction(null)}
          title={selectedInteraction.subject}
          size="lg"
        >
          <div className="space-y-6">
            {/* Interaction Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Informations générales</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Type:</span>{' '}
                    <Badge variant="info" size="sm">
                      {getTypeLabel(selectedInteraction.type)}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Date:</span>{' '}
                    {formatDateTime(selectedInteraction.date)}
                  </div>
                  {selectedInteraction.duration && (
                    <div>
                      <span className="font-medium">Durée:</span>{' '}
                      {formatDuration(selectedInteraction.duration)}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Entreprise:</span>{' '}
                    {getEntityName(selectedInteraction.entityId)}
                  </div>
                  {selectedInteraction.contactId && (
                    <div>
                      <span className="font-medium">Contact:</span>{' '}
                      {getContactName(selectedInteraction.contactId)}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Suivi</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Suivi requis:</span>{' '}
                    {selectedInteraction.followUpRequired ? 'Oui' : 'Non'}
                  </div>
                  {selectedInteraction.followUpRequired && selectedInteraction.followUpDate && (
                    <div>
                      <span className="font-medium">Date de suivi:</span>{' '}
                      {formatDateTime(selectedInteraction.followUpDate)}
                    </div>
                  )}
                  {selectedInteraction.attachments.length > 0 && (
                    <div>
                      <span className="font-medium">Pièces jointes:</span>{' '}
                      {selectedInteraction.attachments.length}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600">{selectedInteraction.description}</p>
            </div>

            {/* Outcome */}
            {selectedInteraction.outcome && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Résultat</h4>
                <p className="text-gray-600">{selectedInteraction.outcome}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="secondary">
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              <Button 
                variant="danger"
                onClick={() => {
                  handleDeleteInteraction(selectedInteraction.id);
                  setSelectedInteraction(null);
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Interactions;