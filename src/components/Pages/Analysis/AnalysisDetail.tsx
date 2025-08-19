import React, { useState } from 'react';
import { 
  Brain, 
  FileText, 
  Target, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Download,
  Edit,
  Share,
  Eye,
  Calendar,
  User
} from 'lucide-react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Badge from '../../UI/Badge';
import Modal from '../../UI/Modal';

interface AnalysisDetailProps {
  analysis: any;
  onClose: () => void;
  onEdit: () => void;
}

const AnalysisDetail: React.FC<AnalysisDetailProps> = ({ analysis, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute': return 'text-red-600 bg-red-100';
      case 'Moyenne': return 'text-yellow-600 bg-yellow-100';
      case 'Basse': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: Brain },
    { id: 'needs', name: 'Besoins Identifiés', icon: Target },
    { id: 'opportunities', name: 'Opportunités', icon: TrendingUp },
    { id: 'documents', name: 'Documents Source', icon: FileText },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Analysis Summary */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé de l'Analyse</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{analysis.confidence}%</div>
                  <div className="text-sm text-gray-600">Niveau de Confiance</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{analysis.needsIdentified.length}</div>
                  <div className="text-sm text-gray-600">Besoins Identifiés</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    €{analysis.opportunities.reduce((sum: number, opp: any) => sum + opp.value, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Valeur Potentielle</div>
                </div>
              </div>
            </Card>

            {/* Key Insights */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights Clés</h3>
              <div className="space-y-3">
                {analysis.keyInsights.map((insight: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{insight}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Priority Needs */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Besoins Prioritaires</h3>
              <div className="space-y-3">
                {analysis.needsIdentified
                  .filter((need: any) => need.priority === 'Haute')
                  .map((need: any, index: number) => (
                    <div key={index} className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{need.service}</h4>
                        <Badge variant="danger" size="sm">{need.priority}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{need.reason}</p>
                      {need.estimatedValue && (
                        <p className="text-sm font-medium text-green-600 mt-2">
                          Valeur estimée: €{need.estimatedValue.toLocaleString()}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommandations</h3>
              <div className="space-y-3">
                {[
                  {
                    title: "Prioriser l'audit légal",
                    description: "Le client présente tous les critères pour une obligation légale d'audit",
                    action: "Proposer immédiatement"
                  },
                  {
                    title: "Évaluer les besoins en formation",
                    description: "L'équipe comptable semble avoir besoin de mise à niveau",
                    action: "Planifier un diagnostic"
                  },
                  {
                    title: "Suivre l'évolution du CA",
                    description: "La croissance prévue pourrait générer de nouveaux besoins",
                    action: "Programmer un suivi trimestriel"
                  }
                ].map((rec, index) => (
                  <div key={index} className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                        <Badge variant="info" size="sm">{rec.action}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case 'needs':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Besoins Identifiés ({analysis.needsIdentified.length})
              </h3>
              <Button size="sm">
                <Target className="h-4 w-4 mr-2" />
                Créer Opportunités
              </Button>
            </div>
            
            <div className="space-y-3">
              {analysis.needsIdentified.map((need: any, index: number) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900">{need.service}</h4>
                        <Badge 
                          variant={
                            need.priority === 'Haute' ? 'danger' :
                            need.priority === 'Moyenne' ? 'warning' : 'success'
                          }
                          size="sm"
                        >
                          {need.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{need.reason}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {need.estimatedValue && (
                          <span className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            €{need.estimatedValue.toLocaleString()}
                          </span>
                        )}
                        {need.timeline && (
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {need.timeline}
                          </span>
                        )}
                        <span className="flex items-center">
                          <Brain className="h-4 w-4 mr-1" />
                          {need.confidence}% confiance
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="secondary" size="sm">
                        <Target className="h-4 w-4" />
                      </Button>
                      <Button variant="secondary" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'opportunities':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Opportunités Commerciales ({analysis.opportunities.length})
              </h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Opportunité
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.opportunities.map((opp: any, index: number) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{opp.title}</h4>
                    <Badge variant="success" size="sm">{opp.probability}%</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Valeur estimée</span>
                      <span className="font-medium text-green-600">
                        €{opp.value.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Probabilité</span>
                      <span className={`font-medium ${getConfidenceColor(opp.probability)}`}>
                        {opp.probability}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Valeur pondérée</span>
                      <span className="font-medium text-blue-600">
                        €{((opp.value * opp.probability) / 100).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="secondary" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm">
                      Créer Opportunité
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Documents Source</h3>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Télécharger Tout
              </Button>
            </div>
            
            <div className="space-y-3">
              {[analysis.document].map((doc, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{doc}</h4>
                        <p className="text-sm text-gray-600">
                          Analysé le {analysis.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="secondary" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="secondary" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
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
    <Modal isOpen={true} onClose={onClose} title={`Analyse - ${analysis.client}`} size="xl">
      <div className="space-y-6">
        {/* Analysis Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{analysis.client}</h1>
              <p className="text-gray-600 mt-1">{analysis.document}</p>
              <div className="flex items-center space-x-3 mt-2">
                <Badge variant="success" size="sm">
                  Analysé
                </Badge>
                <div className="flex items-center space-x-1">
                  <Brain className={`w-4 h-4 ${getConfidenceColor(analysis.confidence)}`} />
                  <span className={`text-sm font-medium ${getConfidenceColor(analysis.confidence)}`}>
                    {analysis.confidence}% confiance
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Analysé le {analysis.uploadDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>{analysis.needsIdentified.length} besoins identifiés</span>
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
              <Share className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Rapport
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

export default AnalysisDetail;