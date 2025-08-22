// ===== Enhanced ConcertInfoCard.tsx =====
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface ConcertInfoCardProps {
  name: string;
  date: string;
  time: string;
  info: string;
  img: any;
  onPress?: () => void;
}

export function CardInfo({ 
  name, 
  date, 
  time, 
  info, 
  img, 
  onPress 
}: ConcertInfoCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image style={styles.cardImg} source={img} />
        <View style={styles.overlay}>
          <View style={styles.musicIcon}>
            <Ionicons name="musical-notes" size={20} color="white" />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{`${date} • ${time}`}</Text>
        <Text style={styles.info} numberOfLines={2}>{info}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
  },
  cardImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  musicIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF7733',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
});
