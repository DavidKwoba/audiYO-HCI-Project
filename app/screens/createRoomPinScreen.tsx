import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// eslint-disable-next-line import/no-named-as-default
import StandardButton from '../../components/ButtonTemplate';
import OnShare from '../../components/ShareFeature';
import { Colors } from '../../constants/Colors';
import Images from '../../constants/Images';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface CreateRoomPinScreenProps {
  navigation?: any;
}

export default function CreateRoomPinScreen({ navigation }: CreateRoomPinScreenProps) {
  const insets = useSafeAreaInsets();
  const [roomName, setRoomName] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
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

  const handleDone = async () => {
    if (!roomName.trim()) {
      Alert.alert('Missing Room Name', 'Please enter a room name to continue.');
      return;
    }

    if (!pin.trim()) {
      Alert.alert('Missing PIN', 'Please enter a PIN to secure your room.');
      return;
    }

    if (pin.length < 4) {
      Alert.alert('PIN Too Short', 'Please enter at least 4 digits for your PIN.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate room creation delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Optional: Share room info
      await OnShare({ 
        name: roomName.trim(), 
        pass: pin.trim() 
      }, {
        shareType: 'room',
        includeAppLink: true
      });

      // Navigate back
      if (navigation) {
        navigation.navigate('My Rooms');
      } else {
        router.push('/(tabs)' as any);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create room. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      router.back();
    }
  };

  const generateRandomPin = () => {
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    setPin(randomPin);
    
    // Animate the pin input
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const validateRoomNameNew = (text: string) => {
  console.log('validateRoomName input:', text); // Debug log - remove later
  
  // More permissive approach - allow letters, numbers, spaces, apostrophes, hyphens
  const cleaned = text.replace(/[^a-zA-Z0-9\s'\-]/g, '');
  
  // Limit to 30 characters
  const limited = cleaned.length > 30 ? cleaned.substring(0, 30) : cleaned;
  
  console.log('validateRoomName output:', limited); // Debug log - remove later
  setRoomName(limited);
}; 
const validateRoomName = (text: string) => {
  // Just limit length, allow most characters
  if (text.length <= 30) {
    setRoomName(text);
  } else {
    setRoomName(text.substring(0, 30));
  }
};


  const validatePinNew = (text: string) => {
  console.log('validatePin input:', text); // Debug log - remove later
  
  // Only allow numbers and limit to 6 digits
  const cleaned = text.replace(/[^0-9]/g, '');
  const limited = cleaned.length > 6 ? cleaned.substring(0, 6) : cleaned;
  
  console.log('validatePin output:', limited); // Debug log - remove later
  setPin(limited);
}; 

const validatePin = (text: string) => {
  // Only numbers, max 6 digits
  const numbersOnly = text.replace(/\D/g, '');
  if (numbersOnly.length <= 6) {
    setPin(numbersOnly);
  } else {
    setPin(numbersOnly.substring(0, 6));
  }
};

  return (
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
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Create Room</Text>
        
        <View style={styles.headerRight} />
      </Animated.View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Card */}
          <Animated.View 
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim }
                ]
              }
            ]}
          >
            {/* Profile Section */}
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                <Image source={Images.flowerprofile} style={styles.avatar} />
                <LinearGradient
                  colors={['rgba(255,255,255,0.3)', 'transparent']}
                  style={styles.avatarOverlay}
                />
              </View>
              <Text style={styles.welcomeText}>Set up your room</Text>
              <Text style={styles.subText}>
                Create a space for you and your friends to enjoy concerts together
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              {/* Room Name Input */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Room Name</Text>
                <View style={[
                  styles.inputContainer,
                  focusedInput === 'roomName' && styles.inputContainerFocused
                ]}>
                  <Ionicons 
                    name="home-outline" 
                    size={20} 
                    color={focusedInput === 'roomName' ? Colors.ctaOrange : '#999'} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., Taylor's Concert Room"
                    placeholderTextColor="#999"
                    value={roomName}
                    onChangeText={validateRoomName}
                    onFocus={() => setFocusedInput('roomName')}
                    onBlur={() => setFocusedInput(null)}
                    autoCapitalize="words"
                  />
                  {roomName.length > 0 && (
                    <TouchableOpacity 
                      onPress={() => setRoomName('')}
                      style={styles.clearButton}
                    >
                      <Ionicons name="close-circle" size={20} color="#ccc" />
                    </TouchableOpacity>
                  )}
                </View>
                <Text style={styles.characterCount}>
                  {roomName.length}/30 characters
                </Text>
              </View>

              {/* PIN Input */}
              <View style={styles.inputSection}>
                <View style={styles.pinLabelRow}>
                  <Text style={styles.inputLabel}>Room PIN</Text>
                  <TouchableOpacity 
                    style={styles.generateButton}
                    onPress={generateRandomPin}
                  >
                    <Ionicons name="refresh" size={16} color={Colors.ctaOrange} />
                    <Text style={styles.generateButtonText}>Generate</Text>
                  </TouchableOpacity>
                </View>
                <View style={[
                  styles.inputContainer,
                  focusedInput === 'pin' && styles.inputContainerFocused
                ]}>
                  <Ionicons 
                    name="lock-closed-outline" 
                    size={20} 
                    color={focusedInput === 'pin' ? Colors.ctaOrange : '#999'} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter 4-6 digits"
                    placeholderTextColor="#999"
                    value={pin}
                    onChangeText={validatePin}
                    onFocus={() => setFocusedInput('pin')}
                    onBlur={() => setFocusedInput(null)}
                    keyboardType="numeric"
                    secureTextEntry={false} // Show PIN for better UX
                  />
                  {pin.length >= 4 && (
                    <View style={styles.validIndicator}>
                      <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                    </View>
                  )}
                </View>
                <Text style={styles.pinHint}>
                  {pin.length === 0 ? 'Your friends will need this to join' : 
                   pin.length < 4 ? `${4 - pin.length} more digits needed` : 
                   'PIN looks good! ✨'}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionSection}>
              <StandardButton
                text={isLoading ? "Creating Room..." : "Create & Share Room"}
                onPress={handleDone}
                width={screenWidth - 80}
                height={56}
                bgColor={Colors.ctaOrange}
                textColor="#fff"
                disabled={isLoading || !roomName.trim() || pin.length < 4}
              />
              
              <TouchableOpacity 
                style={styles.skipButton}
                onPress={() => {
                  if (navigation) {
                    navigation.navigate('My Rooms');
                  } else {
                    router.push('/(tabs)' as any);
                  }
                }}
              >
                <Text style={styles.skipButtonText}>Skip for now</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Tips Section */}
          <Animated.View style={[styles.tipsSection, { opacity: fadeAnim }]}>
            <View style={styles.tipItem}>
              <Ionicons name="bulb-outline" size={16} color={Colors.ctaOrange} />
              <Text style={styles.tipText}>
                Choose a memorable name that describes your concert experience
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="shield-checkmark-outline" size={16} color={Colors.ctaOrange} />
              <Text style={styles.tipText}>
                Keep your PIN secure - only share it with trusted friends
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 20,
  },
  
  // Profile Section
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'white',
  },
  avatarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },

  // Form Section
  formSection: {
    marginBottom: 30,
  },
  inputSection: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  pinLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: `${Colors.ctaOrange}15`,
    borderRadius: 16,
  },
  generateButtonText: {
    fontSize: 12,
    color: Colors.ctaOrange,
    fontWeight: '600',
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputContainerFocused: {
    backgroundColor: 'white',
    borderColor: Colors.ctaOrange,
    shadowColor: Colors.ctaOrange,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  clearButton: {
    padding: 4,
  },
  validIndicator: {
    marginLeft: 8,
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
    textAlign: 'right',
  },
  pinHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    fontStyle: 'italic',
  },

  // Action Section
  actionSection: {
    alignItems: 'center',
  },
  skipButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },

  // Tips Section
  tipsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginLeft: 12,
  },
});
