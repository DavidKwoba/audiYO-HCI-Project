import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors'; // use your new Colors.ts

export default function Gradient() {
  return (
    <LinearGradient
      colors={[
        Colors.primaryBlue,      // #001BB7
        Colors.secondaryBlue,    // #0046FF
        Colors.ctaOrange,        // #FF8040
        Colors.neutralLight,     // #E9E9E9
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    />
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});