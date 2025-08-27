import React from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle, Pause } from 'lucide-react';
import { clsx } from 'clsx';

interface StatusIndicatorProps {
  status: 'active' | 'pending' | 'completed' | 'cancelled' | 'paused' | 'overdue';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          label: 'Terminé'
        };
      case 'active':
        return {
          icon: Clock,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          label: 'Actif'
        };
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          label: 'En attente'
        };
      case 'cancelled':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          label: 'Annulé'
        };
      case 'paused':
        return {
          icon: Pause,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          label: 'En pause'
        };
      case 'overdue':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          label: 'En retard'
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          label: 'Inconnu'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={clsx('flex items-center space-x-2', className)}>
      <div className={clsx('p-1 rounded-full', config.bgColor)}>
        <Icon className={clsx(sizeClasses[size], config.color)} />
      </div>
      {showLabel && (
        <span className={clsx('font-medium', config.color, textSizeClasses[size])}>
          {config.label}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;