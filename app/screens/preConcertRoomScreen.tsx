import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CardInfo } from '../../components/ConcertInfoCard';
import PreconcertButton from '../../components/PreConcertButton';
import { Colors } from '../../constants/Colors';
import Images from '../../constants/Images';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ParticipantData {
  id: string;
  name: string;
  avatar: any;
  isActive: boolean;
  isSpeaking?: boolean;
}

export default function PreConcertRoomScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [visibleOverlay, setVisibleOverlay] = useState<{ [key: string]: boolean }>({
    Music: false,
    Games: false,
    Settings: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [participantCount, setParticipantCount] = useState(24);
  const [roomInfo, setRoomInfo] = useState({
    name: "Taylor's Concert Room",
    concertTitle: "Taylor Swift - Eras Tour",
    startTime: "8:00 PM EST",
    status: "Waiting to start"
  });

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const participantAnims = useRef(Array(4).fill(0).map(() => new Animated.Value(0.8))).current;

  // Sample participants data
  const [participants] = useState<ParticipantData[]>([
    { id: '1', name: 'You', avatar: Images.flowerprofile, isActive: true, isSpeaking: true },
    { id: '2', name: 'Sarah M.', avatar: Images.flowerprofile, isActive: true },
    { id: '3', name: 'Mike K.', avatar: Images.flowerprofile, isActive: true, isSpeaking: true },
    { id: '4', name: 'Emma L.', avatar: Images.flowerprofile, isActive: false },
  ]);

  useEffect(() => {
    // Entrance animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Pulse animation for active status
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // Staggered participant animations
    const participantAnimations = participantAnims.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      })
    );
    
    Animated.parallel(participantAnimations).start();

    return () => {
      pulseAnimation.stop();
    };
  }, []);

  const toggleOverlay = (tab: string) => {
    setVisibleOverlay(prev => ({ ...prev, [tab]: !prev[tab] }));
  };

  const handleStartConcert = () => {
    setIsLoading(true);
    // Simulate loading and navigation
    setTimeout(() => {
      router.push('/screens/performanceRoomScreen' as any);
    }, 2000);
  };

  const renderParticipant = (participant: ParticipantData, index: number) => {
    const isYou = participant.id === '1';
    return (
      <Animated.View
        key={participant.id}
        style={[
          styles.participantContainer,
          {
            opacity: participantAnims[index],
            transform: [{ scale: participantAnims[index] }],
          }
        ]}
      >
        <View style={[
          styles.participantImageContainer,
          participant.isSpeaking && styles.participantSpeaking,
          !participant.isActive && styles.participantInactive,
        ]}>
          <Image source={participant.avatar} style={styles.participantImage} />
          
          {/* Speaking indicator */}
          {participant.isSpeaking && (
            <Animated.View style={[
              styles.speakingIndicator,
              { transform: [{ scale: pulseAnim }] }
            ]} />
          )}
          
          {/* Mute indicator for inactive users */}
          {!participant.isActive && (
            <View style={styles.muteIndicator}>
              <Ionicons name="mic-off" size={12} color="white" />
            </View>
          )}
          
          {/* You indicator */}
          {isYou && (
            <View style={styles.youIndicator}>
              <Text style={styles.youText}>YOU</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.participantName} numberOfLines={1}>
          {participant.name}
        </Text>
      </Animated.View>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
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
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.roomName}>{roomInfo.name}</Text>
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{roomInfo.status}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>

        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Concert Info Card */}
          <Animated.View style={[styles.concertCard, { opacity: fadeAnim }]}>
            <LinearGradient
              colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
              style={styles.concertCardGradient}
            >
              <View style={styles.concertInfo}>
                <View style={styles.concertIconContainer}>
                  <Ionicons name="musical-notes" size={24} color={Colors.ctaOrange} />
                </View>
                <View style={styles.concertDetails}>
                  <Text style={styles.concertTitle}>{roomInfo.concertTitle}</Text>
                  <Text style={styles.concertTime}>Starting at {roomInfo.startTime}</Text>
                </View>
                <View style={styles.participantCountContainer}>
                  <Ionicons name="people" size={16} color="#666" />
                  <Text style={styles.participantCountText}>{participantCount}</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Participants Grid */}
          <Animated.View style={[styles.participantsSection, { opacity: fadeAnim }]}>
            <Text style={styles.sectionTitle}>In the room ({participants.length})</Text>
            <View style={styles.participantsGrid}>
              {participants.map((participant, index) => renderParticipant(participant, index))}
            </View>
            
            {participantCount > 4 && (
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>
                  +{participantCount - 4} more participants
                </Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.ctaOrange} />
              </TouchableOpacity>
            )}
          </Animated.View>

          {/* Pre-Concert Activities */}
          <Animated.View style={[styles.activitiesSection, { opacity: fadeAnim }]}>
            <Text style={styles.sectionTitle}>Pre-Concert Activities</Text>
            <View style={styles.activitiesGrid}>
              <PreconcertButton 
                text="Music Queue" 
                iconName="musical-notes-outline" 
                onPress={() => toggleOverlay('Music')}
                variant="primary"
                badge={3}
              />
              <PreconcertButton 
                text="Mini Games" 
                iconName="game-controller-outline" 
                onPress={() => toggleOverlay('Games')}
                variant="primary"
              />
              <PreconcertButton 
                text="Chat" 
                iconName="chatbubbles-outline" 
                onPress={() => {}}
                variant="primary"
                badge={12}
              />
              <PreconcertButton 
                text="Settings" 
                iconName="settings-outline" 
                onPress={() => toggleOverlay('Settings')}
                variant="secondary"
              />
            </View>
          </Animated.View>

          {/* Quick Actions */}
          <Animated.View style={[styles.quickActions, { opacity: fadeAnim }]}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.startButton]}
              onPress={handleStartConcert}
              disabled={isLoading}
            >
              <LinearGradient
                colors={['#FF6B6B', '#FF8E53']}
                style={styles.startButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <Animated.View
                      style={[
                        styles.loadingSpinner,
                        { transform: [{ rotate: pulseAnim.interpolate({
                          inputRange: [1, 1.1],
                          outputRange: ['0deg', '360deg']
                        })}] }
                      ]}
                    />
                    <Text style={styles.startButtonText}>Starting...</Text>
                  </View>
                ) : (
                  <>
                    <Ionicons name="play-circle" size={24} color="white" />
                    <Text style={styles.startButtonText}>Join Concert Experience</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={20} color={Colors.ctaOrange} />
              <Text style={styles.actionButtonText}>Invite Friends</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>

        {/* Modals for overlays */}
        {Object.keys(visibleOverlay).map(tab => (
          <Modal
            key={tab}
            visible={visibleOverlay[tab]}
            transparent
            animationType="fade"
            onRequestClose={() => toggleOverlay(tab)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => toggleOverlay(tab)}
                >
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
                
                <CardInfo
                  name={tab}
                  date="Today"
                  time="Now"
                  info={`Welcome to the ${tab} section! Here you can interact with other fans while waiting for the concert to begin.`}
                  img={Images.flowerprofile}
                />
              </View>
            </View>
          </Modal>
        ))}
      </SafeAreaView>
    </>
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
  
  // Header
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  roomName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Content
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  
  // Concert Card
  concertCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  concertCardGradient: {
    padding: 20,
  },
  concertInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  concertIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.ctaOrange}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  concertDetails: {
    flex: 1,
  },
  concertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  concertTime: {
    fontSize: 14,
    color: '#666',
  },
  participantCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  participantCountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 4,
  },
  
  // Sections
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  
  // Participants
  participantsSection: {
    marginBottom: 32,
  },
  participantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  participantContainer: {
    alignItems: 'center',
    marginBottom: 16,
    width: (screenWidth - 60) / 4,
  },
  participantImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  participantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  participantSpeaking: {
    borderColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  participantInactive: {
    opacity: 0.6,
  },
  speakingIndicator: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  muteIndicator: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff4757',
    alignItems: 'center',
    justifyContent: 'center',
  },
  youIndicator: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -15,
    backgroundColor: Colors.ctaOrange,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  youText: {
    fontSize: 8,
    fontWeight: '700',
    color: 'white',
  },
  participantName: {
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 8,
  },
  viewAllText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  
  // Activities
  activitiesSection: {
    marginBottom: 32,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  // Quick Actions
  quickActions: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  startButton: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  startButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  actionButtonText: {
    color: Colors.ctaOrange,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingSpinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderTopColor: 'white',
    marginRight: 8,
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
}); 
