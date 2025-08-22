import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FullHeader from '../../components/FullHeader';
import { Colors } from '../../constants/Colors';
import Images from '../../constants/Images';

interface CustomizeOption {
  id: string;
  name: string;
  image: ImageSourcePropType;
  description?: string;
}

interface CustomizeCategory {
  id: string;
  name: string;
  description: string;
  options: CustomizeOption[];
}

interface CustomizeScreenProps {
  navigation?: any;
}

// Define customization categories with options
const customizeCategories: CustomizeCategory[] = [
  {
    id: 'theme',
    name: 'Theme',
    description: 'Choose the visual theme for your concert room',
    options: [
      { id: 'theme1', name: 'Classic', image: Images.theme1, description: 'Elegant and timeless' },
      { id: 'theme2', name: 'Modern', image: Images.theme2, description: 'Clean and contemporary' },
      { id: 'theme3', name: 'Vibrant', image: Images.theme3, description: 'Bold and colorful' },
      { id: 'theme4', name: 'Dark', image: Images.theme4, description: 'Sleek and sophisticated' },
    ],
  },
  {
    id: 'games',
    name: 'Interactive Games',
    description: 'Add fun activities for your audience',
    options: [
      { id: 'game1', name: 'Trivia', image: Images.game1, description: 'Music knowledge quiz' },
      { id: 'game2', name: 'Polls', image: Images.game2, description: 'Real-time voting' },
      { id: 'game3', name: 'Reactions', image: Images.game3, description: 'Emoji reactions' },
      { id: 'game4', name: 'Chat Games', image: Images.game4, description: 'Interactive chat features' },
    ],
  },
  {
    id: 'music',
    name: 'Music Style',
    description: 'Set the musical atmosphere for your room',
    options: [
      { id: 'music1', name: 'Pop', image: Images.music1, description: 'Popular hits and classics' },
      { id: 'music2', name: 'Rock', image: Images.music2, description: 'Electric and energetic' },
      { id: 'music3', name: 'Jazz', image: Images.music3, description: 'Smooth and sophisticated' },
      { id: 'music4', name: 'Electronic', image: Images.music4, description: 'Digital beats and synths' },
    ],
  },
];

export default function CustomizeScreen({ navigation }: CustomizeScreenProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const handleOptionSelect = (categoryId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [categoryId]: optionId,
    }));
    setHasChanges(true);
  };

  const handleSaveCustomizations = () => {
    if (!hasChanges) {
      router.back();
      return;
    }

    // Here you would typically save the customizations to your backend/storage
    console.log('Saving customizations:', selectedOptions);
    
    Alert.alert(
      'Customizations Saved',
      'Your room customizations have been applied successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back or to rooms screen
            if (navigation) {
              navigation.navigate('My Rooms');
            } else {
              router.push('/screens/myRoomsScreen');
            }
          }
        }
      ]
    );
  };

  const handleResetToDefaults = () => {
    Alert.alert(
      'Reset Customizations',
      'Are you sure you want to reset all customizations to default?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setSelectedOptions({});
            setHasChanges(false);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FullHeader text="Customize Room" toDo={() => router.back()} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={styles.subtitle}>
            Personalize your concert room experience
          </Text>
        </View>

        {customizeCategories.map((category) => (
          <CustomizeCategorySection
            key={category.id}
            category={category}
            selectedOption={selectedOptions[category.id]}
            onOptionSelect={(optionId) => handleOptionSelect(category.id, optionId)}
          />
        ))}

        <View style={styles.actionsContainer}>
          <Pressable
            style={styles.resetButton}
            onPress={handleResetToDefaults}
          >
            <Text style={styles.resetButtonText}>Reset to Defaults</Text>
          </Pressable>

          <Pressable
            style={[
              styles.saveButton,
              !hasChanges && styles.saveButtonDisabled
            ]}
            onPress={handleSaveCustomizations}
          >
            <Text style={styles.saveButtonText}>
              {hasChanges ? 'Save Customizations' : 'Done'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface CustomizeCategorySectionProps {
  category: CustomizeCategory;
  selectedOption?: string;
  onOptionSelect: (optionId: string) => void;
}

function CustomizeCategorySection({ 
  category, 
  selectedOption, 
  onOptionSelect 
}: CustomizeCategorySectionProps) {
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{category.name}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
      </View>

      <View style={styles.optionsGrid}>
        {category.options.map((option) => (
          <CustomizeOptionCard
            key={option.id}
            option={option}
            isSelected={selectedOption === option.id}
            onPress={() => onOptionSelect(option.id)}
          />
        ))}
      </View>
    </View>
  );
}

interface CustomizeOptionCardProps {
  option: CustomizeOption;
  isSelected: boolean;
  onPress: () => void;
}

function CustomizeOptionCard({ option, isSelected, onPress }: CustomizeOptionCardProps) {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.optionCard,
        isSelected && styles.optionCardSelected,
        { transform: [{ scale: scaleValue }] }
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.optionPressable}
      >
        <View style={styles.optionImageContainer}>
          <Image source={option.image} style={styles.optionImage} />
          {isSelected && (
            <View style={styles.selectedOverlay}>
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.optionContent}>
          <Text style={styles.optionName}>{option.name}</Text>
          {option.description && (
            <Text style={styles.optionDescription}>{option.description}</Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutralLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  headerSection: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textGray,
    textAlign: 'center',
    lineHeight: 22,
  },
  categoryContainer: {
    marginBottom: 32,
  },
  categoryHeader: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: Colors.textGray,
    lineHeight: 20,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  optionCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  optionCardSelected: {
    borderColor: Colors.ctaOrange,
    shadowColor: Colors.ctaOrange,
    shadowOpacity: 0.3,
  },
  optionPressable: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  optionImageContainer: {
    position: 'relative',
    height: 120,
    backgroundColor: '#f8f9fa',
  },
  optionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 119, 51, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.ctaOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  optionContent: {
    padding: 16,
  },
  optionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: Colors.textGray,
    lineHeight: 16,
  },
  actionsContainer: {
    marginTop: 24,
    gap: 16,
  },
  resetButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textGray,
  },
  saveButton: {
    backgroundColor: Colors.ctaOrange,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.ctaOrange,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0.1,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
}); 
