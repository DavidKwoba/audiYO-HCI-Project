// app/_layout.tsx - Root Layout with Stack Navigation
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_right',
        }}
      >
        {/* Tab Navigator - Main Entry Point */}
        <Stack.Screen 
          name="(tabs)" 
          options={{
            title: 'audiYO',
          }}
        />
        
        {/* Concert & Room Screens - These are now properly separated */}
        <Stack.Screen 
          name="screens/exploreConcertsScreen" 
          options={{
            title: 'Explore Concerts',
            presentation: 'card',
          }}
        />
        
        <Stack.Screen 
          name="screens/myRoomsScreen" 
          options={{
            title: 'My Rooms',
            presentation: 'card',
          }}
        />
        
        <Stack.Screen 
          name="screens/createRoomPinScreen" 
          options={{
            title: 'Create Room',
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        
        <Stack.Screen 
          name="screens/joinExistingRoomScreen" 
          options={{
            title: 'Join Room',
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        
        <Stack.Screen 
          name="screens/joinRoomScreen" 
          options={{
            title: 'Room Details',
            presentation: 'card',
          }}
        />
        
        <Stack.Screen 
          name="screens/preConcertRoomScreen" 
          options={{
            title: 'Pre-Concert Room',
            presentation: 'card',
          }}
        />
        
        <Stack.Screen 
          name="screens/performanceRoomScreen" 
          options={{
            title: 'Live Concert',
            presentation: 'fullScreenModal',
            gestureEnabled: false, // Prevent accidental swipe during performance
          }}
        />
        
        <Stack.Screen 
          name="screens/customizeScreen" 
          options={{
            title: 'Customize Room',
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </>
  );
} 
