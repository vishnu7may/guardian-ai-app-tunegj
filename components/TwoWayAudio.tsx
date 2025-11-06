
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

interface TwoWayAudioProps {
  cameraName: string;
}

export default function TwoWayAudio({ cameraName }: TwoWayAudioProps) {
  const [isTalking, setIsTalking] = useState(false);
  const [selectedSound, setSelectedSound] = useState<string | null>(null);

  const soothingSounds = [
    { id: '1', name: 'White Noise', icon: 'waveform' },
    { id: '2', name: 'Lullaby', icon: 'music.note' },
    { id: '3', name: 'Ocean Waves', icon: 'water.waves' },
    { id: '4', name: 'Heartbeat', icon: 'heart.fill' },
  ];

  const handleTalkPress = () => {
    setIsTalking(!isTalking);
    console.log('Two-way audio:', isTalking ? 'stopped' : 'started');
  };

  const handleSoundPress = (soundId: string) => {
    setSelectedSound(selectedSound === soundId ? null : soundId);
    console.log('Playing sound:', soundId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Two-Way Communication</Text>
      
      <TouchableOpacity 
        style={[styles.talkButton, isTalking && styles.talkButtonActive]}
        onPress={handleTalkPress}
        onPressIn={() => setIsTalking(true)}
        onPressOut={() => setIsTalking(false)}
      >
        <IconSymbol 
          name={isTalking ? 'mic.fill' : 'mic'} 
          size={32} 
          color={colors.card}
        />
        <Text style={styles.talkButtonText}>
          {isTalking ? 'Talking...' : 'Hold to Talk'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Soothing Sounds</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.soundsContainer}
      >
        {soothingSounds.map((sound) => (
          <TouchableOpacity
            key={sound.id}
            style={[
              styles.soundButton,
              selectedSound === sound.id && styles.soundButtonActive,
            ]}
            onPress={() => handleSoundPress(sound.id)}
          >
            <IconSymbol 
              name={sound.icon} 
              size={24} 
              color={selectedSound === sound.id ? colors.card : colors.primary}
            />
            <Text style={[
              styles.soundButtonText,
              selectedSound === sound.id && styles.soundButtonTextActive,
            ]}>
              {sound.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  talkButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  talkButtonActive: {
    backgroundColor: colors.error,
  },
  talkButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  soundsContainer: {
    paddingVertical: 4,
  },
  soundButton: {
    backgroundColor: colors.highlight,
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  soundButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  soundButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 4,
  },
  soundButtonTextActive: {
    color: colors.card,
  },
});
