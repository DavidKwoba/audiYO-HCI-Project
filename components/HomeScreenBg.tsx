import React from 'react';
import { StyleSheet, View } from 'react-native';
import BasicEllipse from '../components/EllipseBasic';
import Ellipse from '../components/Ellipses';
import Images from '../constants/Images';
import Gradient from './Gradient';

export default function HomeScreenBg() {
  return (
    <View style={styles.container}>
      <View style={styles.ellipse1}>
        <Ellipse imgSrc={Images.flowerprofile} />
      </View>

      <View style={styles.ellipse2}>
        <BasicEllipse />
      </View>

      <View style={styles.ellipse3}>
        <Ellipse imgSrc={Images.flowerprofile} />
      </View>

      <View style={styles.ellipse4}>
        <Ellipse imgSrc={Images.flowerprofile} />
      </View>

      <View style={styles.ellipse5}>
        <BasicEllipse />
      </View>

      <Gradient />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ellipse1: { position: 'absolute', left: -153, top: 138 },
  ellipse2: { position: 'absolute', left: 490, top: -87 },
  ellipse3: { position: 'absolute', left: 586, top: 549 },
  ellipse4: { position: 'absolute', left: -175, top: 763 },
  ellipse5: { position: 'absolute', left: 367, top: 929 },
});