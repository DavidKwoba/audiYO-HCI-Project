import { Dimensions, Platform, TextStyle } from "react-native";
import { Colors } from './Colors'; // adjust path if needed

const { width, height } = Dimensions.get("window");

interface MetricsType {
  marginHorizontal: number;
  marginVertical: number;
  section: number;
  baseMargin: number;
  doubleBaseMargin: number;
  smallMargin: number;
  doubleSection: number;
  horizontalLineHeight: number;
  screenWidth: number;
  screenHeight: number;
  navBarHeight: number;
  buttonRadius: number;
  icons: Record<string, number>;
  images: Record<string, number>;
  titleStyle: TextStyle;
  header: TextStyle;
  regFont: TextStyle;
}

const Metrics: MetricsType = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === "ios" ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },
  titleStyle: {
    fontSize: 36,
    color: Colors.light.tint, // or adjust to your desired purple
    alignSelf: 'center',
    fontWeight: "300",
    marginTop: 20,
  },
  header: {
    fontSize: 36,
    color: Colors.light.tint, // same here
    alignSelf: 'center',
    fontWeight: "500",
  },
  regFont: {
    fontFamily: 'Varta',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 48,
    textAlign: 'center',
  },
};

export default Metrics;