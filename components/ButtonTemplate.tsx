// ===== Enhanced ButtonTemplate.tsx =====
import { router } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface ButtonTemplateProps {
  text: string;
  href?: string;
  onPress?: () => void;
  nav?: { navigate: (screen: string) => void };
  screenName?: string;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  width?: number | string;
  height?: number;
  bgColor?: string;
  textColor?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function ButtonTemplate({
  text,
  href,
  onPress,
  nav,
  screenName,
  containerStyle,
  buttonStyle,
  textStyle,
  width = '100%',
  height = 56,
  bgColor,
  textColor,
  disabled = false,
  loading = false,
  variant = 'primary',
}: ButtonTemplateProps) {
  const handlePress = () => {
    if (disabled || loading) return;
    if (onPress) return onPress();
    if (href) return router.push(href as any);
    if (nav && screenName) return nav.navigate(screenName);
  };

  const getButtonStyles = () => {
    const baseStyle = [
      styles.button,
      { width, height, borderRadius: height * 0.3 },
      buttonStyle,
    ];

    if (disabled || loading) {
      return [...baseStyle, styles.buttonDisabled];
    }

    switch (variant) {
      case 'secondary':
        return [...baseStyle, styles.buttonSecondary, bgColor && { backgroundColor: bgColor }];
      case 'outline':
        return [...baseStyle, styles.buttonOutline, bgColor && { borderColor: bgColor }];
      default:
        return [...baseStyle, styles.buttonPrimary, bgColor && { backgroundColor: bgColor }];
    }
  };

  const getTextStyles = () => {
    const baseStyle = [styles.text, { fontSize: height * 0.3 }, textStyle];

    if (disabled || loading) {
      return [...baseStyle, styles.textDisabled];
    }

    switch (variant) {
      case 'outline':
        return [...baseStyle, styles.textOutline, textColor && { color: textColor }];
      default:
        return [...baseStyle, styles.textPrimary, textColor && { color: textColor }];
    }
  };

  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={handlePress}
      disabled={disabled || loading}
    >
      <Pressable style={getButtonStyles()} onPress={handlePress}>
        {loading ? (
          <ActivityIndicator color={variant === 'outline' ? '#FF7733' : 'white'} size="small" />
        ) : (
          <Text style={getTextStyles()}>{text}</Text>
        )}
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonPrimary: {
    backgroundColor: '#FF7733',
  },
  buttonSecondary: {
    backgroundColor: '#6c757d',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF7733',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    fontWeight: '700',
    textAlign: 'center',
  },
  textPrimary: {
    color: 'white',
  },
  textOutline: {
    color: '#FF7733',
  },
  textDisabled: {
    color: '#999',
  },
});

// Export as StandardButton for backward compatibility
export const StandardButton = ButtonTemplate;

// Also export as default for backward compatibility
export default ButtonTemplate;