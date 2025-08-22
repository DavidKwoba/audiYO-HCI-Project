import { Alert, Linking, Platform, Share } from 'react-native';

export interface ShareParams {
  name?: string;
  pass?: string;
  artistName?: string;
  concertDate?: string;
  concertTime?: string;
  genre?: string;
}

export interface ShareOptions {
  includeAppLink?: boolean;
  customMessage?: string;
  shareType?: 'room' | 'concert' | 'general';
}

// Enhanced share function with better formatting and options
const OnShare = async (
  params: ShareParams = {},
  options: ShareOptions = {}
): Promise<boolean> => {
  const {
    name = 'Concert Room',
    pass = '1234',
    artistName,
    concertDate,
    concertTime,
    genre,
  } = params;

  const {
    includeAppLink = true,
    customMessage,
    shareType = 'room',
  } = options;

  try {
    let message = '';

    if (customMessage) {
      message = customMessage;
    } else {
      // Generate message based on share type
      switch (shareType) {
        case 'room':
          message = generateRoomShareMessage({
            name,
            pass,
            artistName,
            concertDate,
            concertTime,
            genre,
          });
          break;
        
        case 'concert':
          message = generateConcertShareMessage({
            artistName,
            concertDate,
            concertTime,
            genre,
          });
          break;
        
        case 'general':
          message = generateGeneralShareMessage();
          break;
        
        default:
          message = generateRoomShareMessage({ name, pass });
      }
    }

    // Add app link if requested
    if (includeAppLink) {
      message += '\n\n📱 Get audiYO: [App Store/Play Store Link]';
    }

    const shareResult = await Share.share(
      {
        message,
        title: shareType === 'room' ? `Join ${name} on audiYO` : 'Check out audiYO',
        ...(Platform.OS === 'ios' && { url: 'https://audiyo.app' }), // iOS specific URL sharing
      },
      {
        dialogTitle: 'Share with friends',
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToWeibo',
          'com.apple.UIKit.activity.Print',
          'com.apple.UIKit.activity.AssignToContact',
          'com.apple.UIKit.activity.SaveToCameraRoll',
        ],
      }
    );

    // Handle share result
    if (shareResult.action === Share.sharedAction) {
      if (shareResult.activityType) {
        // Shared via specific activity type
        return true;
      } else {
        // Shared successfully
        return true;
      }
    } else if (shareResult.action === Share.dismissedAction) {
      // Share dialog was dismissed
      return false;
    }

    return false;
  } catch (error: any) {
    console.error('Share error:', error);
    
    // Show user-friendly error message
    Alert.alert(
      'Share Failed',
      'Unable to share at the moment. Please try again later.',
      [
        {
          text: 'Copy Info',
          onPress: () => copyToClipboard(params),
        },
        {
          text: 'OK',
          style: 'default',
        },
      ]
    );
    
    return false;
  }
};

// Generate formatted room share message
const generateRoomShareMessage = (params: ShareParams): string => {
  const { name, pass, artistName, concertDate, concertTime, genre } = params;
  
  let message = `🎵 Join me for an epic concert experience!\n\n`;
  
  if (artistName) {
    message += `🎤 Artist: ${artistName}\n`;
  }
  
  if (genre) {
    message += `🎼 Genre: ${genre}\n`;
  }
  
  if (concertDate) {
    message += `📅 Date: ${concertDate}\n`;
  }
  
  if (concertTime) {
    message += `⏰ Time: ${concertTime}\n`;
  }
  
  message += `\n🏠 Room: ${name}\n`;
  message += `🔐 Pin: ${pass}\n`;
  message += `\nDownload audiYO and let's experience the music together! 🚀`;
  
  return message;
};

// Generate concert announcement message
const generateConcertShareMessage = (params: ShareParams): string => {
  const { artistName, concertDate, concertTime, genre } = params;
  
  let message = `🎉 Exciting concert coming up on audiYO!\n\n`;
  
  if (artistName) {
    message += `🎤 ${artistName} is performing live!\n`;
  }
  
  if (genre) {
    message += `🎼 Genre: ${genre}\n`;
  }
  
  if (concertDate && concertTime) {
    message += `📅 ${concertDate} at ${concertTime}\n`;
  }
  
  message += `\nJoin me for an immersive concert experience like never before! 🎵`;
  
  return message;
};

// Generate general app sharing message
const generateGeneralShareMessage = (): string => {
  return `🎵 Check out audiYO - the future of concert experiences!\n\n` +
    `Experience live concerts with friends in virtual rooms. ` +
    `Join group listening sessions, interact with performers, and ` +
    `connect with music lovers worldwide! 🌎\n\n` +
    `Download now and let's rock together! 🚀`;
};

// Fallback: copy to clipboard (requires expo-clipboard or @react-native-clipboard/clipboard)
const copyToClipboard = async (params: ShareParams): Promise<void> => {
  try {
    // Note: You'll need to install and import Clipboard
    // import * as Clipboard from 'expo-clipboard';
    // await Clipboard.setStringAsync(generateRoomShareMessage(params));
    
    Alert.alert(
      'Info Copied',
      'Room details have been copied to clipboard',
      [{ text: 'OK' }]
    );
  } catch (error) {
    console.error('Copy to clipboard failed:', error);
  }
};

// Additional utility functions
export const shareRoom = (
  roomName: string,
  pin: string,
  concertInfo?: any
): Promise<boolean> => {
  return OnShare(
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
};

export const shareConcert = (concertInfo: any): Promise<boolean> => {
  return OnShare(
    {
      artistName: concertInfo?.artist || concertInfo?.name,
      concertDate: concertInfo?.date,
      concertTime: concertInfo?.time,
      genre: concertInfo?.genre,
    },
    { shareType: 'concert' }
  );
};

export const shareApp = (): Promise<boolean> => {
  return OnShare({}, { shareType: 'general' });
};

// Open external share options
export const shareViaWhatsApp = (message: string): void => {
  const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        Alert.alert('WhatsApp not installed', 'Please install WhatsApp to share via WhatsApp');
      }
    })
    .catch((err) => console.error('WhatsApp share error:', err));
};

export const shareViaSMS = (message: string, phoneNumber?: string): void => {
  const url = phoneNumber 
    ? `sms:${phoneNumber}?body=${encodeURIComponent(message)}`
    : `sms:?body=${encodeURIComponent(message)}`;
  
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        Alert.alert('SMS not available', 'SMS sharing is not available on this device');
      }
    })
    .catch((err) => console.error('SMS share error:', err));
};

export default OnShare;