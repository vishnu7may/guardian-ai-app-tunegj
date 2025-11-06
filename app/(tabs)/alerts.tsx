
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useAlerts } from '@/hooks/useAlerts';
import { useCameras } from '@/hooks/useCameras';
import AlertCard from '@/components/AlertCard';

export default function AlertsScreen() {
  const { alerts, markAsRead, markAllAsRead, clearAlert } = useAlerts();
  const { cameras } = useCameras();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredAlerts = filter === 'unread' 
    ? alerts.filter(a => !a.isRead)
    : alerts;

  const getCameraName = (cameraId: string) => {
    return cameras.find(c => c.id === cameraId)?.name || 'Unknown Camera';
  };

  return (
    <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Alerts',
            headerLargeTitle: true,
          }}
        />
      )}
      
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Alerts & Notifications</Text>
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markAllText}>Mark All Read</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              All ({alerts.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'unread' && styles.filterTabActive]}
            onPress={() => setFilter('unread')}
          >
            <Text style={[styles.filterText, filter === 'unread' && styles.filterTextActive]}>
              Unread ({alerts.filter(a => !a.isRead).length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Alerts List */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.content,
            Platform.OS !== 'ios' && styles.contentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <View key={alert.id}>
                <Text style={styles.cameraLabel}>{getCameraName(alert.cameraId)}</Text>
                <AlertCard
                  alert={alert}
                  onPress={() => markAsRead(alert.id)}
                  onDismiss={() => clearAlert(alert.id)}
                />
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <IconSymbol name="bell.slash.fill" size={64} color={colors.textSecondary} />
              <Text style={styles.emptyStateText}>No Alerts</Text>
              <Text style={styles.emptyStateSubtext}>
                {filter === 'unread' 
                  ? 'All alerts have been read'
                  : 'You&apos;re all caught up!'}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  markAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.card,
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  filterTextActive: {
    color: colors.card,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  contentWithTabBar: {
    paddingBottom: 100,
  },
  cameraLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
});
