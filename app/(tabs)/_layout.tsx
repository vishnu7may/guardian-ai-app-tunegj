
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'video.fill',
      label: 'Monitor',
    },
    {
      name: 'alerts',
      route: '/(tabs)/alerts',
      icon: 'bell.fill',
      label: 'Alerts',
    },
    {
      name: 'analytics',
      route: '/(tabs)/analytics',
      icon: 'chart.bar.fill',
      label: 'Analytics',
    },
    {
      name: 'settings',
      route: '/(tabs)/settings',
      icon: 'gear',
      label: 'Settings',
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="video.fill" drawable="ic_home" />
          <Label>Monitor</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="alerts">
          <Icon sf="bell.fill" drawable="ic_alerts" />
          <Label>Alerts</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="analytics">
          <Icon sf="chart.bar.fill" drawable="ic_analytics" />
          <Label>Analytics</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
          <Icon sf="gear" drawable="ic_settings" />
          <Label>Settings</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="alerts" />
        <Stack.Screen name="analytics" />
        <Stack.Screen name="settings" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
