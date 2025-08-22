import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

type EllipseProps = {
  imgSrc: ImageSourcePropType;
};

export default function Ellipse({ imgSrc }: EllipseProps) {
  return <Image source={imgSrc} style={styles.ellipse} />;
}

const styles = StyleSheet.create({
  ellipse: {
    width: 395,
    height: 380,
    borderRadius: 200, // number, not string
  },
});