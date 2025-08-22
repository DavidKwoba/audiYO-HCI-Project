// ===== Enhanced Asset.tsx =====
import { Image, Pressable, StyleSheet, View, ViewStyle } from 'react-native';

interface AssetProps {
  imgSrc: any;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  isSelected?: boolean;
}

export function AssetCard({ imgSrc, style, onPress, isSelected = false }: AssetProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        isSelected && styles.cardSelected,
        style
      ]}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={imgSrc} />
        {isSelected && (
          <View style={styles.selectedOverlay}>
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 140,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginRight: 12,
  },
  cardSelected: {
    borderColor: '#FF7733',
    shadowColor: '#FF7733',
    shadowOpacity: 0.3,
  },
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF7733',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
});
