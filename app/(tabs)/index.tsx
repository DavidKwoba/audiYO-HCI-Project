import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Images from '../../constants/Images';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleExploreConcerts = () => {
    router.push('/screens/exploreConcertsScreen');
  };

  const handleMyRooms = () => {
    router.push('/screens/myRoomsScreen');
  };

  const handleCreateRoom = () => {
    router.push('/screens/createRoomPinScreen');
  };

  const handleJoinRoom = () => {
    router.push('/screens/joinExistingRoomScreen');
  };

  const handleCustomize = () => {
    router.push('/screens/customizeScreen');
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Floating background elements for visual interest */}
      <View style={styles.backgroundElements}>
        <View style={[styles.floatingCircle, styles.circle1]} />
        <View style={[styles.floatingCircle, styles.circle2]} />
        <View style={[styles.floatingCircle, styles.circle3]} />
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.welcomeText}>Welcome to audiYO</Text>
          <Text style={styles.subtitleText}>
            Experience concerts like never before with immersive group rooms
          </Text>
        </View>

        {/* Featured Artist Section */}
        <View style={styles.featuredSection}>
          <View style={styles.featuredCard}>
            <View style={styles.artistImageContainer}>
              <Image 
                source={Images.lianne}
                style={styles.artistImage}
                resizeMode="cover"
              />
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE NOW</Text>
              </View>
            </View>
            
            <View style={styles.artistInfo}>
              <Text style={styles.artistName}>Featured Artist</Text>
              <Text style={styles.artistDescription}>
                Join exclusive live sessions and connect with fans worldwide
              </Text>
            </View>
          </View>
        </View>

        {/* Main Action Buttons */}
        <View style={styles.actionsSection}>
          {/* Primary Actions */}
          <TouchableOpacity 
            style={styles.primaryActionCard}
            onPress={handleExploreConcerts}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FF6B6B', '#FF8E53']}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.actionContent}>
                <View style={styles.actionIcon}>
                  <Ionicons name="musical-notes" size={28} color="white" />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionTitle}>Explore Concerts</Text>
                  <Text style={styles.actionSubtitle}>
                    Discover live performances and join group rooms
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="white" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryActionCard}
            onPress={handleMyRooms}
            activeOpacity={0.9}
          >
            <View style={styles.actionContent}>
              <View style={styles.actionIcon}>
                <Ionicons name="home" size={28} color="#667eea" />
              </View>
              <View style={styles.actionTextContainer}>
                <Text style={styles.secondaryActionTitle}>My Rooms</Text>
                <Text style={styles.secondaryActionSubtitle}>
                  Access your private concert rooms
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.7)" />
            </View>
          </TouchableOpacity>

          {/* Quick Actions Grid */}
          <View style={styles.quickActionsContainer}>
            <Text style={styles.quickActionsTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={handleCreateRoom}
              >
                <View style={styles.quickActionIcon}>
                  <Ionicons name="add-circle" size={24} color="#4CAF50" />
                </View>
                <Text style={styles.quickActionText}>Create Room</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={handleJoinRoom}
              >
                <View style={styles.quickActionIcon}>
                  <Ionicons name="enter" size={24} color="#2196F3" />
                </View>
                <Text style={styles.quickActionText}>Join Room</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={handleCustomize}
              >
                <View style={styles.quickActionIcon}>
                  <Ionicons name="settings" size={24} color="#9C27B0" />
                </View>
                <Text style={styles.quickActionText}>Customize</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Live Events</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Entertainment</Text>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  
  // Background
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 100,
  },
  circle1: {
    width: 120,
    height: 120,
    top: screenHeight * 0.1,
    left: -40,
  },
  circle2: {
    width: 80,
    height: 80,
    top: screenHeight * 0.3,
    right: -20,
  },
  circle3: {
    width: 60,
    height: 60,
    bottom: screenHeight * 0.2,
    left: screenWidth * 0.2,
  },
  
  // Scroll content
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  
  // Header section
  headerSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  
  // Featured section
  featuredSection: {
    marginVertical: 30,
  },
  featuredCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    padding: 24,
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  artistImageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  artistImage: {
    width: screenWidth * 0.65,
    height: screenWidth * 0.4,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  liveIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4757',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#FF4757',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginRight: 6,
  },
  liveText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  artistInfo: {
    alignItems: 'center',
  },
  artistName: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  artistDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  
  // Actions section
  actionsSection: {
    marginVertical: 20,
    gap: 20,
  },
  primaryActionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  secondaryActionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: 4,
  },
  actionGradient: {
    padding: 24,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  secondaryActionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  secondaryActionSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  
  // Quick Actions
  quickActionsContainer: {
    marginTop: 20,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  quickActionIcon: {
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  
  // Stats section
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 10,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 20,
    borderRadius: 16,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontWeight: '600',
  },
}); 
