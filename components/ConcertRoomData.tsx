import Images from '../constants/Images';
import ConcertData, { ConcertDataItem } from './ConcertData';

export interface ConcertRoom {
  id: string;
  info: ConcertDataItem;
  title: string;
  data: RoomData[];
  img: any;
  createdAt?: Date;
  isActive?: boolean;
}

export interface RoomData {
  id: string;
  name: string;
  pin: string;
  isActive: boolean;
  participantCount: number;
  createdAt: Date;
  lastActivity?: Date;
}

// Sample room data with more realistic structure
const createRoom = (
  id: string,
  name: string,
  pin: string,
  participantCount: number = 0,
  isActive: boolean = true
): RoomData => ({
  id,
  name,
  pin,
  isActive,
  participantCount,
  createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within last week
  lastActivity: isActive ? new Date(Date.now() - Math.random() * 2 * 60 * 60 * 1000) : undefined, // Random activity within 2 hours if active
});

const ConcertRoomData: ConcertRoom[] = [
  {
    id: 'room-section-1',
    info: ConcertData[0], // Nicki Minaj
    title: ConcertData[0].name,
    data: [
      createRoom('room-1-1', 'Lit Friyay Room', '1234', 12, true),
      createRoom('room-1-2', "Lindsay's Room", '5678', 8, true),
      createRoom('room-1-3', 'Barbz Unite 💕', '9101', 24, true),
    ],
    img: Images.nicki,
    createdAt: new Date('2024-12-01'),
    isActive: true,
  },
  {
    id: 'room-section-2',
    info: ConcertData[10], // Frank Ocean
    title: ConcertData[10].name,
    data: [
      createRoom('room-2-1', 'Blonde Vibes', '1121', 15, true),
      createRoom('room-2-2', 'Ocean Gang 🌊', '3141', 6, true),
      createRoom('room-2-3', 'Late Night Listening', '5161', 3, false),
    ],
    img: Images.frank,
    createdAt: new Date('2024-11-28'),
    isActive: true,
  },
  {
    id: 'room-section-3',
    info: ConcertData[2], // Taylor Swift
    title: ConcertData[2].name,
    data: [
      createRoom('room-3-1', 'Swifties Paradise', '7181', 31, true),
      createRoom('room-3-2', 'Folklore Session', '9202', 18, true),
    ],
    img: Images.flowerprofile,
    createdAt: new Date('2024-11-25'),
    isActive: true,
  },
];

// Helper functions for room management
export const getRoomById = (roomId: string): RoomData | undefined => {
  for (const section of ConcertRoomData) {
    const room = section.data.find(room => room.id === roomId);
    if (room) return room;
  }
  return undefined;
};

export const getTotalRoomCount = (): number => {
  return ConcertRoomData.reduce((total, section) => total + section.data.length, 0);
};

export const getActiveRoomCount = (): number => {
  return ConcertRoomData.reduce((total, section) => {
    return total + section.data.filter(room => room.isActive).length;
  }, 0);
};

export const getTotalParticipantCount = (): number => {
  return ConcertRoomData.reduce((total, section) => {
    return total + section.data.reduce((sectionTotal, room) => {
      return sectionTotal + (room.isActive ? room.participantCount : 0);
    }, 0);
  }, 0);
};

// Function to add a new room to a concert section
export const addRoomToSection = (sectionId: string, roomName: string): boolean => {
  const section = ConcertRoomData.find(s => s.id === sectionId);
  if (!section) return false;

  const newRoom = createRoom(
    `room-${sectionId}-${Date.now()}`,
    roomName,
    Math.floor(Math.random() * 9000 + 1000).toString(), // Random 4-digit pin
    0,
    true
  );

  section.data.push(newRoom);
  return true;
};

// Function to update room status
export const updateRoomStatus = (roomId: string, isActive: boolean): boolean => {
  const room = getRoomById(roomId);
  if (!room) return false;

  room.isActive = isActive;
  if (!isActive) {
    room.participantCount = 0;
  }
  return true;
};

export default ConcertRoomData;