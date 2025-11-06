
import { useState, useEffect } from 'react';
import { Camera } from '@/types/monitoring';

export function useCameras() {
  const [cameras, setCameras] = useState<Camera[]>([
    {
      id: '1',
      name: 'Baby Room',
      type: 'baby',
      location: 'Nursery',
      isOnline: true,
      hasNightVision: true,
      hasTwoWayAudio: true,
    },
    {
      id: '2',
      name: 'Living Room',
      type: 'pet',
      location: 'Living Room',
      isOnline: true,
      hasNightVision: false,
      hasTwoWayAudio: true,
    },
  ]);

  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(cameras[0]);

  const addCamera = (camera: Omit<Camera, 'id'>) => {
    const newCamera: Camera = {
      ...camera,
      id: Date.now().toString(),
    };
    setCameras([...cameras, newCamera]);
  };

  const removeCamera = (id: string) => {
    setCameras(cameras.filter(c => c.id !== id));
    if (selectedCamera?.id === id) {
      setSelectedCamera(cameras[0] || null);
    }
  };

  const updateCamera = (id: string, updates: Partial<Camera>) => {
    setCameras(cameras.map(c => c.id === id ? { ...c, ...updates } : c));
    if (selectedCamera?.id === id) {
      setSelectedCamera({ ...selectedCamera, ...updates });
    }
  };

  return {
    cameras,
    selectedCamera,
    setSelectedCamera,
    addCamera,
    removeCamera,
    updateCamera,
  };
}
