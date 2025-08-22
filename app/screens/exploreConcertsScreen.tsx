import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import Concerts from "../../components/ConcertFlatList";
import Header from "../../components/FullHeader";

export default function ExploreConcertsScreen() {
  return (
    <View style={styles.container}>
      <Header text="Explore Concerts" toDo={() => router.back()} />
      
      <View style={styles.contentContainer}>
        <Concerts nav={router} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    flex: 1,
  },
}); 
