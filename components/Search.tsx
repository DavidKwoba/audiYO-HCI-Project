// ===== Enhanced Search.tsx =====
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../constants/Colors";

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function Search({ onSearch, placeholder = "Search for rooms..." }: SearchProps) {
  const [text, setText] = useState("");

  const handleSearch = () => {
    onSearch(text.trim());
    Keyboard.dismiss();
  };

  const handleClear = () => {
    setText("");
    onSearch("");
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={Colors.textGray} style={styles.searchIcon} />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={Colors.textGray}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      {text.length > 0 && (
        <Pressable onPress={handleClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color={Colors.textGray} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#1a1a1a",
  },
  clearButton: {
    padding: 4,
  },
});
