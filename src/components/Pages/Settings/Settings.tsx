import React, { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Archive,
  Save,
  Edit,
  Badge,
} from "lucide-react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  // Exemple de gestion d'état pour le formulaire de profil
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+33 1 23 45 67 89",
    position: "Directeur Commercial",
    department: "Commercial",
  });

  const tabs = [
    { id: "profile", name: "Profil", icon: User },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "security", name: "Sécurité", icon: Shield },
    { id: "integrations", name: "Intégrations", icon: Globe },
    { id: "data", name: "Données", icon: Database },
    { id: "appearance", name: "Apparence", icon: Palette },
    { id: "system", name: "Système", icon: Globe },
    { id: "backup", name: "Sauvegarde", icon: Archive },
  ];

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={profile.firstName}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nom
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={profile.lastName}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informations professionnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Poste
                  </label>
                  <input
                    id="position"
                    name="position"
                    type="text"
                    value={profile.position}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Département
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={profile.department}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Commercial</option>
                    <option>Marketing</option>
                    <option>Support</option>
                    <option>Administration</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Enregistrer</span>
              </Button>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Notifications par email
              </h3>
              <div className="space-y-4">
                {[
                  {
                    id: "new_lead",
                    label: "Nouveau prospect",
                    description:
                      "Recevoir une notification lors de l'arrivée d'un nouveau prospect",
                  },
                  {
                    id: "deal_update",
                    label: "Mise à jour des opportunités",
                    description:
                      "Être notifié des changements dans vos opportunités",
                  },
                  {
                    id: "meeting_reminder",
                    label: "Rappels de réunions",
                    description:
                      "Recevoir des rappels 15 minutes avant vos réunions",
                  },
                  {
                    id: "weekly_report",
                    label: "Rapport hebdomadaire",
                    description:
                      "Recevoir un résumé de votre activité chaque semaine",
                  },
                ].map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {notification.label}
                      </div>
                      <div className="text-sm text-gray-500">
                        {notification.description}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id={notification.id}
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Notifications push
              </h3>
              <div className="space-y-4">
                {[
                  {
                    id: "browser_notifications",
                    label: "Notifications navigateur",
                    description:
                      "Afficher les notifications dans votre navigateur",
                  },
                  {
                    id: "desktop_notifications",
                    label: "Notifications desktop",
                    description: "Afficher les notifications sur votre bureau",
                  },
                ].map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {notification.label}
                      </div>
                      <div className="text-sm text-gray-500">
                        {notification.description}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id={notification.id}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Changer le mot de passe
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mot de passe actuel
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nouveau mot de passe
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Authentification à deux facteurs
              </h3>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">
                      Authentification 2FA
                    </div>
                    <div className="text-sm text-gray-500">
                      Sécurisez votre compte avec la 2FA
                    </div>
                  </div>
                  <Button variant="secondary">
                    <Edit className="h-4 w-4 mr-2" />
                    Configurer
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sessions actives
              </h3>
              <div className="space-y-3">
                {[
                  {
                    device: "Chrome sur Windows",
                    location: "Paris, France",
                    lastActive: "Maintenant",
                    current: true,
                  },
                  {
                    device: "Safari sur iPhone",
                    location: "Paris, France",
                    lastActive: "Il y a 2 heures",
                    current: false,
                  },
                  {
                    device: "Firefox sur MacBook",
                    location: "Lyon, France",
                    lastActive: "Il y a 1 jour",
                    current: false,
                  },
                ].map((session, index) => (
                  <div
                    key={`session-${index}`}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {session.device}
                      </div>
                      <div className="text-sm text-gray-500">
                        {session.location} • {session.lastActive}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {session.current && (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Actuelle
                        </span>
                      )}
                      {!session.current && (
                        <Button variant="secondary" size="sm">
                          Déconnecter
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "data":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Import/Export de données
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="text-center">
                    <Database className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Importer des données
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Importez vos contacts et opportunités depuis un fichier
                      CSV
                    </p>
                    <Button>Choisir un fichier</Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="text-center">
                    <Database className="mx-auto h-12 w-12 text-green-600 mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Exporter des données
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Exportez toutes vos données au format CSV ou JSON
                    </p>
                    <Button>Télécharger</Button>
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sauvegarde automatique
              </h3>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      Sauvegarde quotidienne
                    </div>
                    <div className="text-sm text-gray-500">
                      Sauvegarde automatique de vos données chaque jour à 2h00
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="dailyBackup"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
                <div className="text-sm text-gray-500">
                  Dernière sauvegarde : Aujourd'hui à 02:00
                </div>
              </div>
            </div>
          </div>
        );

      case "integrations":
        return (
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Intégrations
            </h3>
            <div className="space-y-6">
              {[
                {
                  name: "Google Maps API",
                  description: "Géolocalisation des entreprises",
                  status: "connected",
                  icon: "🗺️",
                },
                {
                  name: "Twilio",
                  description: "Envoi de SMS et WhatsApp",
                  status: "connected",
                  icon: "📱",
                },
                {
                  name: "SendGrid",
                  description: "Envoi d'emails automatisés",
                  status: "disconnected",
                  icon: "📧",
                },
                {
                  name: "Sage",
                  description: "Synchronisation comptable",
                  status: "disconnected",
                  icon: "💼",
                },
              ].map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{integration.icon}</div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {integration.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={
                        integration.status === "connected"
                          ? "success"
                          : "default"
                      }
                    >
                      {integration.status === "connected"
                        ? "Connecté"
                        : "Déconnecté"}
                    </Badge>
                    <Button variant="secondary" size="sm">
                      {integration.status === "connected"
                        ? "Configurer"
                        : "Connecter"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );

      case "backup":
        return (
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              Sauvegarde et Restauration
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Sauvegarde automatique
                </h4>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Sauvegarde activée
                    </p>
                    <p className="text-sm text-green-600">
                      Dernière sauvegarde: Aujourd'hui à 02:00
                    </p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Configurer
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Sauvegarde manuelle
                </h4>
                <div className="flex items-center space-x-4">
                  <Button>Créer une sauvegarde</Button>
                  <Button variant="secondary">
                    Télécharger la dernière sauvegarde
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Historique des sauvegardes
                </h4>
                <div className="space-y-2">
                  {[
                    {
                      date: "2024-12-15 02:00",
                      size: "45.2 MB",
                      status: "success",
                    },
                    {
                      date: "2024-12-14 02:00",
                      size: "44.8 MB",
                      status: "success",
                    },
                    {
                      date: "2024-12-13 02:00",
                      size: "44.1 MB",
                      status: "success",
                    },
                  ].map((backup, index) => (
                    <div
                      key={`backup-${index}`}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {backup.date}
                        </p>
                        <p className="text-sm text-gray-600">{backup.size}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="success">Réussie</Badge>
                        <Button variant="secondary" size="sm">
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thème
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    id: "light",
                    name: "Clair",
                    description: "Interface claire et lumineuse",
                  },
                  {
                    id: "dark",
                    name: "Sombre",
                    description: "Interface sombre pour les yeux",
                  },
                  {
                    id: "auto",
                    name: "Automatique",
                    description: "S'adapte aux préférences système",
                  },
                ].map((theme) => (
                  <div key={theme.id} className="relative">
                    <input
                      type="radio"
                      name="theme"
                      id={theme.id}
                      className="sr-only peer"
                      defaultChecked={theme.id === "light"}
                    />
                    <label
                      htmlFor={theme.id}
                      className="block p-6 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50"
                    >
                      <div className="font-medium text-gray-900 mb-1">
                        {theme.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {theme.description}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Couleur d'accent
              </h3>
              <div className="flex space-x-4">
                {[
                  { color: "bg-blue-500", name: "Bleu" },
                  { color: "bg-green-500", name: "Vert" },
                  { color: "bg-purple-500", name: "Violet" },
                  { color: "bg-red-500", name: "Rouge" },
                  { color: "bg-orange-500", name: "Orange" },
                ].map((color) => (
                  <button
                    key={color.name}
                    className={`w-12 h-12 rounded-full ${color.color} ring-2 ring-offset-2 ring-transparent hover:ring-gray-300 focus:ring-gray-300`}
                    title={color.name}
                    aria-label={`Sélectionner la couleur ${color.name}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Langue
              </h3>
              <select
                id="language"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        );

      case "system":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informations système
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Version</div>
                  <div className="font-medium text-gray-900">
                    FIDALLIZE v2.1.0
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">
                    Dernière mise à jour
                  </div>
                  <div className="font-medium text-gray-900">
                    15 janvier 2024
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Licence</div>
                  <div className="font-medium text-gray-900">
                    Professionnelle
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Support</div>
                  <div className="font-medium text-gray-900">Premium 24/7</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Intégrations
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Gmail", status: "Connecté", color: "green" },
                  { name: "Outlook", status: "Non connecté", color: "gray" },
                  { name: "Slack", status: "Connecté", color: "green" },
                  { name: "Zapier", status: "Non connecté", color: "gray" },
                ].map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full bg-${integration.color}-500`}
                      ></div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {integration.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {integration.status}
                        </div>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      {integration.status === "Connecté"
                        ? "Déconnecter"
                        : "Connecter"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-600">
            Sélectionnez une section dans la barre latérale pour afficher les
            paramètres.
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600">
          Configurez votre compte et vos préférences
        </p>
      </div>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="p-6 lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Content */}
        <Card className="p-6 lg:col-span-3">{renderTabContent()}</Card>
      </div>
    </div>
  );
};

export default Settings;
