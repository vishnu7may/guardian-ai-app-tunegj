
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

interface VideoPlayerProps {
  cameraName: string;
  isNightVision?: boolean;
  onToggleNightVision?: () => void;
}

export default function VideoPlayer({ 
  cameraName, 
  isNightVision = false,
  onToggleNightVision 
}: VideoPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <View style={styles.placeholderVideo}>
          <IconSymbol name="video.fill" size={64} color={colors.textSecondary} />
          <Text style={styles.placeholderText}>Live Video Stream</Text>
          <Text style={styles.placeholderSubtext}>
            Connect your camera to view live feed
          </Text>
          <Text style={styles.infoText}>
            Supports RTSP, Nest, Arlo, Wyze, and other standard cameras
          </Text>
        </View>
        
        {/* Overlay Controls */}
        <View style={styles.overlayTop}>
          <View style={styles.badge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <Text style={styles.cameraNameOverlay}>{cameraName}</Text>
        </View>

        <View style={styles.overlayBottom}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setIsMuted(!isMuted)}
          >
            <IconSymbol 
              name={isMuted ? 'speaker.slash.fill' : 'speaker.wave.2.fill'} 
              size={24} 
              color={colors.card}
            />
          </TouchableOpacity>

          {onToggleNightVision && (
            <TouchableOpacity 
              style={[styles.controlButton, isNightVision && styles.activeButton]}
              onPress={onToggleNightVision}
            >
              <IconSymbol 
                name="moon.fill" 
                size={24} 
                color={colors.card}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={[styles.controlButton, isRecording && styles.recordingButton]}
            onPress={() => setIsRecording(!isRecording)}
          >
            <IconSymbol 
              name="record.circle" 
              size={24} 
              color={colors.card}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <IconSymbol 
              name="camera.fill" 
              size={24} 
              color={colors.card}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.text,
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  placeholderVideo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.card,
    marginTop: 16,
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  overlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.card,
    marginRight: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.card,
  },
  cameraNameOverlay: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: colors.accent,
  },
  recordingButton: {
    backgroundColor: colors.error,
  },
});
