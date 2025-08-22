import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
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

import ConcertRoomData, {
  getActiveRoomCount,
  getTotalParticipantCount,
  getTotalRoomCount
} from '../../components/ConcertRoomData';
import FullHeader from '../../components/FullHeader';
import OnShare from '../../components/ShareFeature';
import Images from '../../constants/Images';

const { width: screenWidth } = Dimensions.get('window');

interface MyRoomsScreenProps {
  navigation?: any;
}

export default function MyRoomsScreen({ navigation }: MyRoomsScreenProps) {
  const insets = useSafeAreaInsets();
  const [expandedSections, setExpandedSections] = useState<number[]>([0, 1]); // Start with sections expanded

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleJoinRoom = (roomId: string, roomName: string, sectionInfo: any) => {
    // Use router if navigation is not available
    if (navigation) {
      navigation.navigate('Join Room', { 
        roomId,
        roomName, 
        sectionStuff: sectionInfo 
      });
    } else {
      // Fallback to router - adjust the path to match your actual route structure
      router.push('/screens/joinRoomScreen' as any);
    }
  };

  const handleCustomizeRoom = () => {
    if (navigation) {
      navigation.navigate('Customize Room');
    } else {
      // Adjust the path to match your actual route structure
      router.push('/screens/CustomizeScreen' as any);
    }
  };

  const handleAddRoom = () => {
    if (navigation) {
      navigation.navigate('exploreConcertsScreen');
    } else {
      router.push('/screens/exploreConcertsScreen');
    }
  };

  const handleShare = async (roomName: string, pin: string, concertInfo?: any) => {
    try {
      // Use OnShare directly since shareRoom isn't exported from ConcertRoomData
      await OnShare(
        {
          name: roomName,
          pass: pin,
          artistName: concertInfo?.artist || concertInfo?.name,
          concertDate: concertInfo?.date,
          concertTime: concertInfo?.time,
          genre: concertInfo?.genre,
        },
        { shareType: 'room' }
      );
    } catch (error) {
      Alert.alert('Share Error', 'Unable to share room details');
    }
  };

  const goBack = () => {
    if (navigation) {
      navigation.popToTop();
    } else {
      router.back();
    }
  };

  // Helper function to format date
  const formatDate = (date: Date | undefined): string => {
    if (!date) return 'No date set';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Helper function to format participant count
  const formatParticipantCount = (count: number): string => {
    if (count === 0) return 'No participants';
    if (count === 1) return '1 participant';
    return `${count} participants`;
  };

  const totalRooms = getTotalRoomCount();
  const activeRooms = getActiveRoomCount();
  const totalParticipants = getTotalParticipantCount();

  return (
    <SafeAreaView style={styles.container}>
      <FullHeader text="My Rooms" toDo={goBack} />

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Profile Header Section */}
        <View style={styles.profileSection}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.profileGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.profileContent}>
              <View style={styles.avatarContainer}>
                <Image source={Images.flowerprofile} style={styles.avatar} />
                <View style={styles.onlineIndicator} />
              </View>
              <Text style={styles.welcomeText}>Welcome back!</Text>
              <Text style={styles.roomCountText}>
                {totalRooms} Total Rooms • {activeRooms} Active • {totalParticipants} Online
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={handleAddRoom}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name="add-circle" size={24} color="#FF8040" />
              </View>
              <Text style={styles.quickActionText}>Create Room</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => router.push('/(tabs)' as any)}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name="search" size={24} color="#3366FF" />
              </View>
              <Text style={styles.quickActionText}>Explore</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={handleCustomizeRoom}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name="settings" size={24} color="#9b59b6" />
              </View>
              <Text style={styles.quickActionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Room Sections */}
        <View style={styles.roomsSection}>
          <Text style={styles.sectionTitle}>Your Concert Rooms</Text>
          
          {ConcertRoomData.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="musical-notes-outline" size={64} color="#ccc" />
              <Text style={styles.emptyStateTitle}>No rooms yet</Text>
              <Text style={styles.emptyStateText}>
                Create your first room to start enjoying concerts with friends
              </Text>
              <TouchableOpacity 
                style={styles.emptyStateButton}
                onPress={handleAddRoom}
              >
                <Text style={styles.emptyStateButtonText}>Create Your First Room</Text>
              </TouchableOpacity>
            </View>
          ) : (
            ConcertRoomData.map((section, sectionIndex) => (
              <View key={section.id} style={styles.concertSection}>
                <TouchableOpacity 
                  style={styles.concertHeader}
                  onPress={() => toggleSection(sectionIndex)}
                >
                  <View style={styles.concertHeaderLeft}>
                    <Image source={section.img} style={styles.concertImage} />
                    <View style={styles.concertHeaderText}>
                      <Text style={styles.artistName}>{section.title}</Text>
                      <Text style={styles.concertDate}>
                        {formatDate(section.createdAt)}
                      </Text>
                      <Text style={styles.roomCount}>
                        {section.data.length} room{section.data.length !== 1 ? 's' : ''}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.sectionStatusContainer}>
                    {section.isActive && (
                      <View style={styles.activeIndicator}>
                        <Text style={styles.activeText}>Active</Text>
                      </View>
                    )}
                    <Ionicons 
                      name={expandedSections.includes(sectionIndex) ? "chevron-up" : "chevron-down"} 
                      size={24} 
                      color="#666" 
                    />
                  </View>
                </TouchableOpacity>

                {expandedSections.includes(sectionIndex) && (
                  <View style={styles.roomsList}>
                    {section.data.map((room, roomIndex) => (
                      <View key={room.id} style={styles.roomCard}>
                        <TouchableOpacity 
                          style={styles.roomMainContent}
                          onPress={() => handleJoinRoom(room.id, room.name, section.info)}
                        >
                          <View style={[
                            styles.roomIcon, 
                            { backgroundColor: room.isActive ? '#e8f5e8' : '#f5f5f5' }
                          ]}>
                            <Ionicons 
                              name="musical-note" 
                              size={20} 
                              color={room.isActive ? "#4CAF50" : "#999"} 
                            />
                          </View>
                          <View style={styles.roomDetails}>
                            <Text style={styles.roomName}>{room.name}</Text>
                            <Text style={[
                              styles.roomStatus,
                              { color: room.isActive ? '#4CAF50' : '#999' }
                            ]}>
                              {room.isActive ? 'Active' : 'Inactive'} • PIN: {room.pin}
                            </Text>
                            <Text style={styles.roomParticipants}>
                              {formatParticipantCount(room.participantCount)}
                            </Text>
                            {room.lastActivity && (
                              <Text style={styles.roomLastActivity}>
                                Last active: {formatDate(room.lastActivity)}
                              </Text>
                            )}
                          </View>
                          <View style={styles.joinIndicator}>
                            <Ionicons 
                              name="play-circle" 
                              size={24} 
                              color={room.isActive ? "#4CAF50" : "#ccc"} 
                            />
                          </View>
                        </TouchableOpacity>

                        <View style={styles.roomActions}>
                          <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => handleShare(room.name, room.pin, section.info)}
                          >
                            <Ionicons name="share-outline" size={20} color="#3366FF" />
                            <Text style={styles.actionButtonText}>Share</Text>
                          </TouchableOpacity>
                          
                          <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleCustomizeRoom}
                          >
                            <Ionicons name="settings-outline" size={20} color="#9b59b6" />
                            <Text style={styles.actionButtonText}>Settings</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))
          )}
        </View>

        {/* Bottom CTA Section */}
        {ConcertRoomData.length > 0 && (
          <View style={styles.bottomCTASection}>
            <LinearGradient
              colors={['#FF6B6B', '#FF8E53']}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <TouchableOpacity 
                style={styles.ctaContent}
                onPress={handleAddRoom}
              >
                <Ionicons name="add-circle" size={24} color="white" />
                <Text style={styles.ctaText}>Create New Room</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
  },

  // Profile Section
  profileSection: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 25,
  },
  profileGradient: {
    borderRadius: 20,
    padding: 25,
  },
  profileContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  roomCountText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },

  // Quick Actions
  quickActionsSection: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },

  // Rooms Section
  roomsSection: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  concertSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  concertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  concertHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  concertImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  concertHeaderText: {
    flex: 1,
  },
  artistName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  concertDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  roomCount: {
    fontSize: 12,
    color: '#999',
  },
  sectionStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  activeIndicator: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '600',
  },

  // Rooms List
  roomsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  roomCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },
  roomMainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  roomIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  roomDetails: {
    flex: 1,
  },
  roomName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  roomStatus: {
    fontSize: 12,
    marginBottom: 2,
  },
  roomParticipants: {
    fontSize: 11,
    color: '#666',
    marginBottom: 1,
  },
  roomLastActivity: {
    fontSize: 10,
    color: '#999',
  },
  joinIndicator: {
    marginLeft: 10,
  },
  roomActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 16,
    marginTop: 10,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 15,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  emptyStateButton: {
    backgroundColor: '#FF8040',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Bottom CTA
  bottomCTASection: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  ctaGradient: {
    borderRadius: 16,
    padding: 18,
  },
  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 12,
  },
}); 
