import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  FileText,
  Edit,
  Copy,
  Download,
  Eye,
  // Trash2,
  Tag,
  Calendar,
} from "lucide-react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

const Templates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const templates = [
    {
      id: 1,
      name: "Proposition Audit Légal",
      category: "Offres",
      type: "Audit",
      description: "Template standard pour les propositions d'audit légal",
      lastModified: "2024-01-15",
      author: "Marie Dubois",
      usage: 12,
      tags: ["audit", "légal", "proposition"],
      fields: ["client_name", "ca_amount", "audit_scope", "timeline", "price"],
      status: "Actif",
    },
    {
      id: 2,
      name: "Contrat PCA Standard",
      category: "Contrats",
      type: "PCA",
      description:
        "Modèle de contrat pour les missions de Plan de Continuité d'Activité",
      lastModified: "2024-01-12",
      author: "Pierre Durand",
      usage: 8,
      tags: ["pca", "contrat", "continuité"],
      fields: ["client_name", "scope", "duration", "deliverables", "price"],
      status: "Actif",
    },
    {
      id: 3,
      name: "Rapport Formation",
      category: "Rapports",
      type: "Formation",
      description: "Template pour les rapports de fin de formation",
      lastModified: "2024-01-10",
      author: "Sophie Laurent",
      usage: 15,
      tags: ["formation", "rapport", "évaluation"],
      fields: [
        "training_title",
        "participants",
        "duration",
        "objectives",
        "results",
      ],
      status: "Actif",
    },
    {
      id: 4,
      name: "Attestation Service Fait",
      category: "Attestations",
      type: "Certification",
      description: "Modèle d'attestation de service fait pour les missions",
      lastModified: "2024-01-08",
      author: "Jean Martin",
      usage: 25,
      tags: ["attestation", "service", "certification"],
      fields: [
        "mission_title",
        "client_name",
        "completion_date",
        "deliverables",
      ],
      status: "Actif",
    },
    {
      id: 5,
      name: "Proposition CAC",
      category: "Offres",
      type: "CAC",
      description: "Template pour les propositions de Commissariat aux Comptes",
      lastModified: "2024-01-05",
      author: "Marie Dubois",
      usage: 6,
      tags: ["cac", "commissariat", "proposition"],
      fields: [
        "company_name",
        "legal_form",
        "ca_amount",
        "complexity",
        "price",
      ],
      status: "Brouillon",
    },
  ];

  const categories = [
    { id: "all", name: "Tous", count: templates.length },
    {
      id: "Offres",
      name: "Offres",
      count: templates.filter((t) => t.category === "Offres").length,
    },
    {
      id: "Contrats",
      name: "Contrats",
      count: templates.filter((t) => t.category === "Contrats").length,
    },
    {
      id: "Rapports",
      name: "Rapports",
      count: templates.filter((t) => t.category === "Rapports").length,
    },
    {
      id: "Attestations",
      name: "Attestations",
      count: templates.filter((t) => t.category === "Attestations").length,
    },
  ];

  const templateTypes = [
    { name: "Audit", color: "bg-blue-100 text-blue-800" },
    { name: "PCA", color: "bg-green-100 text-green-800" },
    { name: "Formation", color: "bg-purple-100 text-purple-800" },
    { name: "CAC", color: "bg-orange-100 text-orange-800" },
    { name: "Certification", color: "bg-gray-100 text-gray-800" },
  ];

  const getTypeColor = (type: string) => {
    const typeObj = templateTypes.find((t) => t.name === type);
    return typeObj?.color || "bg-gray-100 text-gray-800";
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Templates de Documents
          </h1>
          <p className="text-gray-600">
            Gérez vos modèles d'offres, contrats, rapports et attestations
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nouveau Template</span>
        </Button>
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
                Total Templates
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {templates.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Copy className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Utilisations ce mois
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {templates.reduce((acc, t) => acc + t.usage, 0)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Tag className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Catégories</p>
              <p className="text-2xl font-semibold text-gray-900">
                {categories.filter((c) => c.id !== "all").length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Edit className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Modifiés récemment
              </p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
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
                placeholder="Rechercher un template..."
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
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {template.name}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(
                      template.type
                    )}`}
                  >
                    {template.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {template.description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Copy className="h-4 w-4 mr-1" />
                    {template.usage} utilisations
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {template.lastModified}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    template.status === "Actif"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {template.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-sm text-gray-500">
                  Par {template.author}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedTemplate(template)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Eye className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Copy className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Download className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <Modal
          isOpen={!!selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          title={selectedTemplate.name}
          size="lg"
        >
          <div className="space-y-6">
            {/* Template Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Informations</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Catégorie:</span>{" "}
                    {selectedTemplate.category}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span>{" "}
                    {selectedTemplate.type}
                  </div>
                  <div>
                    <span className="font-medium">Auteur:</span>{" "}
                    {selectedTemplate.author}
                  </div>
                  <div>
                    <span className="font-medium">Dernière modification:</span>{" "}
                    {selectedTemplate.lastModified}
                  </div>
                  <div>
                    <span className="font-medium">Utilisations:</span>{" "}
                    {selectedTemplate.usage}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Champs Variables
                </h4>
                <div className="space-y-1">
                  {selectedTemplate.fields.map((field: string) => (
                    <div
                      key={field}
                      className="text-sm bg-gray-100 px-2 py-1 rounded"
                    >
                      {field.replace("_", " ").toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600">{selectedTemplate.description}</p>
            </div>

            {/* Tags */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="secondary">
                <Copy className="h-4 w-4 mr-2" />
                Dupliquer
              </Button>
              <Button variant="secondary">
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Template Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouveau Template"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom du template
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Proposition Audit Légal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Sélectionner une catégorie</option>
                <option value="Offres">Offres</option>
                <option value="Contrats">Contrats</option>
                <option value="Rapports">Rapports</option>
                <option value="Attestations">Attestations</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Sélectionner un type</option>
                {templateTypes.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags (séparés par des virgules)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="audit, légal, proposition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Description du template..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fichier template
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                Glissez-déposez votre fichier ou cliquez pour sélectionner
              </p>
              <p className="text-xs text-gray-500 mt-1">DOCX, PDF (max 5MB)</p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit">Créer le Template</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Templates;
