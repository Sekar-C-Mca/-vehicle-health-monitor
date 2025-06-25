import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'Normal' | 'Warning' | 'Risk';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'Normal':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200',
          icon: CheckCircle,
          iconColor: 'text-green-600'
        };
      case 'Warning':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-200',
          icon: AlertTriangle,
          iconColor: 'text-yellow-600'
        };
      case 'Risk':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-200',
          icon: XCircle,
          iconColor: 'text-red-600'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200',
          icon: CheckCircle,
          iconColor: 'text-gray-600'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;
  
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';
  const iconSize = size === 'sm' ? 12 : 16;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${config.bgColor} ${config.textColor} ${config.borderColor} ${sizeClasses}`}
    >
      <Icon size={iconSize} className={config.iconColor} />
      {status}
    </span>
  );
};