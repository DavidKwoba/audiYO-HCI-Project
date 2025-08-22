// ===== Enhanced CustomizeArea.tsx =====
import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { CardRow } from './CardRow';

interface CustomizeAreaProps {
  name: string;
  description?: string;
  imgSrc1?: ImageSourcePropType;
  imgSrc2?: ImageSourcePropType;
  imgSrc3?: ImageSourcePropType;
  imgSrc4?: ImageSourcePropType;
  onCardPress?: (index: number) => void;
  selectedIndex?: number;
}

export function CustomizeArea({
  name,
  description,
  imgSrc1,
  imgSrc2,
  imgSrc3,
  imgSrc4,
  onCardPress,
  selectedIndex
}: CustomizeAreaProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>
      <CardRow
        imgSrc1={imgSrc1}
        imgSrc2={imgSrc2}
        imgSrc3={imgSrc3}
        imgSrc4={imgSrc4}
        onCardPress={onCardPress}
        selectedIndex={selectedIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
});