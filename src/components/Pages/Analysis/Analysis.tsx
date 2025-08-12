import React, { useState } from "react";
import {
  Upload,
  FileText,
  Search,
  Brain,
  CheckCircle,
  // AlertTriangle,
  TrendingUp,
  Download,
  Eye,
  Lightbulb,
  Target,
} from "lucide-react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";

const Analysis: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<any>(null);

  const analyses = [
    {
      id: 1,
      client: "Société ABC",
      document: "Plan Pluriannuel de Maintenance 2024-2026",
      uploadDate: "2024-01-15",
      status: "Analysé",
      confidence: 92,
      needsIdentified: [
        {
          service: "Commissariat aux Comptes",
          priority: "Haute",
          reason: "Obligation légale détectée pour SA > 2M€ CA",
        },
        {
          service: "Audit Interne",
          priority: "Moyenne",
          reason: "Processus de contrôle interne à renforcer",
        },
        {
          service: "Formation Comptabilité",
          priority: "Basse",
          reason: "Équipe comptable à former sur nouvelles normes",
        },
      ],
      opportunities: [
        { title: "Mission CAC", value: 25000, probability: 85 },
        { title: "Audit Interne", value: 15000, probability: 60 },
        { title: "Formation", value: 8000, probability: 40 },
      ],
      keyInsights: [
        "Croissance CA de 35% prévue sur 3 ans",
        "Investissements IT importants planifiés",
        "Besoin de renforcement des contrôles",
      ],
    },
    {
      id: 2,
      client: "Innovation Corp",
      document: "Rapport Annuel 2023",
      uploadDate: "2024-01-12",
      status: "En cours",
      confidence: 78,
      needsIdentified: [
        {
          service: "Plan de Continuité d'Activité",
          priority: "Haute",
          reason: "Risques opérationnels identifiés",
        },
        {
          service: "Audit Énergétique",
          priority: "Moyenne",
          reason: "Objectifs RSE ambitieux",
        },
      ],
      opportunities: [
        { title: "Mission PCA", value: 32000, probability: 70 },
        { title: "Audit RSE", value: 18000, probability: 50 },
      ],
      keyInsights: [
        "Transformation digitale en cours",
        "Focus sur la durabilité",
        "Expansion internationale prévue",
      ],
    },
  ];

  const serviceTemplates = [
    {
      name: "Commissariat aux Comptes",
      category: "Légal",
      color: "bg-red-100 text-red-800",
    },
    {
      name: "Audit Interne",
      category: "Contrôle",
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Plan de Continuité",
      category: "Risque",
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Formation",
      category: "Développement",
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "Conseil Fiscal",
      category: "Fiscal",
      color: "bg-orange-100 text-orange-800",
    },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Haute":
        return "text-red-600 bg-red-100";
      case "Moyenne":
        return "text-yellow-600 bg-yellow-100";
      case "Basse":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Analyse de Documents
        </h1>
        <p className="text-gray-600">
          Identifiez automatiquement les besoins clients à partir de leurs
          documents
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Documents Analysés
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {analyses.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Besoins Identifiés
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {analyses.reduce((acc, a) => acc + a.needsIdentified.length, 0)}
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
              <p className="text-sm font-medium text-gray-600">CA Potentiel</p>
              <p className="text-2xl font-semibold text-gray-900">
                €
                {analyses
                  .reduce(
                    (acc, a) =>
                      acc +
                      a.opportunities.reduce((sum, o) => sum + o.value, 0),
                    0
                  )
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Brain className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Confiance Moyenne
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(
                  analyses.reduce((acc, a) => acc + a.confidence, 0) /
                    analyses.length
                )}
                %
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Upload Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Analyser un nouveau document
        </h3>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-900">
              Glissez-déposez vos documents ici
            </p>
            <p className="text-gray-600">
              Formats supportés: PDF, DOCX, XLSX (max 10MB)
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Choisir des fichiers
              </Button>
              <Button variant="secondary">
                <Search className="h-4 w-4 mr-2" />
                Analyser URL
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Service Templates */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Services Détectables
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {serviceTemplates.map((service, index) => (
            <div
              key={index}
              className={`px-3 py-2 rounded-lg text-center ${service.color}`}
            >
              <div className="font-medium text-sm">{service.name}</div>
              <div className="text-xs opacity-75">{service.category}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Analysis Results */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Analyses Récentes
        </h3>

        {analyses.map((analysis) => (
          <Card key={analysis.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  {analysis.client}
                </h4>
                <p className="text-gray-600">{analysis.document}</p>
                <p className="text-sm text-gray-500">
                  Analysé le {analysis.uploadDate}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-600">Confiance</div>
                  <div className="text-lg font-semibold text-green-600">
                    {analysis.confidence}%
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedAnalysis(analysis)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Détails
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Rapport
                  </Button>
                </div>
              </div>
            </div>

            {/* Needs Identified */}
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                Besoins Identifiés ({analysis.needsIdentified.length})
              </h5>
              <div className="space-y-2">
                {analysis.needsIdentified.slice(0, 2).map((need, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {need.service}
                      </div>
                      <div className="text-sm text-gray-600">{need.reason}</div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                        need.priority
                      )}`}
                    >
                      {need.priority}
                    </span>
                  </div>
                ))}
                {analysis.needsIdentified.length > 2 && (
                  <div className="text-sm text-gray-500 text-center py-2">
                    +{analysis.needsIdentified.length - 2} autres besoins
                    identifiés
                  </div>
                )}
              </div>
            </div>

            {/* Opportunities */}
            <div>
              <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                Opportunités Commerciales
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analysis.opportunities.map((opp, index) => (
                  <div
                    key={index}
                    className="p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="font-medium text-gray-900">{opp.title}</div>
                    <div className="text-lg font-semibold text-green-600">
                      €{opp.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {opp.probability}% de probabilité
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Analysis Detail Modal */}
      {selectedAnalysis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Analyse Détaillée - {selectedAnalysis.client}
              </h2>
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Key Insights */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Insights Clés
                </h3>
                <div className="space-y-2">
                  {selectedAnalysis.keyInsights.map(
                    (insight: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{insight}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* All Needs */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Tous les Besoins Identifiés
                </h3>
                <div className="space-y-3">
                  {selectedAnalysis.needsIdentified.map(
                    (need: any, index: number) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">
                            {need.service}
                          </h4>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                              need.priority
                            )}`}
                          >
                            {need.priority}
                          </span>
                        </div>
                        <p className="text-gray-600">{need.reason}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="secondary">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter Rapport
                </Button>
                <Button>
                  <Target className="h-4 w-4 mr-2" />
                  Créer Opportunités
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
