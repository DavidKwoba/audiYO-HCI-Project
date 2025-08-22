# audiYO

A React Native app that brings people together for live concert experiences. Create private rooms, invite friends, and enjoy synchronized music streaming with real-time chat and interactions.

## What it does

audiYO lets you watch concerts with friends even when you're apart. You can create your own concert rooms, customize them however you want, and invite people to join. Everyone gets the same high-quality stream, and you can chat and react together during the show.

I built this because I wanted to provide a teleconferencing app alternative that was different from traditional applications, and as a way of combating zoom fatigue during the pandemic. 

## Features

**Room Management**
- Create private concert rooms with PIN codes
- Customize themes, add mini-games, set music preferences  
- Host controls for managing participants
- Share room links with friends

**Concert Experience**
- Synchronized video/audio streaming
- Real-time chat during performances
- Emoji reactions and live interactions
- Full-screen performance mode
- Pre-concert lobby with activities

**Social Features**
- Participant video feeds (like a video call)
- Mute/unmute controls
- Host badges and speaking indicators
- Room statistics and participant counts

## Getting started

You'll need Node.js, React Native CLI, and either Xcode (iOS) or Android Studio.

```bash
git clone https://github.com/yourusername/audiyo.git
cd audiyo
npm install

# iOS only
cd ios && pod install && cd ..

# Start it up
npx expo start
```

### Firebase setup

The app uses Firebase for authentication and data. You'll need to:

1. Create a Firebase project at console.firebase.google.com
2. Enable Email/Password authentication  
3. Set up a Firestore database
4. Drop your config into `config/firebaseConfig.js`

```javascript
// config/firebaseConfig.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Your Firebase config goes here
};

export const app = initializeApp(firebaseConfig);
```

## How it's built

**Frontend:** React Native with Expo Router for navigation. Used TypeScript because debugging React Native is painful enough already.

**UI:** Custom components with lots of gradients and animations. The design is inspired by modern streaming apps but optimized for group experiences.

**Video:** Expo AV handles the streaming. Had to work around some limitations with synchronized playback across devices.

## Project structure

```
app/
├── (tabs)/                 # Main tab screens
├── screens/               # All the different room screens
│   ├── createRoomPinScreen.tsx
│   ├── performanceRoomScreen.tsx
│   ├── preConcertRoomScreen.tsx
│   └── ...
components/                # Reusable stuff
constants/                # Colors, images, etc.
config/                   # Firebase config
```

## Key screens explained

- **Home:** Landing page with quick actions and featured content
- **Explore:** Browse available concerts (currently uses mock data)  
- **Create Room:** Set up a new room with custom PIN and settings
- **My Rooms:** Manage your existing rooms and see stats
- **Pre-Concert:** Social lobby before the show starts
- **Performance:** The main event - full-screen concert with participant videos

## Current limitations

This is a prototype, so there are some things that aren't fully implemented:

- Concert data is mostly hardcoded/mocked
- No real streaming integration yet (uses sample videos)
- Some animations could be smoother
- Needs proper error handling in a few places

## What's next

Planning to add:
- Integration with actual streaming platforms
- Better audio processing and sync
- More customization options
- Push notifications for room invites
- Analytics for room hosts

## Contributing

Feel free to open issues or submit PRs. The code could definitely use some cleanup in places, and I'm always looking for feedback on the UX.

## License

MIT License - do whatever you want with this code.

---

The initial research, development and prototyping happened over 6 weeks, while the coded High Fidelity prototype was completed over 3 weeks as part of CS147: Intro to HCI at Stanford.  Always happy to chat about React Native development or tech and design!
