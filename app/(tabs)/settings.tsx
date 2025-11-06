
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [motionAlerts, setMotionAlerts] = useState(true);
  const [nightVisionAuto, setNightVisionAuto] = useState(true);

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    value, 
    onValueChange, 
    showSwitch = true,
    onPress 
  }: any) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      disabled={showSwitch}
    >
      <View style={styles.settingIcon}>
        <IconSymbol name={icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {showSwitch ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.card}
        />
      ) : (
        <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Settings',
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
        {/* Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <IconSymbol name="person.fill" size={40} color={colors.card} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
          <TouchableOpacity>
            <IconSymbol name="pencil" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.card}>
            <SettingItem
              icon="bell.fill"
              title="Push Notifications"
              subtitle="Receive alerts on your device"
              value={notifications}
              onValueChange={setNotifications}
            />
            <SettingItem
              icon="waveform"
              title="Sound Detection Alerts"
              subtitle="Notify when crying or barking detected"
              value={soundAlerts}
              onValueChange={setSoundAlerts}
            />
            <SettingItem
              icon="figure.walk"
              title="Motion Detection Alerts"
              subtitle="Notify when movement detected"
              value={motionAlerts}
              onValueChange={setMotionAlerts}
            />
          </View>
        </View>

        {/* Camera Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Camera Settings</Text>
          <View style={styles.card}>
            <SettingItem
              icon="moon.fill"
              title="Auto Night Vision"
              subtitle="Automatically enable in low light"
              value={nightVisionAuto}
              onValueChange={setNightVisionAuto}
            />
            <SettingItem
              icon="video.fill"
              title="Video Quality"
              subtitle="HD (1080p)"
              showSwitch={false}
              onPress={() => console.log('Video quality pressed')}
            />
            <SettingItem
              icon="camera.fill"
              title="Manage Cameras"
              subtitle="Add or remove cameras"
              showSwitch={false}
              onPress={() => console.log('Manage cameras pressed')}
            />
          </View>
        </View>

        {/* Alert Zones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alert Zones</Text>
          <View style={styles.card}>
            <SettingItem
              icon="square.dashed"
              title="Custom Alert Zones"
              subtitle="Define specific areas to monitor"
              showSwitch={false}
              onPress={() => console.log('Alert zones pressed')}
            />
          </View>
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security & Privacy</Text>
          <View style={styles.card}>
            <SettingItem
              icon="lock.fill"
              title="Two-Factor Authentication"
              subtitle="Add extra security to your account"
              showSwitch={false}
              onPress={() => console.log('2FA pressed')}
            />
            <SettingItem
              icon="faceid"
              title="Biometric Login"
              subtitle="Use Face ID or Touch ID"
              showSwitch={false}
              onPress={() => console.log('Biometric pressed')}
            />
            <SettingItem
              icon="shield.fill"
              title="End-to-End Encryption"
              subtitle="Enabled"
              showSwitch={false}
              onPress={() => console.log('Encryption pressed')}
            />
          </View>
        </View>

        {/* Subscription */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription</Text>
          <View style={styles.premiumCard}>
            <IconSymbol name="crown.fill" size={32} color={colors.accent} />
            <View style={styles.premiumContent}>
              <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
              <Text style={styles.premiumText}>
                Unlock cloud storage, advanced AI features, and unlimited cameras
              </Text>
              <TouchableOpacity style={styles.upgradeButton}>
                <Text style={styles.upgradeButtonText}>View Plans</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <SettingItem
              icon="info.circle"
              title="Help & Support"
              showSwitch={false}
              onPress={() => console.log('Help pressed')}
            />
            <SettingItem
              icon="doc.text"
              title="Privacy Policy"
              showSwitch={false}
              onPress={() => console.log('Privacy pressed')}
            />
            <SettingItem
              icon="doc.text"
              title="Terms of Service"
              showSwitch={false}
              onPress={() => console.log('Terms pressed')}
            />
            <SettingItem
              icon="star.fill"
              title="Rate the App"
              showSwitch={false}
              onPress={() => console.log('Rate pressed')}
            />
          </View>
        </View>

        {/* Version */}
        <Text style={styles.version}>Version 1.0.0</Text>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginLeft: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  settingSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  premiumCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    borderWidth: 2,
    borderColor: colors.accent,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  premiumContent: {
    flex: 1,
    marginLeft: 16,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  premiumText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  upgradeButton: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  upgradeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  version: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
});
