import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import backButton from '../../assets/images/backButton.png';
import iconememo from '../../assets/images/iconememo.png';
import lupa from '../../assets/images/lupa.png';

const CreateDeck = () => {
  const [title, setTitle] = useState('');
  const [cards, setCards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // initialize at least one card
    if (cards.length === 0) {
      setCards([{ front: '', back: '' }]);
    }
  }, []);

  const handleCardInput = (index, side, value) => {
    const updated = [...cards];
    if (!updated[index]) {
      updated[index] = { front: '', back: '' };
    }
    updated[index][side] = value;
    setCards(updated);
  };

  const handleAddCard = () => {
    setCards(prev => [...prev, { front: '', back: '' }]);
  };

  const handleRemoveCard = (index) => {
    const updated = [...cards];
    updated.splice(index, 1);
    setCards(updated);
  };

  const handleSaveDeck = async () => {
    if (!title.trim() || cards.length === 0) {
      Alert.alert("Erro", "Insira um título e pelo menos um flashcard.");
      return;
    }

    const hasEmpty = cards.some(c => !c.front.trim() || !c.back.trim());
    if (hasEmpty) {
      Alert.alert("Erro", "Todos os flashcards devem ter frente e verso preenchidos.");
      return;
    }

    try {
      const existing = await AsyncStorage.getItem('decks');
      const decks = existing ? JSON.parse(existing) : [];

      const newDeck = {
        id: Date.now().toString(),
        title: title.trim(),
        cards: cards.map(c => ({
          front: c.front,
          back: c.back,
          stats: {
            easy: 0,
            medium: 0,
            difficult: 0
          }
        })),
        createdAt: new Date().toISOString(),
        lastReviewed: null,
      };

      await AsyncStorage.setItem('decks', JSON.stringify([...decks, newDeck]));
      Alert.alert("Success", "Deck salvo com sucesso!");
      router.back();
    } catch (error) {
      console.error("Error saving deck:", error);
      Alert.alert("Error", "Erro ao salvar o deck.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.topBarContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconLeft} onPress={() => router.push('/decks')}>
            <Image source={backButton} style={styles.iconImage} resizeMode="contain" />
          </TouchableOpacity>
          <Image source={iconememo} style={styles.iconMemo} resizeMode="contain" />
          <TouchableOpacity style={styles.iconRight}>
            <Image source={lupa} style={styles.iconImage} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Nome do deck:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite aqui..."
          value={title}
          onChangeText={setTitle}
        />

        {cards.map((card, index) => (
          <View key={index} style={styles.cardContainer}>
            <Text style={styles.cardLabel}>Flashcard {index + 1}</Text>
            <View style={styles.cardInputs}>
              <Text style={styles.cardFieldLabel}>Frente:</Text>
              <TextInput
                style={styles.cardInput}
                onChangeText={text => handleCardInput(index, 'front', text)}
                value={card.front}
              />

              <Text style={styles.cardFieldLabel}>Verso:</Text>
              <TextInput
                style={styles.cardInput}
                onChangeText={text => handleCardInput(index, 'back', text)}
                value={card.back}
              />

              {cards.length > 1 && (
                <View style={styles.removeButton}>
                  <Button title="Remove Card" color="red" onPress={() => handleRemoveCard(index)} />
                </View>
              )}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Text style={styles.saveButtonText}>+ Add Card</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveDeck}>
          <Text style={styles.saveButtonText}>Salvar deck</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingTop: 120,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  topBarContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#96ACF1',
    fontSize: 18,
    borderWidth: 0,
    width: 365,
    height: 51,
    borderRadius: 17,
    padding: 10,
    marginBottom: 15,
  },
  cardInputs: {
    backgroundColor: '#3A5FCD',
    width: 365,
    height: 217,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  cardContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
    alignSelf: 'flex-start',
    color: '#333',
  },
  cardInput: {
    backgroundColor: '#96ACF1',
    width: 323,
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  removeButton: {
    marginTop: 10,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#3A5FCD',
    height: 49,
    width: 365,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  addButton: {
    backgroundColor: '#3A5FCD',
    height: 49,
    width: 365,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  saveButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F2F2F0',
    alignSelf: 'center',
  },
  cardFieldLabel: {
    color: '#fff',
    marginBottom: 4,
    marginTop: 5,
    fontSize: 18,
  },
});

export default CreateDeck;
