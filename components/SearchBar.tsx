// ===== Enhanced SearchBar.tsx =====
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface SearchBarProps {
  onChange?: (text: string) => void;
  onSearch?: (text: string) => void;
  initialValue?: string;
  placeholder?: string;
}

export function SearchBar({
  onChange,
  onSearch,
  initialValue = '',
  placeholder = 'Search by artist or date',
}: SearchBarProps) {
  const [search, setSearch] = useState(initialValue);

  const handleChange = (text: string) => {
    setSearch(text);
    onChange?.(text);
  };

  const handleSearch = () => {
    onSearch?.(search);
  };

  const handleClear = () => {
    setSearch('');
    onChange?.('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={20} color={Colors.textGray} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.textGray}
          value={search}
          onChangeText={handleChange}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <Pressable onPress={handleClear}>
            <Ionicons name="close-circle" size={20} color={Colors.textGray} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
});
