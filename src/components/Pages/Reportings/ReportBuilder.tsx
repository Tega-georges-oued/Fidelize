import React, { useState } from 'react';
import { 
  Plus, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Calendar,
  Download,
  Save,
  Eye,
  Settings,
  Filter
} from 'lucide-react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

interface ReportBuilderProps {
  onClose: () => void;
  onSave: (report: any) => void;
}

const ReportBuilder: React.FC<ReportBuilderProps> = ({ onClose, onSave }) => {
  const [reportConfig, setReportConfig] = useState({
    name: '',
    description: '',
    type: 'dashboard',
    period: 'month',
    widgets: [] as any[],
    filters: {} as any,
    schedule: {
      enabled: false,
      frequency: 'weekly',
      recipients: [] as string[]
    }
  });

  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

  const availableWidgets = [
    {
      id: 'revenue_chart',
      name: 'Évolution du CA',
      type: 'line_chart',
      icon: TrendingUp,
      description: 'Graphique d\'évolution du chiffre d\'affaires'
    },
    {
      id: 'opportunities_funnel',
      name: 'Entonnoir des Opportunités',
      type: 'funnel',
      icon: BarChart3,
      description: 'Visualisation du pipeline commercial'
    },
    {
      id: 'clients_by_sector',
      name: 'Clients par Secteur',
      type: 'pie_chart',
      icon: PieChart,
      description: 'Répartition des clients par secteur d\'activité'
    },
    {
      id: 'monthly_activities',
      name: 'Activités Mensuelles',
      type: 'bar_chart',
      icon: BarChart3,
      description: 'Nombre d\'activités par mois'
    },
    {
      id: 'conversion_rates',
      name: 'Taux de Conversion',
      type: 'gauge',
      icon: TrendingUp,
      description: 'Taux de conversion des opportunités'
    }
  ];

  const addWidget = (widget: any) => {
    const newWidget = {
      ...widget,
      id: Date.now().toString(),
      position: { x: 0, y: reportConfig.widgets.length },
      size: 'medium',
      config: {}
    };
    setReportConfig(prev => ({
      ...prev,
      widgets: [...prev.widgets, newWidget]
    }));
  };

  const removeWidget = (widgetId: string) => {
    setReportConfig(prev => ({
      ...prev,
      widgets: prev.widgets.filter(w => w.id !== widgetId)
    }));
  };

  const handleSave = () => {
    if (!reportConfig.name.trim()) {
      alert('Le nom du rapport est requis');
      return;
    }
    onSave(reportConfig);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Créateur de Rapport" size="xl">
      <div className="space-y-6">
        {/* Report Configuration */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration du Rapport</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom du rapport
              </label>
              <input
                type="text"
                value={reportConfig.name}
                onChange={(e) => setReportConfig(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Rapport Commercial Mensuel"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Période
              </label>
              <select
                value={reportConfig.period}
                onChange={(e) => setReportConfig(prev => ({ ...prev, period: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">Semaine</option>
                <option value="month">Mois</option>
                <option value="quarter">Trimestre</option>
                <option value="year">Année</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={reportConfig.description}
              onChange={(e) => setReportConfig(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Description du rapport..."
            />
          </div>
        </Card>

        {/* Widget Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Widgets Disponibles</h3>
            <div className="space-y-3">
              {availableWidgets.map((widget) => {
                const Icon = widget.icon;
                return (
                  <div
                    key={widget.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{widget.name}</h4>
                        <p className="text-xs text-gray-500">{widget.description}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => addWidget(widget)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Widgets Sélectionnés ({reportConfig.widgets.length})
            </h3>
            {reportConfig.widgets.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="mx-auto w-12 h-12 text-gray-300 mb-2" />
                <p>Aucun widget sélectionné</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reportConfig.widgets.map((widget) => {
                  const Icon = widget.icon;
                  return (
                    <div
                      key={widget.id}
                      className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{widget.name}</h4>
                          <p className="text-xs text-gray-500">{widget.type}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedWidget(widget.id)}
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeWidget(widget.id)}
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtres</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secteur
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Tous les secteurs</option>
                <option value="industrie">Industrie</option>
                <option value="telecoms">Télécommunications</option>
                <option value="banque">Banque</option>
                <option value="ong">ONG</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Région
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Toutes les régions</option>
                <option value="dakar">Dakar</option>
                <option value="thies">Thiès</option>
                <option value="saint-louis">Saint-Louis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut Client
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Tous les statuts</option>
                <option value="client">Clients</option>
                <option value="prospect">Prospects</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Créer le Rapport
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReportBuilder;