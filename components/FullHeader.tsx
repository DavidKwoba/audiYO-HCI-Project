// ===== Enhanced FullHeader.tsx =====
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton } from './BackButton';

type FullHeaderProps = {
  text: string;
  toDo: () => void;
  rightElement?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
};

export function FullHeader({ 
  text, 
  toDo, 
  rightElement,
  backgroundColor = 'white',
  textColor = '#1a1a1a'
}: FullHeaderProps) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor }]}>
      <View style={styles.headerContent}>
        <View style={styles.backButtonContainer}>
          <BackButton toDo={toDo} />
        </View>
        
        <View style={styles.titleContainer}>
          <Text style={[styles.headerText, { color: textColor }]} numberOfLines={1}>
            {text}
          </Text>
        </View>
        
        <View style={styles.rightContainer}>
          {rightElement || <View style={styles.placeholder} />}
        </View>
      </View>
    </View>
  );
}

// Also export as default for backward compatibility
export default FullHeader;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 60,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  rightContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
});