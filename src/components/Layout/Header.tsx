import React from 'react';
import { Search, User, Settings, LogOut, Menu } from 'lucide-react';
import NotificationCenter from '../UI/NotificationCenter';

interface HeaderProps {
  user?: {
    firstName: string;
    lastName: string;
    role: string;
  };
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user = { firstName: 'Admin', lastName: 'Fidalli', role: 'Directeur' }, 
  onMenuToggle,
}) => {
  // Mock notifications data
  const notifications = [
    {
      id: '1',
      type: 'info' as const,
      title: 'Nouvelle opportunité',
      message: 'Une nouvelle opportunité a été créée pour ALPHA Industries',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false,
    },
    {
      id: '2',
      type: 'warning' as const,
      title: 'Mission en retard',
      message: 'La mission "Audit BETA Télécoms" dépasse la date prévue',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
    },
    {
      id: '3',
      type: 'success' as const,
      title: 'Opportunité gagnée',
      message: 'L\'opportunité GAMMA ONG a été marquée comme gagnée',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
    },
  ];

  const handleMarkAsRead = (id: string) => {
    console.log('Mark as read:', id);
  };

  const handleMarkAllAsRead = () => {
    console.log('Mark all as read');
  };

  const handleDeleteNotification = (id: string) => {
    console.log('Delete notification:', id);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher entreprises, contacts, missions..."
              className="pl-10 pr-4 py-2 w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onDelete={handleDeleteNotification}
          />

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                    <User className="w-4 h-4" />
                    <span>Mon profil</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                    <Settings className="w-4 h-4" />
                    <span>Paramètres</span>
                  </button>
                  <hr className="my-2" />
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                    <LogOut className="w-4 h-4" />
                    <span>Se déconnecter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};