import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';

import backButton from '../../assets/images/backButton.png';
import iconememo from '../../assets/images/iconememo.png';
import lupa from '../../assets/images/lupa.png';

// Enable layout animation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SettingsPage = () => {
  const router = useRouter();
  const [decks, setDecks] = useState([]);
  const [expandedDeckId, setExpandedDeckId] = useState(null);

  useEffect(() => {
    const loadDecks = async () => {
      try {
        const stored = await AsyncStorage.getItem('decks');
        const parsed = stored ? JSON.parse(stored) : [];
        // Normalize stats if missing
        const normalized = parsed.map(d => ({
          ...d,
          cards: (d.cards || []).map(c => ({
            front: c.front,
            back: c.back,
            stats: {
              easy: c.stats?.easy ?? 0,
              medium: c.stats?.medium ?? 0,
              difficult: c.stats?.difficult ?? 0,
            }
          }))
        }));
        setDecks(normalized);
      } catch (err) {
        console.error("Erro ao carregar decks:", err);
      }
    };
    loadDecks();
  }, []);

  const toggleDeck = (deckId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedDeckId(prev => (prev === deckId ? null : deckId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconLeft} onPress={() => router.push('/home')}>
          <Image source={backButton} style={styles.iconImage} resizeMode="contain" />
        </TouchableOpacity>
        <Image source={iconememo} style={styles.iconMemo} resizeMode="contain" />
        <TouchableOpacity style={styles.iconRight}>
          <Image source={lupa} style={styles.iconImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Decks Criados</Text>

        {decks.map((deck) => (
          <View key={deck.id} style={styles.deckContainer}>
            <TouchableOpacity
              onPress={() => toggleDeck(deck.id)}
              style={styles.deckTitleButton}
            >
              <Text style={styles.deckTitle}>{deck.title}</Text>
              <Text style={styles.cardCount}>{deck.cards.length} cartas</Text>
            </TouchableOpacity>

            {expandedDeckId === deck.id && (
              <View style={styles.cardList}>
                {deck.cards.map((card, index) => (
                  <View key={index} style={styles.cardItem}>
                    <Text style={styles.cardSide}>Frente:</Text>
                    <Text style={styles.cardText}>{card.front}</Text>

                    <Text style={styles.cardSide}>Verso:</Text>
                    <Text style={styles.cardText}>{card.back}</Text>

                    <View style={styles.statsRow}>
                      <Text style={styles.stat}>Fácil: {card.stats.easy}</Text>
                      <Text style={styles.stat}>Médio: {card.stats.medium}</Text>
                      <Text style={styles.stat}>Difícil: {card.stats.difficult}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  iconLeft: { marginLeft: 10 },
  iconRight: { marginRight: 10 },
  iconImage: { width: 32, height: 32 },
  iconMemo: { width: 168, height: 73, alignSelf: 'center' },

  content: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },

  deckContainer: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#96ACF1',
    overflow: 'hidden',
  },
  deckTitleButton: {
    padding: 15,
    backgroundColor: '#3A5FCD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deckTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardCount: {
    fontSize: 14,
    color: '#fff',
  },

  cardList: {
    padding: 15,
    backgroundColor: '#F2F2F2',
  },
  cardItem: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    // Shadow / elevation if desired
    elevation: 1,
  },
  cardSide: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardText: {
    marginBottom: 8,
    color: '#555',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stat: {
    fontSize: 14,
    color: '#444',
  },
});

export default SettingsPage;
