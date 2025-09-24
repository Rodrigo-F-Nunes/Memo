import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import backButton from '../../../assets/images/backButton.png';
import iconememo from '../../../assets/images/iconememo.png';
import lupa from '../../../assets/images/lupa.png';

const DeckDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [deck, setDeck] = useState(null);
  const [cardsQueue, setCardsQueue] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const storedDecks = await AsyncStorage.getItem('decks');
        const parsedDecks = storedDecks ? JSON.parse(storedDecks) : [];
        const selectedDeck = parsedDecks.find(d => d.id === id);
        if (selectedDeck) {
          setDeck(selectedDeck);
          setCardsQueue([...selectedDeck.cards]);
          setHasStarted(true);
          setCurrentCardIndex(0);
          setShowAnswer(false);
        }
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };

    fetchDeck();
  }, [id]);

  const isFinished = currentCardIndex >= cardsQueue.length;

  const handleReveal = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentCardIndex(prev => prev + 1);
  };

  const handleSeeAgain = () => {
    const currentCard = cardsQueue[currentCardIndex];
    const newQueue = [...cardsQueue, currentCard];
    setCardsQueue(newQueue);
    setShowAnswer(false);
    setCurrentCardIndex(prev => prev + 1);
  };

  const handleBackToDecks = () => {
    router.push('/decks');
  };

  const card = cardsQueue[currentCardIndex];

  if (!deck) {
    return <Text style={styles.deckNull}>Nenhum deck foi encontrado</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconLeft} onPress={handleBackToDecks}>
          <Image source={backButton} style={styles.iconImage} resizeMode="contain" />
        </TouchableOpacity>
        <Image source={iconememo} style={styles.iconMemo} resizeMode="contain" />
        <TouchableOpacity style={styles.iconRight}>
          <Image source={lupa} style={styles.iconImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{deck.title}</Text>

      {hasStarted && (
        <>
          {!isFinished ? (
            <View style={styles.cardItem}>
              <Text style={styles.cardQuestion}>{card.front}</Text>
              <View style={styles.cardLine} />
              {showAnswer && <Text style={styles.cardAnswer}>{card.back}</Text>}
            </View>
          ) : (
            <Text style={styles.finishedText}>Você completou todos os cards!</Text>
          )}

          {!isFinished && !showAnswer && (
            <TouchableOpacity style={styles.revealButton} onPress={handleReveal}>
              <Text style={styles.revealText}>Revelar</Text>
            </TouchableOpacity>
          )}

          {!isFinished && showAnswer && (
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.revealButton} onPress={handleNext}>
                <Text style={styles.revealText}>Próximo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.revealButton} onPress={handleSeeAgain}>
                <Text style={styles.revealText}>Ver de novo</Text>
              </TouchableOpacity>
            </View>
          )}

          {isFinished && (
  <TouchableOpacity
    style={styles.revealButton}
    onPress={async () => {
      try {
        const storedDecks = await AsyncStorage.getItem('decks');
        let decks = storedDecks ? JSON.parse(storedDecks) : [];

        decks = decks.map(d =>
          d.id === deck.id ? { ...d, lastReviewed: new Date().toISOString() } : d
        );

        await AsyncStorage.setItem('decks', JSON.stringify(decks));
      } catch (err) {
        console.error("Failed to update lastReviewed:", err);
      }

      handleBackToDecks();
    }}
  >
    <Text style={styles.revealText}>Voltar para decks</Text>
  </TouchableOpacity>
)}

        </>
      )}
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
  iconLeft: {
    marginLeft: 10,
  },
  iconRight: {
    marginRight: 10,
  },
  iconImage: {
    width: 32,
    height: 32,
  },
  iconMemo: {
    width: 168,
    height: 73,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  setupContainer: {
    marginTop: 40,
    alignItems: 'center',
    gap: 20,
  },
  toggleButton: {
    backgroundColor: '#3B5EFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  cardItem: {
    width: 361,
    height: 550,
    paddingTop: 30,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#3B5EFF',
    padding: 10,
    borderRadius: 16,
  },
  cardQuestion: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  cardLine: {
    width: 341,
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 1.5,
  },
  cardAnswer: {
    fontSize: 20,
    paddingTop: 20,
    color: '#fff',
  },
  revealButton: {
    marginTop: 20,
    backgroundColor: '#3B5EFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  revealText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonGroup: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 20,
  },
  finishedText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 100,
  },
  deckNull: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default DeckDetails;