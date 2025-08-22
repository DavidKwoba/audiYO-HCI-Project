import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface PreConcertButtonProps {
  text: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  isActive?: boolean;
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  badge?: number;
}

export default function PreConcertButton({ 
  text, 
  iconName, 
  onPress, 
  isActive = false,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  badge
}: PreConcertButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    // Size variations
    if (size === 'small') baseStyle.push(styles.buttonSmall);
    if (size === 'large') baseStyle.push(styles.buttonLarge);
    
    // Variant styles
    if (variant === 'primary') {
      baseStyle.push(styles.buttonPrimary);
      if (isActive) baseStyle.push(styles.buttonPrimaryActive);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.buttonSecondary);
      if (isActive) baseStyle.push(styles.buttonSecondaryActive);
    } else if (variant === 'outlined') {
      baseStyle.push(styles.buttonOutlined);
      if (isActive) baseStyle.push(styles.buttonOutlinedActive);
    }
    
    // Disabled state
    if (disabled) baseStyle.push(styles.buttonDisabled);
    
    return baseStyle;
  };

  const getIconColor = () => {
    if (disabled) return '#ccc';
    if (variant === 'primary') return isActive ? '#fff' : Colors.ctaOrange;
    if (variant === 'secondary') return isActive ? Colors.ctaOrange : '#666';
    if (variant === 'outlined') return isActive ? '#fff' : Colors.ctaOrange;
    return Colors.ctaOrange;
  };

  const getTextColor = () => {
    if (disabled) return '#ccc';
    if (variant === 'primary') return isActive ? '#fff' : Colors.ctaOrange;
    if (variant === 'secondary') return isActive ? Colors.ctaOrange : '#666';
    if (variant === 'outlined') return isActive ? '#fff' : Colors.ctaOrange;
    return Colors.ctaOrange;
  };

  const getIconSize = () => {
    if (size === 'small') return 20;
    if (size === 'large') return 32;
    return 24;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
      >
        <TouchableOpacity
          style={getButtonStyle()}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          activeOpacity={1}
        >
          <View style={styles.iconContainer}>
            <Ionicons 
              name={iconName} 
              size={getIconSize()} 
              color={getIconColor()} 
            />
            {badge && badge > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {badge > 99 ? '99+' : badge.toString()}
                </Text>
              </View>
            )}
          </View>
          
          <Text style={[styles.text, { color: getTextColor() }]}>
            {text}
          </Text>

          {isActive && (
            <View style={styles.activeIndicator} />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  
  // Base button styles
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    minWidth: 80,
    minHeight: 80,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  // Size variations
  buttonSmall: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 60,
    minHeight: 60,
    borderRadius: 12,
  },
  
  buttonLarge: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    minWidth: 100,
    minHeight: 100,
    borderRadius: 20,
  },
  
  // Variant styles
  buttonPrimary: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  buttonPrimaryActive: {
    backgroundColor: Colors.ctaOrange,
    shadowColor: Colors.ctaOrange,
    shadowOpacity: 0.3,
  },
  
  buttonSecondary: {
    backgroundColor: 'rgba(248, 249, 250, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  
  buttonSecondaryActive: {
    backgroundColor: 'rgba(255, 128, 64, 0.1)',
    borderColor: Colors.ctaOrange,
  },
  
  buttonOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  buttonOutlinedActive: {
    backgroundColor: Colors.ctaOrange,
    borderColor: Colors.ctaOrange,
  },
  
  buttonDisabled: {
    backgroundColor: 'rgba(248, 249, 250, 0.5)',
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  
  // Content styles
  iconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  
  text: {
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  
  // Badge
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ff4757',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  
  // Active indicator
  activeIndicator: {
    position: 'absolute',
    bottom: 4,
    left: '50%',
    marginLeft: -12,
    width: 24,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 2,
  },
});