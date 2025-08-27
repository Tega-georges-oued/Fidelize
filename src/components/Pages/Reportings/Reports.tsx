import React, { useState } from "react";
import {
  Download,
  Calendar,
  TrendingUp,
  Target,
  Users,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Plus,
  Settings,
  Eye,
} from "lucide-react";
import Card from "../../UI/Card";
import Chart from "../../UI/Chart";
import Button from "../../UI/Button";
import ReportBuilder from "./ReportBuilder";

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("overview");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [customReports, setCustomReports] = useState<any[]>([]);

  const reportTypes = [
    { id: "overview", name: "Vue d'ensemble", icon: BarChart3 },
    { id: "sales", name: "Ventes", icon: TrendingUp },
    { id: "customers", name: "Clients", icon: Users },
    { id: "activities", name: "Activités", icon: Activity },
  ];

  const kpis = [
    {
      name: "Revenus Générés",
      value: "€347,500",
      change: "+15.3%",
      changeType: "increase",
      icon: DollarSign,
      color: "green",
    },
    {
      name: "Nouveaux Clients",
      value: "127",
      change: "+8.2%",
      changeType: "increase",
      icon: Users,
      color: "blue",
    },
    {
      name: "Opportunités Converties",
      value: "89",
      change: "+12.5%",
      changeType: "increase",
      icon: Target,
      color: "purple",
    },
    {
      name: "Taux de Conversion",
      value: "64.2%",
      change: "-2.1%",
      changeType: "decrease",
      icon: TrendingUp,
      color: "orange",
    },
  ];

  const topPerformers = [
    { name: "Marie Dubois", sales: "€98,500", deals: 23, conversion: "78%" },
    { name: "Jean Martin", sales: "€87,200", deals: 19, conversion: "71%" },
    { name: "Sophie Laurent", sales: "€79,300", deals: 17, conversion: "65%" },
    { name: "Pierre Durand", sales: "€72,100", deals: 16, conversion: "62%" },
  ];

  const salesBySource = [
    { source: "Site Web", value: 45, amount: "€156,750" },
    { source: "Références", value: 28, amount: "€97,300" },
    { source: "Réseaux Sociaux", value: 15, amount: "€52,125" },
    { source: "Email Marketing", value: 8, amount: "€27,800" },
    { source: "Autres", value: 4, amount: "€13,900" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rapports</h1>
          <p className="text-gray-600">
            Analysez vos performances commerciales
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <Button className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exporter</span>
          </Button>
          <Button 
            onClick={() => setIsBuilderOpen(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Créer Rapport</span>
          </Button>
        </div>
      </div>

      {/* Report Navigation */}
      <Card className="p-6">
        <div className="flex space-x-1">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedReport(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedReport === type.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{type.name}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.name} className="p-6">
              <div className="flex items-center">
                <div
                  className={`flex-shrink-0 p-3 rounded-lg bg-${kpi.color}-100`}
                >
                  <Icon className={`h-6 w-6 text-${kpi.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {kpi.name}
                  </p>
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold text-gray-900">
                      {kpi.value}
                    </p>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        kpi.changeType === "increase"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {kpi.change}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Évolution des Ventes
            </h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <Chart type="line" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Répartition par Source
            </h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {salesBySource.map((item, index) => (
              <div
                key={item.source}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">
                    {item.source}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {item.value}%
                  </div>
                  <div className="text-xs text-gray-500">{item.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Meilleurs Commerciaux
          </h3>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div
                key={performer.name}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {performer.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {performer.deals} opportunités
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {performer.sales}
                  </div>
                  <div className="text-sm text-green-600">
                    {performer.conversion}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Conversions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Conversions Récentes
          </h3>
          <div className="space-y-4">
            {[
              {
                company: "Tech Solutions",
                value: "€45,000",
                date: "Hier",
                type: "Nouveau client",
              },
              {
                company: "Innovation Corp",
                value: "€32,500",
                date: "Il y a 2 jours",
                type: "Renouvellement",
              },
              {
                company: "Global Industries",
                value: "€67,800",
                date: "Il y a 3 jours",
                type: "Extension",
              },
              {
                company: "Modern Systems",
                value: "€28,900",
                date: "Il y a 4 jours",
                type: "Nouveau client",
              },
            ].map((conversion, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div>
                  <div className="font-medium text-gray-900">
                    {conversion.company}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{conversion.date}</span>
                    <span>•</span>
                    <span className="text-blue-600">{conversion.type}</span>
                  </div>
                </div>
                <div className="text-lg font-semibold text-green-600">
                  {conversion.value}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Additional Metrics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Métriques Avancées
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">23.5j</div>
            <div className="text-sm text-gray-600">Cycle de vente moyen</div>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">
              €12,450
            </div>
            <div className="text-sm text-gray-600">Valeur moyenne par deal</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.2</div>
            <div className="text-sm text-gray-600">Touches moyennes</div>
          </div>
        </div>
      </Card>

      {/* Custom Reports Section */}
      {customReports.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Rapports Personnalisés</h3>
            <Button variant="secondary" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Gérer
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {customReports.map((report) => (
              <div key={report.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-2">{report.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {report.widgets.length} widgets
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="secondary" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Report Builder Modal */}
      {isBuilderOpen && (
        <ReportBuilder
          onClose={() => setIsBuilderOpen(false)}
          onSave={(report) => {
            setCustomReports(prev => [...prev, { ...report, id: Date.now().toString() }]);
            setIsBuilderOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Reports;