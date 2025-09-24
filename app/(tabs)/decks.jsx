import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import backButton from '../../assets/images/backButton.png';
import iconememo from '../../assets/images/iconememo.png';
import lupa from '../../assets/images/lupa.png';
import menu from '../../assets/images/menu.png';

const decksPage = () => {
  const router = useRouter();
  const [cards, setCards] = useState([]);

  const loadDecks = async () => {
    try {
      const storedDecks = await AsyncStorage.getItem('decks');
      const parsedDecks = storedDecks ? JSON.parse(storedDecks) : [];
      setCards(parsedDecks.map(deck => ({
        id: deck.id,
        Text: deck.title,
        cardCount: deck.cards ? deck.cards.length : 0
      })));
    } catch (error) {
      console.error("Error loading decks:", error);
    }
  };

  const handleDeleteDeck = async (id) => {
  try {
    const storedDecks = await AsyncStorage.getItem('decks');
    const parsedDecks = storedDecks ? JSON.parse(storedDecks) : [];

    const updatedDecks = parsedDecks.filter(deck => deck.id !== id);
    await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));

    loadDecks();
  } catch (error) {
    console.error("Error deleting deck:", error);
  }
  };

 const [menuVisible, setMenuVisible] = useState(null);
  useFocusEffect(
    useCallback(() => {
      loadDecks();
    }, [])
  );

return (
  <TouchableWithoutFeedback onPress={() => setMenuVisible(null)}>
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
      <Text style={styles.decksText}>Meus Decks:</Text>
<FlatList
  data={cards}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/(decks)/(deckDetails)/${item.id}`)}
      style={styles.cardItem}
      activeOpacity={0.8}
    >
      <TouchableOpacity
        style={styles.menuButton}
        onPress={(e) => {
          e.stopPropagation();
          setMenuVisible(item.id);
        }}
      >
        <Image source={menu} style={styles.menuIcon} />
      </TouchableOpacity>

      <Text style={styles.cardText}>{item.Text}</Text>
      <Text style={styles.cardCount}>{item.cardCount} cards</Text>

      {menuVisible === item.id && (
        <View style={styles.menuContainer}>
          <Pressable
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(null);
              router.push(`/(decks)/(editDeck)/${item.id}`);
            }}
          >
            <Text style={styles.menuText}>Edit</Text>
          </Pressable>
          <Pressable
            style={styles.menuItem}
            onPress={async () => {
              setMenuVisible(null);
              await handleDeleteDeck(item.id);
            }}
          >
            <Text style={[styles.menuText, { color: 'red' }]}>Delete</Text>
          </Pressable>
        </View>
      )}
    </TouchableOpacity>
  )}
/>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => router.push('/createDeck')}
      >
        <FontAwesome name="plus-circle" size={64} color="#3A5FCD" />
      </TouchableOpacity>
    </View>
  </TouchableWithoutFeedback>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    fontFamily: "Poppins-Bold",
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
  cardItem: {
    backgroundColor: '#96ACF1',
    borderRadius: 10,
    marginVertical: 10,
    padding: 20,
    width: 361,
    alignSelf: 'center',
    position: 'relative',
    height: 110,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  menuContainer: {
    position: 'absolute',
    right: 10,
    top: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    zIndex: 10,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 5,
  },
  menuText: {
    fontSize: 16,
  },  
  decksText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 20,
    alignSelf: 'flex-start',
    color: '#333',  
  },
    cardCount: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 5,
},
  plusButton: { 
    position: 'absolute',
    right: 25,
    bottom: 25,
  },
});

export default decksPage;