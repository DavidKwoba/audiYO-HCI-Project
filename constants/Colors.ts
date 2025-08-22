/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#001BB7';
const tintColorDark = '#0046FF';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#E9E9E9', // changed from white to light gray
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },

  // Brand / global colors
  primaryBlue: '#001BB7',    // main deep blue
  secondaryBlue: '#0046FF',  // bright accent blue
  ctaOrange: '#FF8040',      // for buttons or highlights
  neutralLight: '#E9E9E9',   // for background cards or sections
  textGray: '#BBBBBB',
  iconGray: '#687076',
  buttonGray: '#dfdcdf', 
  neutral: '#EDECF4', 

  button: {
    primary: '#FF8040',   // main actions like “Explore”, “Add Room”
    secondary: '#3366FF', // softer blue for general navigation buttons
    neutral: '#EDECF4',   // light background for less important buttons
    danger: '#FF4C4C',    // destructive actions, cancel/delete
    success: '#28C76F',   // positive actions, confirmations
    textPrimary: '#FFFFFF',  // default text on primary button
    textSecondary: '#FFFFFF',// default text on secondary button
    textNeutral: '#6C63FF',  // text for neutral/light buttons
  },
};