import { ResizeMode, Video } from 'expo-av';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import FullHeader from '../../components/FullHeader';
import Gradient from '../../components/Gradient';
import Images from '../../constants/Images';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Mock participant data - replace with real data
const participants = [
  { id: 1, name: 'John Doe', isHost: false },
  { id: 2, name: 'Jane Smith', isHost: false },
  { id: 3, name: 'Mike Johnson', isHost: true },
  { id: 4, name: 'Sarah Wilson', isHost: false },
  { id: 5, name: 'Alex Chen', isHost: false },
  { id: 6, name: 'Emma Davis', isHost: false }
];

export default function PerformanceRoomScreen() {
  const router = useRouter();
  const image = Images.performanceBg;
  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const controlRef = useRef<Video>(null);
  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const controlsTimeout = useRef<any>(null);

  // Auto-hide controls after 3 seconds
  useEffect(() => {
    if (showControls) {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      
      controlsTimeout.current = setTimeout(() => {
        hideControls();
      }, 3000);
    }

    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, [showControls]);

  const hideControls = () => {
    Animated.timing(controlsOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowControls(false));
  };

  const showControlsHandler = () => {
    setShowControls(true);
    Animated.timing(controlsOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const togglePlaying = () => setPlaying(prev => !prev);
  const muteVideo = () => setMute(prev => !prev);
  
  const seekBackAndForth = (control: 'forward' | 'back') => {
    controlRef.current?.getStatusAsync().then(status => {
      if (status.isLoaded) {
        const currentTime = status.positionMillis / 1000;
        const seekTime = control === 'forward' ? currentTime + 15 : currentTime - 15;
        controlRef.current?.setPositionAsync(seekTime * 1000);
      }
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  const ControlButton = ({ 
    iconName, 
    onPress, 
    style = {} 
  }: { 
    iconName: string; 
    onPress: () => void;
    style?: object;
  }) => (
    <TouchableOpacity 
      style={[styles.controlButton, style]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon name={iconName} size={28} color="#fff" />
    </TouchableOpacity>
  );

  const ParticipantVideo = ({ participant, index }: { participant: any, index: number }) => (
    <View key={participant.id} style={styles.participantContainer}>
      <Video
        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        volume={0.3}
        isMuted={index !== 2} // Only unmute the host
        rate={1.0}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        style={styles.smallVideo}
      />
      <View style={styles.participantNameContainer}>
        <Text style={styles.participantName} numberOfLines={1}>
          {participant.name}
        </Text>
        {participant.isHost && (
          <View style={styles.hostBadge}>
            <Text style={styles.hostText}>HOST</Text>
          </View>
        )}
      </View>
      {/* Mute indicator */}
      {index !== 2 && (
        <View style={styles.muteIndicator}>
          <Icon name="mic-off" size={16} color="#fff" />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Gradient />
      
      {!isFullscreen && (
        <FullHeader text="Performance Room" toDo={() => router.back()} />
      )}
      
      <View style={[styles.mainVideoContainer, isFullscreen && styles.fullscreenContainer]}>
        <TouchableOpacity 
          style={styles.videoTouchArea} 
          onPress={showControlsHandler}
          activeOpacity={1}
        >
          <Video
            ref={controlRef}
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            volume={1.0}
            isMuted={isMute}
            rate={1.0}
            resizeMode={ResizeMode.COVER}
            shouldPlay={playing}
            isLooping
            style={styles.mainVideo}
          />
          
          {/* Video Controls Overlay */}
          {showControls && (
            <Animated.View 
              style={[styles.controlsOverlay, { opacity: controlsOpacity }]}
            >
              {/* Top Controls */}
              <View style={styles.topControls}>
                {isFullscreen && (
                  <TouchableOpacity 
                    style={styles.backButtonFullscreen}
                    onPress={() => router.back()}
                  >
                    <Icon name="arrow-back" size={24} color="#fff" />
                  </TouchableOpacity>
                )}
                <Text style={styles.liveIndicator}>🔴 LIVE</Text>
                <TouchableOpacity 
                  style={styles.fullscreenButton}
                  onPress={toggleFullscreen}
                >
                  <Icon 
                    name={isFullscreen ? "fullscreen-exit" : "fullscreen"} 
                    size={24} 
                    color="#fff" 
                  />
                </TouchableOpacity>
              </View>

              {/* Center Controls */}
              <View style={styles.centerControls}>
                <ControlButton 
                  iconName="replay-15" 
                  onPress={() => seekBackAndForth('back')}
                />
                <ControlButton 
                  iconName={playing ? "pause" : "play-arrow"} 
                  onPress={togglePlaying}
                  style={styles.playButton}
                />
                <ControlButton 
                  iconName="forward-15" 
                  onPress={() => seekBackAndForth('forward')}
                />
              </View>

              {/* Bottom Controls */}
              <View style={styles.bottomControls}>
                <ControlButton 
                  iconName={isMute ? "volume-off" : "volume-up"} 
                  onPress={muteVideo}
                />
                <View style={styles.controlsSpacer} />
                <Text style={styles.viewerCount}>👥 247 viewers</Text>
              </View>
            </Animated.View>
          )}
        </TouchableOpacity>
      </View>

      {/* Participants Section */}
      {!isFullscreen && (
        <View style={styles.participantsSection}>
          <ImageBackground source={image} style={styles.participantsBackground}>
            <View style={styles.participantsOverlay}>
              <Text style={styles.sectionTitle}>Participants</Text>
              <View style={styles.participantsContainer}>
                {participants.map((participant, index) => (
                  <ParticipantVideo 
                    key={participant.id} 
                    participant={participant} 
                    index={index} 
                  />
                ))}
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#000'
  },
  mainVideoContainer: { 
    flex: 6,
    position: 'relative'
  },
  fullscreenContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000
  },
  videoTouchArea: {
    flex: 1,
    position: 'relative'
  },
  mainVideo: { 
    width: '100%', 
    height: '100%'
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backButtonFullscreen: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  liveIndicator: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(220,20,60,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    overflow: 'hidden'
  },
  fullscreenButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  controlsSpacer: {
    flex: 1
  },
  viewerCount: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12
  },
  participantsSection: {
    flex: 4,
    minHeight: 200
  },
  participantsBackground: {
    flex: 1,
    justifyContent: 'center'
  },
  participantsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 16
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center'
  },
  participantsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  participantContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 12,
    width: '30%'
  },
  smallVideo: {
    width: screenWidth * 0.22,
    height: screenWidth * 0.22,
    borderRadius: screenWidth * 0.11,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    marginBottom: 8
  },
  participantNameContainer: {
    position: 'absolute',
    bottom: -30,
    alignItems: 'center'
  },
  participantName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    overflow: 'hidden'
  },
  hostBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 2
  },
  hostText: {
    color: '#000',
    fontSize: 8,
    fontWeight: 'bold'
  },
  muteIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(220,20,60,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  }
}); 
