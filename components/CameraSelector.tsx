
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { Camera } from '@/types/monitoring';
import { colors } from '@/styles/commonStyles';

interface CameraSelectorProps {
  cameras: Camera[];
  selectedCamera: Camera | null;
  onSelectCamera: (camera: Camera) => void;
}

export default function CameraSelector({ cameras, selectedCamera, onSelectCamera }: CameraSelectorProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {cameras.map((camera) => (
        <TouchableOpacity
          key={camera.id}
          style={[
            styles.cameraCard,
            selectedCamera?.id === camera.id && styles.selectedCard,
          ]}
          onPress={() => onSelectCamera(camera)}
        >
          <View style={[
            styles.iconContainer,
            { backgroundColor: camera.isOnline ? colors.primary : colors.textSecondary }
          ]}>
            <IconSymbol 
              name={camera.type === 'baby' ? 'figure.child' : 'pawprint.fill'} 
              size={24} 
              color={colors.card}
            />
          </View>
          <Text style={styles.cameraName}>{camera.name}</Text>
          <Text style={styles.cameraLocation}>{camera.location}</Text>
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot,
              { backgroundColor: camera.isOnline ? colors.success : colors.error }
            ]} />
            <Text style={styles.statusText}>
              {camera.isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cameraCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  selectedCard: {
    borderColor: colors.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cameraName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
    textAlign: 'center',
  },
  cameraLocation: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});
