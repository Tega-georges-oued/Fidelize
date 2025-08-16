import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  MapPin,
  Users,
  Phone,
  Video
} from 'lucide-react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Badge from '../../UI/Badge';
import Modal from '../../UI/Modal';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  type: 'meeting' | 'call' | 'visit' | 'deadline' | 'reminder';
  attendees?: string[];
  location?: string;
  entityId?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Réunion ALPHA Industries',
      description: 'Présentation de l\'offre d\'audit annuel',
      startTime: new Date(2024, 0, 20, 14, 0),
      endTime: new Date(2024, 0, 20, 15, 30),
      type: 'meeting',
      attendees: ['Jean Martin', 'Marie Dubois'],
      location: 'Salle de conférence A',
      entityId: '1',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Appel BETA Télécoms',
      description: 'Suivi de la proposition commerciale',
      startTime: new Date(2024, 0, 21, 10, 30),
      endTime: new Date(2024, 0, 21, 11, 0),
      type: 'call',
      attendees: ['Pierre Durand'],
      entityId: '2',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Visite GAMMA ONG',
      description: 'Audit sur site - Phase 1',
      startTime: new Date(2024, 0, 22, 9, 0),
      endTime: new Date(2024, 0, 22, 17, 0),
      type: 'visit',
      attendees: ['Sophie Laurent', 'Jean Martin'],
      location: 'Bureaux GAMMA ONG, Saint-Louis',
      entityId: '3',
      status: 'scheduled'
    },
    {
      id: '4',
      title: 'Échéance proposition',
      description: 'Date limite pour soumettre l\'offre technique',
      startTime: new Date(2024, 0, 25, 17, 0),
      endTime: new Date(2024, 0, 25, 17, 0),
      type: 'deadline',
      status: 'scheduled'
    }
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Users className="w-4 h-4" />;
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'visit':
        return <MapPin className="w-4 h-4" />;
      case 'deadline':
        return <Clock className="w-4 h-4" />;
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'call':
        return 'bg-green-100 text-green-800';
      case 'visit':
        return 'bg-purple-100 text-purple-800';
      case 'deadline':
        return 'bg-red-100 text-red-800';
      case 'reminder':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Jours du mois précédent
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    
    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ date: new Date(year, month + 1, day), isCurrentMonth: false });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const todayEvents = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.startTime);
    return eventDate.toDateString() === today.toDateString();
  });

  const upcomingEvents = events
    .filter(event => {
      const today = new Date();
      const eventDate = new Date(event.startTime);
      return eventDate > today;
    })
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendrier</h1>
          <p className="text-gray-600">
            Planifiez et suivez vos rendez-vous et échéances
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['month', 'week', 'day'] as const).map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === viewType
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {viewType === 'month' ? 'Mois' : viewType === 'week' ? 'Semaine' : 'Jour'}
              </button>
            ))}
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau RDV
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {currentDate.toLocaleDateString('fr-FR', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </h2>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <Button
            variant="secondary"
            onClick={() => setCurrentDate(new Date())}
          >
            Aujourd'hui
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Days of week header */}
          {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {getDaysInMonth(currentDate).map((day, index) => {
            const dayEvents = getEventsForDate(day.date);
            const isToday = day.date.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`min-h-[100px] p-2 border border-gray-100 ${
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                } ${isToday ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                } ${isToday ? 'text-blue-600' : ''}`}>
                  {day.date.getDate()}
                </div>
                
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 ${getEventTypeColor(event.type)}`}
                    >
                      <div className="flex items-center space-x-1">
                        {getEventTypeIcon(event.type)}
                        <span className="truncate">{event.title}</span>
                      </div>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayEvents.length - 2} autres
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Today's Events & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Events */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Aujourd'hui ({todayEvents.length})
          </h3>
          {todayEvents.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Aucun événement prévu aujourd'hui
            </p>
          ) : (
            <div className="space-y-3">
              {todayEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {getEventTypeIcon(event.type)}
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <Badge variant="info" size="sm">
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      {event.location && (
                        <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Upcoming Events */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            À venir
          </h3>
          {upcomingEvents.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Aucun événement à venir
            </p>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {getEventTypeIcon(event.type)}
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="text-xs text-gray-500">
                        {formatDate(event.startTime)} à {formatTime(event.startTime)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent.title}
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {getEventTypeIcon(selectedEvent.type)}
              <Badge variant="info">
                {selectedEvent.type === 'meeting' ? 'Réunion' :
                 selectedEvent.type === 'call' ? 'Appel' :
                 selectedEvent.type === 'visit' ? 'Visite' :
                 selectedEvent.type === 'deadline' ? 'Échéance' : 'Rappel'}
              </Badge>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600">{selectedEvent.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Date et heure</h4>
                <div className="text-sm text-gray-600">
                  <div>{formatDate(selectedEvent.startTime)}</div>
                  <div>{formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}</div>
                </div>
              </div>

              {selectedEvent.location && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Lieu</h4>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
              )}
            </div>

            {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Participants</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.attendees.map((attendee, index) => (
                    <Badge key={index} variant="default" size="sm">
                      {attendee}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="secondary">
                Modifier
              </Button>
              {selectedEvent.type === 'meeting' && (
                <Button>
                  <Video className="h-4 w-4 mr-2" />
                  Rejoindre
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Create Event Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouveau Rendez-vous"
        size="lg"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Réunion avec ALPHA Industries"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="meeting">Réunion</option>
              <option value="call">Appel</option>
              <option value="visit">Visite</option>
              <option value="deadline">Échéance</option>
              <option value="reminder">Rappel</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heure
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              placeholder="Description du rendez-vous..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lieu (optionnel)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Salle de conférence A"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit">
              Créer le Rendez-vous
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Calendar;