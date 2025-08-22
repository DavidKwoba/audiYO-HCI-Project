import Images from '../constants/Images';

export interface ConcertDataItem {
  id: string;
  name: string;
  date: string;
  time: string;
  joinRoomInfo: string;
  info: string;
  img: any;
  // Additional parsed fields for better data structure
  artist?: string;
  price?: string;
  genre?: string;
  description?: string;
  pin?: string;
}

// Helper function to parse concert info
export const parseConcertInfo = (info: string): Partial<ConcertDataItem> => {
  const lines = info.split('\n').filter(line => line.trim());
  const parsed: { [key: string]: string } = {};
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      parsed[key.toLowerCase()] = value;
    }
  });
  
  return {
    artist: parsed.artist,
    price: parsed.price || 'Free',
    genre: parsed.genre,
    description: parsed.description,
  };
};

const ConcertData: ConcertDataItem[] = [
  {
    id: '1',
    name: 'Nicki Minaj',
    date: 'March 19th 2021',
    time: '12:00 PM PST',
    joinRoomInfo:
      'Price: Free \nGenre: Rap \nDescription: Join Nicki Minaj on her Queen Album Comeback Tour featuring\n certified hits and fan favorites',
    info:
      'Artist: Nicki Minaj\nDate: March 19th 2021\nTime: 12:00 PM PST\nPrice: Free \nGenre: Rap \nDescription: Join Nicki Minaj on her Queen Album Comeback Tour featuring certified hits and fan favorites',
    img: Images.nicki,
    pin: '1234',
  },
  {
    id: '2',
    name: 'Wizkid',
    date: 'March 19th 2021',
    time: '2:00 PM PST',
    joinRoomInfo:
      'Price: Free \nGenre: Afropop \nDescription: Join Wizkid on his Made in Lagos Album Comeback Tour featuring\n certified hits and fan favorites',
    info:
      'Artist: Wizkid\nDate: March 19th 2021\nTime: 2:00 PM PST\nPrice: Free \nGenre: Afropop \nDescription: Join Wizkid on his Made in Lagos Album Comeback Tour featuring certified hits and fan favorites',
    img: Images.frank,
    pin: '5678',
  },
  {
    id: '3',
    name: 'Taylor Swift',
    date: 'March 19th 2021',
    time: '4:30 PM PST',
    joinRoomInfo:
      'Price: Free \nGenre: Alternative \nDescription: Join Taylor Swift on her Folklore + Evermore Album Comeback Tours featuring\n certified hits and fan favorites',
    info:
      'Artist: Taylor Swift\nDate: March 19th 2021\nTime: 4:30 PM PST\nPrice: Free \nGenre: Alternative \nDescription: Join Taylor Swift on her Folklore + Evermore Album Comeback Tours featuring certified hits and fan favorites',
    img: Images.flowerprofile,
    pin: '9101',
  },
  {
    id: '4',
    name: 'Owl City',
    date: 'March 19th 2021',
    time: '7:00 PM PST',
    joinRoomInfo:
      'Price: Free \nGenre: Pop \nDescription: Join Owl City on his Cinematic Album Comeback Tour featuring\n certified hits and fan favorites',
    info:
      'Artist: Owl City\nDate: March 19th 2021\nTime: 7:00 PM PST\nPrice: Free \nGenre: Pop \nDescription: Join Owl City on his Cinematic Album Comeback Tour featuring certified hits and fan favorites',
    img: Images.flowerprofile,
    pin: '1121',
  },
  {
    id: '5',
    name: "Burna Boy",
    date: "March 20th 2021",
    time: "7:00 AM PST",
    joinRoomInfo: "Price: Free \nGenre: Afrobeats \nDescription: Join Burna Boy on his Twice As Tall Album Comeback Tour featuring\n certified hits and fan favorites",
    info: "Artist: Burna Boy\nDate: March 20th 2021\nTime: 7:00 AM PST\nPrice: Free \nGenre: Afrobeats \nDescription: Join Burna Boy on his Twice As Tall Album Comeback Tour featuring certified hits and fan favorites",
    img: Images.flowerprofile,
    pin: '3141',
  },
  {
    id: '6',
    name: 'Harry Styles',
    date: "March 20th 2021",
    time: "10:00 AM PST",
    joinRoomInfo: "Price: Free \nGenre: Pop \nDescription: Join Harry Styles on his Fine Line Album Comeback Tour featuring\n certified hits and fan favorites",
    info: "Artist: Harry Styles\nDate: March 20th 2021\nTime: 10:00 AM PST\nPrice: Free \nGenre: Pop \nDescription: Join Harry Styles on his Fine Line Album Comeback Tour featuring certified hits and fan favorites",
    img: Images.flowerprofile,
    pin: '5161',
  },
  {
    id: '7',
    name: 'SZA',
    date: "March 20th 2021",
    time: "10:00 AM PST",
    joinRoomInfo: "Price: Free \nGenre: R&B \nDescription: Join SZA on her Ctrl Album Comeback Tour featuring\n certified hits and fan favorites",
    info: "Artist: SZA\nDate: March 20th 2021\nTime: 10:00 AM PST\nPrice: Free \nGenre: R&B \nDescription: Join SZA on her Ctrl Album Comeback Tour featuring certified hits and fan favorites",
    img: Images.flowerprofile,
    pin: '7181',
  },
  {
    id: '8',
    name: 'Rihanna',
    date: "March 20th 2021",
    time: "5:00 PM PST",
    joinRoomInfo: "Price: Free \nGenre: Pop \nDescription: Join Rihanna on her Anti Album Comeback Tour featuring\n certified hits and fan favorites",
    info: "Artist: Rihanna\nDate: March 20th 2021\nTime: 5:00 PM PST\nPrice: Free \nGenre: Pop \nDescription: Join Rihanna on her Anti Album Comeback Tour featuring certified hits and fan favorites",
    img: Images.flowerprofile,
    pin: '9202',
  },
  {
    id: '9',
    name: 'Nicki Minaj',
    date: "March 21st 2021",
    time: "9:00 AM PST",
    joinRoomInfo: "Price: Free \nGenre: Afrobeats \nDescription: Join Nicki Minaj on her Run Up live performance featuring\n certified hit remixes and acoustic performances",
    info: "Artist: Nicki Minaj\nDate: March 21st 2021\nTime: 9:00 AM PST\nPrice: Free \nGenre: Afrobeats \nDescription: Join Nicki Minaj on her Run Up live performance featuring certified hit remixes and acoustic performances",
    img: Images.frank,
    pin: '1222',
  },
  {
    id: '10',
    name: 'Conan Gray',
    date: "March 21st 2021",
    time: "2:00 PM PST",
    joinRoomInfo: "Price: Free \nGenre: Pop \nDescription: Join Conan Gray on his Crush Culture Song Release Tour featuring\n certified hit remixes and acoustic performances",
    info: "Artist: Conan Gray\nDate: March 21st 2021\nTime: 2:00 PM PST\nPrice: Free \nGenre: Pop \nDescription: Join Conan Gray on his Crush Culture Song Release Tour featuring certified hit remixes and acoustic performances",
    img: Images.frank,
    pin: '3242',
  },
  {
    id: '11',
    name: 'Frank Ocean',
    date: "March 21st 2021",
    time: "4:00 PM PST",
    joinRoomInfo: "Price: Free \nGenre: Neo Soul \nDescription: Join Frank Ocean on his Blonde Album Comeback Tour featuring\n certified hits and fan favorites",
    info: "Artist: Frank Ocean\nDate: March 21st 2021\nTime: 4:00 PM PST\nPrice: Free \nGenre: Neo Soul \nDescription: Join Frank Ocean on his Blonde Album Comeback Tour featuring certified hits and fan favorites",
    img: Images.frank,
    pin: '5262',
  },
  {
    id: '12',
    name: 'Sam Smith',
    date: "March 21st 2021",
    time: "9:00 PM PST",
    joinRoomInfo: "Price: Free \nGenre: Pop \nDescription: Join Sam Smith on their Love Goes Album Comeback Tour featuring\n certified hits and fan favorites",
    info: "Artist: Sam Smith\nDate: March 21st 2021\nTime: 9:00 PM PST\nPrice: Free \nGenre: Pop \nDescription: Join Sam Smith on their Love Goes Album Comeback Tour featuring certified hits and fan favorites",
    img: Images.flowerprofile,
    pin: '7282',
  },
  {
    id: '13',
    name: 'Ariana Grande',
    date: "March 22nd 2021",
    time: "11:00 AM PST",
    joinRoomInfo: "Price: Free \nGenre: Pop \nDescription: Join Ariana Grande on her Positions Album Comeback Tour featuring\n certified hits and fan favorites",
    info: "Artist: Ariana Grande\nDate: March 22nd 2021\nTime: 11:00 AM PST\nPrice: Free \nGenre: Pop \nDescription: Join Ariana Grande on her Positions Album Comeback Tour featuring certified hits and fan favorites",
    img: Images.flowerprofile,
    pin: '9303',
  },
  {
    id: '14',
    name: 'Normani',
    date: "March 22nd 2021",
    time: "1:00 PM PST",
    joinRoomInfo: "Price: Free \nGenre: R&B \nDescription: Join Normani on her Motivation Song Release Tour featuring\n certified hit remixes and acoustic performances",
    info: "Artist: Normani\nDate: March 22nd 2021\nTime: 1:00 PM PST\nPrice: Free \nGenre: R&B \nDescription: Join Normani on her Motivation Song Release Tour featuring certified hit remixes and acoustic performances",
    img: Images.flowerprofile,
    pin: '1323',
  },
  {
    id: '15',
    name: 'WizKid',
    date: "March 22nd 2021",
    time: "4:00 PM PST",
    joinRoomInfo: "Price: Free \nGenre: Afrobeats \nDescription: Join WizKid on his Jam Release Tour featuring\n certified hit remixes and acoustic performances",
    info: "Artist: WizKid\nDate: March 22nd 2021\nTime: 4:00 PM PST\nPrice: Free \nGenre: Afrobeats \nDescription: Join WizKid on his Jam Release Tour featuring certified hit remixes and acoustic performances",
    img: Images.flowerprofile,
    pin: '3343',
  },
];

export default ConcertData;