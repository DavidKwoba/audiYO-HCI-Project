import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import StandardButton from '../../components/ButtonTemplate';
import { Colors } from '../../constants/Colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function JoinRoomScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { roomName, roomId, sectionStuff } = useLocalSearchParams();
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  // Parse section data safely
  let sectionData = null;
  try {
    sectionData = typeof sectionStuff === 'string' ? JSON.parse(sectionStuff) : sectionStuff;
  } catch (error) {
    console.warn('Failed to parse section data:', error);
  }

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleJoinRoom = () => {
    router.push('/screens/preConcertRoomScreen' as any);
  };

  const handleBack = () => {
    router.back();
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date TBA';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return 'Time TBA';
    return timeString;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Header */}
      <Animated.View 
        style={[
          styles.header,
          { paddingTop: insets.top, opacity: fadeAnim }
        ]}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Join Room</Text>
        
        <View style={styles.headerRight} />
      </Animated.View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Room Info Card */}
        <Animated.View 
          style={[
            styles.roomCard,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          {/* Concert Image */}
          {sectionData?.img && (
            <View style={styles.imageContainer}>
              <Image source={sectionData.img} style={styles.concertImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.imageOverlay}
              />
              <View style={styles.imageContent}>
                <Text style={styles.roomNameOnImage}>{roomName as string}</Text>
              </View>
            </View>
          )}

          {/* Room Details */}
          <View style={styles.roomDetails}>
            <View style={styles.roomHeader}>
              <View style={styles.roomIconContainer}>
                <Ionicons name="musical-notes" size={24} color={Colors.ctaOrange} />
              </View>
              <View style={styles.roomTitleContainer}>
                <Text style={styles.roomTitle}>{roomName as string}</Text>
                <Text style={styles.roomSubtitle}>Concert Room</Text>
              </View>
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </View>

            {/* Concert Information */}
            {sectionData && (
              <View style={styles.concertInfo}>
                <View style={styles.infoRow}>
                  <Ionicons name="calendar-outline" size={20} color="#666" />
                  <Text style={styles.infoText}>
                    {formatDate(sectionData.date)}
                  </Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={20} color="#666" />
                  <Text style={styles.infoText}>
                    {formatTime(sectionData.time)}
                  </Text>
                </View>

                {sectionData.genre && (
                  <View style={styles.infoRow}>
                    <Ionicons name="musical-note-outline" size={20} color="#666" />
                    <Text style={styles.infoText}>{sectionData.genre}</Text>
                  </View>
                )}

                {sectionData.location && (
                  <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={20} color="#666" />
                    <Text style={styles.infoText}>{sectionData.location}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Description */}
            {sectionData?.info && (
              <View style={styles.descriptionSection}>
                <Text style={styles.descriptionTitle}>About this concert</Text>
                <Text style={styles.descriptionText}>{sectionData.info}</Text>
              </View>
            )}

            {/* Room Stats */}
            <View style={styles.statsSection}>
              <View style={styles.statItem}>
                <Ionicons name="people" size={20} color={Colors.ctaOrange} />
                <Text style={styles.statNumber}>24</Text>
                <Text style={styles.statLabel}>Listening</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="chatbubbles" size={20} color={Colors.ctaOrange} />
                <Text style={styles.statNumber}>156</Text>
                <Text style={styles.statLabel}>Messages</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="heart" size={20} color={Colors.ctaOrange} />
                <Text style={styles.statNumber}>89</Text>
                <Text style={styles.statLabel}>Reactions</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Features Section */}
        <Animated.View 
          style={[
            styles.featuresCard,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.featuresTitle}>What you&apos;ll experience</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="headset" size={20} color={Colors.ctaOrange} />
              <Text style={styles.featureText}>High-quality synchronized audio</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="chatbubble-ellipses" size={20} color={Colors.ctaOrange} />
              <Text style={styles.featureText}>Real-time chat with other fans</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="heart" size={20} color={Colors.ctaOrange} />
              <Text style={styles.featureText}>React and interact during the show</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="people" size={20} color={Colors.ctaOrange} />
              <Text style={styles.featureText}>Connect with fellow music lovers</Text>
            </View>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View 
          style={[
            styles.actionSection,
            { opacity: fadeAnim }
          ]}
        >
          <StandardButton
            text="🎵 Join Room"
            onPress={handleJoinRoom}
            width={screenWidth - 40}
            height={56}
            bgColor={Colors.ctaOrange}
            textColor="#fff"
          />
          
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={20} color={Colors.ctaOrange} />
            <Text style={styles.shareButtonText}>Share with friends</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  // Room Card
  roomCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  concertImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  imageContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  roomNameOnImage: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  // Room Details
  roomDetails: {
    padding: 24,
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  roomIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.ctaOrange}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  roomTitleContainer: {
    flex: 1,
  },
  roomTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  roomSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    marginRight: 4,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
  },

  // Concert Info
  concertInfo: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#1a1a1a',
    marginLeft: 12,
    flex: 1,
  },

  // Description
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },

  // Stats
  statsSection: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e9ecef',
    marginHorizontal: 16,
  },

  // Features Card
  featuresCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },

  // Actions
  actionSection: {
    alignItems: 'center',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  shareButtonText: {
    fontSize: 16,
    color: Colors.ctaOrange,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 
