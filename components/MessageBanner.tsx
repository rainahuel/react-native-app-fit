// components/MessageBanner.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

interface MessageBannerProps {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
  onHide: () => void;
}

function MessageBanner({ message, type, visible, onHide }: MessageBannerProps) {
  const [animation] = useState(new Animated.Value(0));

  // Use useEffect instead of directly calling onHide in the prop
  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        hideMessage();
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      animation.setValue(0);
    }
  }, [visible]);

  // Create a separate function to handle hiding the message
  const hideMessage = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Call onHide after animation completes
      if (visible) {
        onHide();
      }
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        type === 'success' ? styles.successContainer : styles.errorContainer,
        {
          opacity: animation,
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.content}>
        <Ionicons
          name={type === 'success' ? 'checkmark-circle' : 'alert-circle'}
          size={24}
          color="#fff"
        />
        <Text style={styles.message}>{message}</Text>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={hideMessage}>
        <Ionicons name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 9999,
  },
  successContainer: {
    backgroundColor: '#4CAF50',
  },
  errorContainer: {
    backgroundColor: '#F44336',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
});

export default MessageBanner;