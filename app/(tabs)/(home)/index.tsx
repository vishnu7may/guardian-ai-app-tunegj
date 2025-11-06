
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useCameras } from '@/hooks/useCameras';
import { useAlerts } from '@/hooks/useAlerts';
import CameraSelector from '@/components/CameraSelector';
import VideoPlayer from '@/components/VideoPlayer';
import TwoWayAudio from '@/components/TwoWayAudio';
import AlertCard from '@/components/AlertCard';

export default function HomeScreen() {
  const { cameras, selectedCamera, setSelectedCamera } = useCameras();
  const { alerts, unreadCount, markAsRead } = useAlerts();
  const [isNightVision, setIsNightVision] = useState(false);

  const recentAlerts = alerts
    .filter(a => selectedCamera ? a.cameraId === selectedCamera.id : true)
    .slice(0, 3);

  return (
    <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Baby & Pet Monitor',
            headerLargeTitle: true,
          }}
        />
      )}
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          Platform.OS !== 'ios' && styles.contentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome Back</Text>
            <Text style={styles.subtitle}>Monitor your loved ones</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <IconSymbol name="bell.fill" size={24} color={colors.primary} />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Camera Selector */}
        <CameraSelector
          cameras={cameras}
          selectedCamera={selectedCamera}
          onSelectCamera={setSelectedCamera}
        />

        {/* Video Player */}
        {selectedCamera && (
          <View style={styles.section}>
            <VideoPlayer
              cameraName={selectedCamera.name}
              isNightVision={isNightVision}
              onToggleNightVision={() => setIsNightVision(!isNightVision)}
            />
          </View>
        )}

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <IconSymbol name="moon.zzz.fill" size={28} color={colors.primary} />
            <Text style={styles.statValue}>7.5h</Text>
            <Text style={styles.statLabel}>Sleep Time</Text>
          </View>
          <View style={styles.statCard}>
            <IconSymbol name="figure.walk" size={28} color={colors.secondary} />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Activities</Text>
          </View>
          <View style={styles.statCard}>
            <IconSymbol name="bell.fill" size={28} color={colors.accent} />
            <Text style={styles.statValue}>{alerts.length}</Text>
            <Text style={styles.statLabel}>Alerts</Text>
          </View>
        </View>

        {/* Two-Way Audio */}
        {selectedCamera?.hasTwoWayAudio && (
          <TwoWayAudio cameraName={selectedCamera.name} />
        )}

        {/* Recent Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentAlerts.length > 0 ? (
            recentAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onPress={() => markAsRead(alert.id)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <IconSymbol name="checkmark.circle.fill" size={48} color={colors.primary} />
              <Text style={styles.emptyStateText}>All Clear!</Text>
              <Text style={styles.emptyStateSubtext}>No recent alerts</Text>
            </View>
          )}
        </View>

        {/* AI Features Info */}
        <View style={styles.infoCard}>
          <IconSymbol name="sparkles" size={24} color={colors.accent} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>AI-Powered Detection</Text>
            <Text style={styles.infoText}>
              Advanced AI monitors for crying, barking, unusual movements, and behavior patterns
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 20,
  },
  contentWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.card,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
