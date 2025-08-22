// app/(tabs)/explore.tsx - Explore Screen
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ExploreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleExploreConcerts = () => {
    router.push('/screens/exploreConcertsScreen');
  };

  const popularGenres = [
    { name: 'Pop', icon: 'musical-note', color: '#FF6B6B' },
    { name: 'Rock', icon: 'flash', color: '#4ECDC4' },
    { name: 'Jazz', icon: 'wine', color: '#45B7D1' },
    { name: 'Electronic', icon: 'radio', color: '#96CEB4' },
    { name: 'Hip-Hop', icon: 'mic', color: '#FFEAA7' },
    { name: 'Classical', icon: 'library', color: '#DDA0DD' },
  ];

  const trendingEvents = [
    { title: 'Summer Festival 2024', artist: 'Various Artists', time: 'Live Now', attendees: '2.3K' },
    { title: 'Acoustic Sessions', artist: 'Indie Collective', time: 'Tonight 8PM', attendees: '890' },
    { title: 'Electronic Nights', artist: 'DJ MixMaster', time: 'Tomorrow 9PM', attendees: '1.5K' },
  ];

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>Discover amazing concerts and events</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.7)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search concerts, artists, genres..."
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="rgba(255, 255, 255, 0.7)" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Quick Access Buttons */}
        <View style={styles.quickAccessSection}>
          <TouchableOpacity 
            style={styles.exploreAllButton}
            onPress={handleExploreConcerts}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FF6B6B', '#FF8E53']}
              style={styles.exploreAllGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="compass" size={24} color="white" />
              <Text style={styles.exploreAllText}>Explore All Concerts</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Popular Genres */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Genres</Text>
          <View style={styles.genresGrid}>
            {popularGenres.map((genre, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.genreCard}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[genre.color, `${genre.color}CC`]}
                  style={styles.genreGradient}
                >
                  <Ionicons name={genre.icon as any} size={24} color="white" />
                  <Text style={styles.genreText}>{genre.name}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Events</Text>
            <TouchableOpacity onPress={handleExploreConcerts}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.eventsContainer}>
            {trendingEvents.map((event, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.eventCard}
                activeOpacity={0.8}
                onPress={handleExploreConcerts}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                  style={styles.eventGradient}
                >
                  <View style={styles.eventIcon}>
                    <Ionicons name="musical-notes" size={20} color="#FF6B6B" />
                  </View>
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventArtist}>{event.artist}</Text>
                    <View style={styles.eventMeta}>
                      <View style={styles.eventTime}>
                        <Ionicons name="time" size={14} color="rgba(255, 255, 255, 0.7)" />
                        <Text style={styles.eventTimeText}>{event.time}</Text>
                      </View>
                      <View style={styles.eventAttendees}>
                        <Ionicons name="people" size={14} color="rgba(255, 255, 255, 0.7)" />
                        <Text style={styles.eventAttendeesText}>{event.attendees}</Text>
                      </View>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={styles.categoriesGrid}>
            <TouchableOpacity style={styles.categoryCard} activeOpacity={0.8}>
              <LinearGradient
                colors={['rgba(156, 39, 176, 0.3)', 'rgba(123, 31, 162, 0.3)']}
                style={styles.categoryGradient}
              >
                <Ionicons name="calendar" size={32} color="#9C27B0" />
                <Text style={styles.categoryTitle}>Upcoming</Text>
                <Text style={styles.categorySubtitle}>See what&apos;s next</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryCard} activeOpacity={0.8}>
              <LinearGradient
                colors={['rgba(76, 175, 80, 0.3)', 'rgba(69, 160, 73, 0.3)']}
                style={styles.categoryGradient}
              >
                <Ionicons name="flame" size={32} color="#4CAF50" />
                <Text style={styles.categoryTitle}>Live Now</Text>
                <Text style={styles.categorySubtitle}>Join the action</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  searchContainer: {
    marginBottom: 30,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    color: 'white',
    fontSize: 16,
  },
  quickAccessSection: {
    marginBottom: 30,
  },
  exploreAllButton: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  exploreAllGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  exploreAllText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: 'white',
    marginBottom: 20,
  },
  seeAllText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  genresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  genreCard: {
    width: (screenWidth - 64) / 3,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  genreGradient: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  genreText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  eventsContainer: {
    gap: 12,
  },
  eventCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  eventGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  eventArtist: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  eventTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventTimeText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  eventAttendees: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventAttendeesText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  categoriesGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryGradient: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginTop: 12,
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
}); 
