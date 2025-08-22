import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';

const EllipseBasic: React.FC = () => {
  return <View style={styles.ellipse} />;
};

export default EllipseBasic;

const styles = StyleSheet.create({
  ellipse: {
    width: 395,
    height: 380,
    borderRadius: 200, // number instead of string
    backgroundColor: Colors.neutral, // ✅ updated to palette neutral color (#EDECF4)
  },
});
