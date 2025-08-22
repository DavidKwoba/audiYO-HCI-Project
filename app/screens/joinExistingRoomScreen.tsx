import { useRouter } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FullHeader from '../../components/FullHeader';
import { app } from '../../config/firebaseConfig';
import { Colors } from '../../constants/Colors';

export default function JoinExistingRoomScreen() {
  const router = useRouter();
  const [roomName, setRoomName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    roomName: '',
    email: '',
    pin: ''
  });

  const auth = getAuth(app);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateInputs = () => {
    const newErrors = {
      roomName: '',
      email: '',
      pin: ''
    };

    if (!roomName.trim()) {
      newErrors.roomName = 'Room name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!pin.trim()) {
      newErrors.pin = 'Secret pin is required';
    } else if (pin.length < 4) {
      newErrors.pin = 'Pin must be at least 4 characters';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const userLogin = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pin);
      console.log('Room joined successfully!', userCredential);
      
      // Clear form
      setRoomName('');
      setEmail('');
      setPin('');
      setErrors({ roomName: '', email: '', pin: '' });
      
      // Navigate to rooms screen
      router.push('/screens/myRoomsScreen');
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = 'Failed to join room. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect pin. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      
      Alert.alert('Join Room Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <FullHeader text="Join Existing Room" toDo={() => router.back()} />
        
        <KeyboardAvoidingView 
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formContainer}>
              <Text style={styles.subtitle}>
                Enter your room details to join an existing concert room
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Room Name</Text>
                <View style={[
                  styles.inputView, 
                  errors.roomName ? styles.inputError : null
                ]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter room name"
                    placeholderTextColor={Colors.textGray}
                    value={roomName}
                    onChangeText={(text) => {
                      setRoomName(text);
                      clearError('roomName');
                    }}
                    autoCapitalize="words"
                  />
                </View>
                {errors.roomName ? (
                  <Text style={styles.errorText}>{errors.roomName}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={[
                  styles.inputView, 
                  errors.email ? styles.inputError : null
                ]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email"
                    placeholderTextColor={Colors.textGray}
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      clearError('email');
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Secret Pin</Text>
                <View style={[
                  styles.inputView, 
                  errors.pin ? styles.inputError : null
                ]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter room pin"
                    placeholderTextColor={Colors.textGray}
                    secureTextEntry
                    value={pin}
                    onChangeText={(text) => {
                      setPin(text);
                      clearError('pin');
                    }}
                    autoCapitalize="none"
                  />
                </View>
                {errors.pin ? (
                  <Text style={styles.errorText}>{errors.pin}</Text>
                ) : null}
              </View>

              <Pressable
                style={[
                  styles.joinButton,
                  isLoading ? styles.joinButtonDisabled : null
                ]}
                onPress={userLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator color="white" size="small" />
                    <Text style={styles.joinButtonText}>Joining...</Text>
                  </View>
                ) : (
                  <Text style={styles.joinButtonText}>Join Room</Text>
                )}
              </Pressable>

              <View style={styles.helpContainer}>
                <Text style={styles.helpText}>
                  Don&apos;t have a room invite? Ask the room host for the room name and pin.
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutralLight,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textGray,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  inputView: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: '#ff4444',
    borderWidth: 1.5,
  },
  textInput: {
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1a1a1a',
  },
  errorText: {
    fontSize: 14,
    color: '#ff4444',
    marginTop: 4,
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: Colors.ctaOrange,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: Colors.ctaOrange,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  joinButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0.1,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  helpContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  helpText: {
    fontSize: 14,
    color: Colors.textGray,
    textAlign: 'center',
    lineHeight: 20,
  },
}); 
