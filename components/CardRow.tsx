// ===== Enhanced CardRow.tsx =====
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AssetCard } from './Asset';

interface CardRowProps {
  imgSrc1?: any;
  imgSrc2?: any;
  imgSrc3?: any;
  imgSrc4?: any;
  onCardPress?: (index: number) => void;
  selectedIndex?: number;
}

export function CardRow({ 
  imgSrc1, 
  imgSrc2, 
  imgSrc3, 
  imgSrc4, 
  onCardPress,
  selectedIndex 
}: CardRowProps) {
  const images = [imgSrc1, imgSrc2, imgSrc3, imgSrc4].filter(Boolean);

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {images.map((img, index) => (
          <AssetCard
            key={index}
            imgSrc={img}
            onPress={() => onCardPress?.(index)}
            isSelected={selectedIndex === index}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
});
