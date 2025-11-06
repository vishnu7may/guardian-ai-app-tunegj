
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import ActivityChart from '@/components/ActivityChart';

export default function AnalyticsScreen() {
  const activityData = [
    { hour: 0, activity: 10 },
    { hour: 3, activity: 5 },
    { hour: 6, activity: 30 },
    { hour: 9, activity: 60 },
    { hour: 12, activity: 80 },
    { hour: 15, activity: 70 },
    { hour: 18, activity: 90 },
    { hour: 21, activity: 40 },
  ];

  const highlights = [
    'Slept through the night (7.5 hours)',
    'Most active period: 6pm - 8pm',
    'No unusual alerts detected',
    'Average response time: 2 minutes',
  ];

  return (
    <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Analytics',
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
          <Text style={styles.title}>Daily Analytics</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}</Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: colors.primary }]}>
              <IconSymbol name="moon.zzz.fill" size={24} color={colors.card} />
            </View>
            <Text style={styles.summaryValue}>7.5h</Text>
            <Text style={styles.summaryLabel}>Total Sleep</Text>
            <Text style={styles.summaryChange}>+0.5h from yesterday</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: colors.secondary }]}>
              <IconSymbol name="figure.walk" size={24} color={colors.card} />
            </View>
            <Text style={styles.summaryValue}>4.2h</Text>
            <Text style={styles.summaryLabel}>Active Time</Text>
            <Text style={styles.summaryChange}>Normal activity</Text>
          </View>
        </View>

        {/* Activity Chart */}
        <ActivityChart 
          data={activityData}
          title="Activity Pattern (24 hours)"
        />

        {/* Behavior Insights */}
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <IconSymbol name="brain.head.profile" size={24} color={colors.accent} />
            <Text style={styles.insightsTitle}>AI Behavior Insights</Text>
          </View>
          <View style={styles.insightItem}>
            <IconSymbol name="checkmark.circle.fill" size={20} color={colors.success} />
            <Text style={styles.insightText}>Sleep pattern is consistent and healthy</Text>
          </View>
          <View style={styles.insightItem}>
            <IconSymbol name="info.circle.fill" size={20} color={colors.secondary} />
            <Text style={styles.insightText}>Peak activity during evening hours</Text>
          </View>
          <View style={styles.insightItem}>
            <IconSymbol name="star.fill" size={20} color={colors.accent} />
            <Text style={styles.insightText}>No unusual behavior detected today</Text>
          </View>
        </View>

        {/* Daily Highlights */}
        <View style={styles.highlightsCard}>
          <Text style={styles.highlightsTitle}>Today&apos;s Highlights</Text>
          {highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightItem}>
              <View style={styles.highlightDot} />
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>

        {/* Detection Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <IconSymbol name="waveform" size={28} color={colors.primary} />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Sound Events</Text>
          </View>
          <View style={styles.statItem}>
            <IconSymbol name="figure.walk" size={28} color={colors.secondary} />
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>Motion Events</Text>
          </View>
          <View style={styles.statItem}>
            <IconSymbol name="exclamationmark.triangle" size={28} color={colors.accent} />
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Alerts Sent</Text>
          </View>
          <View style={styles.statItem}>
            <IconSymbol name="clock.fill" size={28} color={colors.primary} />
            <Text style={styles.statValue}>2m</Text>
            <Text style={styles.statLabel}>Avg Response</Text>
          </View>
        </View>

        {/* Premium Feature Teaser */}
        <View style={styles.premiumCard}>
          <IconSymbol name="crown.fill" size={32} color={colors.accent} />
          <View style={styles.premiumContent}>
            <Text style={styles.premiumTitle}>Unlock Advanced Analytics</Text>
            <Text style={styles.premiumText}>
              Get detailed weekly reports, emotion recognition, and predictive insights
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  date: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  summaryChange: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
  },
  insightsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  highlightsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  highlightsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  highlightDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  highlightText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  statItem: {
    width: '48%',
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
    textAlign: 'center',
  },
  premiumCard: {
    flexDirection: 'row',
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  premiumContent: {
    flex: 1,
    marginLeft: 16,
  },
  premiumTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  premiumText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
