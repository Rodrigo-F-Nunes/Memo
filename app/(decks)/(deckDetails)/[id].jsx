import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DeckDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const storedDecks = await AsyncStorage.getItem('decks');
        const parsedDecks = storedDecks ? JSON.parse(storedDecks) : [];
        const selectedDeck = parsedDecks.find(d => d.id === id);
        setDeck(selectedDeck);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };

    fetchDeck();
  }, [id]);

  if (!deck) {
    return <Text style={styles.deckNull}>Nenhum deck foi encontrado</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.title}</Text>
      {deck.cards.map((card, index) => (
        <View key={index} style={styles.cardItem}>
          <Text style={styles.cardQuestion}>Q: {card.front}</Text>
          <Text style={styles.cardAnswer}>A: {card.back}</Text>
        </View>
      ))}

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardItem: {
    marginBottom: 10,
    backgroundColor: '#e2e2e2',
    padding: 10,
    borderRadius: 8,
  },
  cardQuestion: {
    fontWeight: 'bold',
  },
  cardAnswer: {
    marginTop: 5,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4F8EF7',
    borderRadius: 8,
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  deckNull: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50
},
});

export default DeckDetails;