import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import StandardButton from "./ButtonTemplate";
import ConcertData from "./ConcertData";

const { width: screenWidth } = Dimensions.get('window');

type ConcertItem = {
  id: string;
  info: string;
};

type Props = {
  nav: any;
};

export default function Concerts({ nav }: Props) {
  const [text, setText] = useState("");
  const [datasource, setDatasource] = useState<ConcertItem[]>(ConcertData);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const searchFilterFunction = (searchText: string) => {
    const newData = ConcertData.filter(item =>
      item.info?.toUpperCase().includes(searchText.toUpperCase())
    );
    setDatasource(newData);
    setText(searchText);
  };

  // Parse concert info into structured data
  const parseConcertInfo = (info: string) => {
    const lines = info.split('\n').filter(line => line.trim());
    const parsed: { [key: string]: string } = {};
    
    lines.forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        parsed[key.trim()] = valueParts.join(':').trim();
      }
    });
    
    return parsed;
  };

  const Item = ({ item }: { item: ConcertItem }) => {
    const concertData = parseConcertInfo(item.info);
    
    return (
      <View style={styles.concertCard}>
        <View style={styles.concertHeader}>
          <Text style={styles.artistName}>{concertData.Artist || 'Unknown Artist'}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{concertData.Price || 'TBD'}</Text>
          </View>
        </View>
        
        <View style={styles.concertDetails}>
          <View style={styles.detailRow}>
            <FontAwesome name="calendar" size={14} color="#666" style={styles.icon} />
            <Text style={styles.detailText}>{concertData.Date || 'TBD'}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <FontAwesome name="clock-o" size={14} color="#666" style={styles.icon} />
            <Text style={styles.detailText}>{concertData.Time || 'TBD'}</Text>
          </View>
          
          {concertData.Genre && (
            <View style={styles.detailRow}>
              <FontAwesome name="music" size={14} color="#666" style={styles.icon} />
              <Text style={styles.detailText}>{concertData.Genre}</Text>
            </View>
          )}
        </View>
        
        {concertData.Description && (
          <Text style={styles.description} numberOfLines={2}>
            {concertData.Description}
          </Text>
        )}
        
        <View style={styles.buttonContainer}>
          <StandardButton
            text="Create Room"
            nav={nav}
            screenName="/screens/createRoomPinScreen"
            width={screenWidth - 80}
            height={50}
            bgColor="#FF8040"
            textColor="#FFFFFF"
          />
        </View>
      </View>
    );
  };

  const renderItem = ({ item }: { item: ConcertItem }) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <FontAwesome name="search" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.textInput}
            onChangeText={searchFilterFunction}
            value={text}
            placeholder="Search for concerts..."
            placeholderTextColor="#999"
          />
          {text.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setText("");
                setDatasource(ConcertData);
              }}
              style={styles.clearButton}
            >
              <FontAwesome name="times-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.listContainer}>
        {datasource.length > 0 ? (
          <FlatList
            data={datasource}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.noResultsContainer}>
            <FontAwesome name="search" size={48} color="#ccc" />
            <Text style={styles.noResultsText}>No concerts found</Text>
            <Text style={styles.noResultsSubtext}>Try adjusting your search terms</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  
  // Search section
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  clearButton: {
    padding: 5,
  },
  
  // List section
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },
  
  // Concert card
  concertCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  
  // Concert header
  concertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  artistName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    flex: 1,
    marginRight: 10,
  },
  priceContainer: {
    backgroundColor: "#e8f5e8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d7d2d",
  },
  
  // Concert details
  concertDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  icon: {
    width: 20,
    marginRight: 8,
  },
  detailText: {
    fontSize: 15,
    color: "#666",
    flex: 1,
  },
  
  // Description
  description: {
    fontSize: 14,
    color: "#888",
    lineHeight: 20,
    marginBottom: 16,
  },
  
  // Button
  buttonContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  
  // No results
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});