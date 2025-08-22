// ===== Enhanced BackButton.tsx =====
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

interface BackButtonProps {
  toDo: () => void;
  size?: number;
  color?: string;
}

export function BackButton({ toDo, size = 24, color = '#1a1a1a' }: BackButtonProps) {
  return (
    <Pressable
      style={styles.button}
      onPress={toDo}
      android_ripple={{ color: 'rgba(0,0,0,0.1)', borderless: true }}
    >
      <Ionicons name="chevron-back" size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});