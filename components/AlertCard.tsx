
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { Alert } from '@/types/monitoring';
import { colors } from '@/styles/commonStyles';

interface AlertCardProps {
  alert: Alert;
  onPress?: () => void;
  onDismiss?: () => void;
}

export default function AlertCard({ alert, onPress, onDismiss }: AlertCardProps) {
  const getAlertIcon = () => {
    switch (alert.type) {
      case 'crying':
        return 'exclamationmark.triangle.fill';
      case 'barking':
        return 'speaker.wave.3.fill';
      case 'motion':
        return 'figure.walk';
      case 'sound':
        return 'waveform';
      default:
        return 'bell.fill';
    }
  };

  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.secondary;
      default:
        return colors.textSecondary;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <TouchableOpacity 
      style={[styles.container, !alert.isRead && styles.unreadContainer]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: getSeverityColor() }]}>
        <IconSymbol name={getAlertIcon()} size={24} color={colors.card} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>{alert.description}</Text>
        <Text style={styles.timestamp}>{formatTime(alert.timestamp)}</Text>
      </View>

      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
          <IconSymbol name="xmark" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      )}

      {!alert.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  unreadContainer: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  dismissButton: {
    padding: 8,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    position: 'absolute',
    top: 12,
    right: 12,
  },
});
