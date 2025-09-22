import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import cronograma from '../../assets/images/cronograma.png';
import fogo from '../../assets/images/fogo.png';
import iconememo from '../../assets/images/iconememo.png';
import lupa from '../../assets/images/lupa.png';
import memobot from '../../assets/images/memobot.png';
import menu from '../../assets/images/menu.png';
import meusdecks from '../../assets/images/meusdecks.png';
import streakEmpty from '../../assets/images/streakEmpty.png';

const homeDashboard = () => {
  const profileName = "Hackathon"; // alocar dinamicamente o nome do perfil
  const streakDaysCounter = 0; // alocar dinamicamente o contador de dias de streak
  const router = useRouter();

  //TODO: Handle latest decks reviews and push to main screen

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconLeft}>
          <Image source={menu} style={styles.iconImage} resizeMode="contain" />
        </TouchableOpacity>
        <Image source={iconememo} style={styles.iconMemo} resizeMode="contain" />
        <TouchableOpacity style={styles.iconRight}>
          <Image source={lupa} style={styles.iconImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <Text style={styles.welcomeText}>Bem-vindo(a), {profileName}</Text>
      <View style={styles.rectangle}>
        <Text style={styles.rectangleTitle}>Flashcards com IA</Text>
        <TextInput
          style={styles.typingSpace}
          placeholder="Gere 5 flashcards sobre..."
          placeholderTextColor="#FBFBFB"
        />
      </View>
     <Text style={styles.categoriesText}>Streak</Text>
     <View style={styles.rectangleStreak}>
      <Image source={fogo} style={styles.fireIcon}/>
      <Text style={styles.streakDaysText}>{streakDaysCounter} days</Text>
      <TouchableOpacity style={styles.streakButton}
      onPress={() => router.push('/ranks')}>
        <Text style={styles.streakButtonText}>Ver Streak</Text>
      </TouchableOpacity>
      <View style={styles.streakWeekRows}>
        <View style={styles.streakWeekRow}>
          {['D', 'S', 'T', 'Q'].map((day, idx) => (
            <View key={idx} style={styles.streakDayItem}>
              <Text style={styles.streakDayLetter}>{day}</Text>
              <Image source={streakEmpty} style={styles.streakEmptyIcon} />
            </View>
          ))}
        </View>
        <View style={styles.streakWeekRow}>
          {['Q', 'S', 'S'].map((day, idx) => (
            <View key={idx} style={styles.streakDayItem}>
              <Text style={styles.streakDayLetter}>{day}</Text>
              <Image source={streakEmpty} style={styles.streakEmptyIcon} />
            </View>
          ))}
        </View>
      </View>
     </View>
     <Text style={styles.categoriesText}>Categorias</Text>
      <View style={styles.squareContainers}>
       <TouchableOpacity style={styles.square}
       onPress={() => router.push('/decks')}>
         <Image source={meusdecks} style={styles.squareImage} resizeMode="contain"/>
         <Text style={styles.squareText}>Meus Decks</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.square}
       onPress={() => router.push('/memoBot')}>
         <Image source={memobot} style={styles.squareImage} resizeMode="contain"/>
         <Text style={styles.squareText}>MemoBot</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.square}>
         <Image source={cronograma} style={styles.squareImage} resizeMode="contain"/>
         <Text style={styles.squareText}>Cronograma</Text>
       </TouchableOpacity>
     </View>
     <Text style={styles.categoriesText}>Ultimas revisões</Text>

    
    </View>
  );
}

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
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 20,
    alignSelf: 'left',
    color: '#333',
  },
  rectangle: {
    width: 361,
    height: 110,
    backgroundColor: '#3A5FCD',
    borderRadius: 20,
    marginTop: 15,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rectangleTitle: {
    color: '#FBFBFB',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 10,
    alignSelf: 'flex-start',
    marginLeft: 25,
  },
  typingSpace: {
    width: 321,
    height: 39,
    backgroundColor: '#96ACF1',
    borderRadius: 15,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  rectangleStreak: {
    backgroundColor: '#96ACF1',
    borderRadius: 20,
    width: 361,
    height: 80,
    marginTop: 15,
  },
  fireIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    marginTop: 13,
    marginLeft: 15,
  },
  streakDaysText: {
    fontSize: 14,
    color: '#3A5FCD',
    fontWeight: 'bold',
    position: 'absolute',
    marginLeft: 15,
    marginTop: 53,
  },
  streakButton: {
    backgroundColor: '#3A5FCD',
    borderRadius: 25,
    alignSelf: 'flex-end',
    height: 30,
    width: 108,
    marginTop: 25,
    marginRight: 25,
  },
  streakButtonText: {
    color: '#FBFBFB',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 4,
  },
  streakWeekRows: {
    marginTop: -53,
    marginLeft: -38,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakWeekRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 3,
  },
  streakWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: -35,
    width: '100%',
    gap: 2,
  },
  streakDayItem: {
    alignItems: 'center',
    width: 30,
  },
  streakDayLetter: {
    fontSize: 12,
    color: '#3A5FCD',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  streakEmptyIcon: {
    width: 18,
    height: 18,
  },
  categoriesText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,  
    alignSelf: 'flex-start',
    marginLeft: 25,
  },
  squareContainers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: 340,
    marginTop: 10,
    marginBottom: 10,
  },
  square: {
    width: 90,
    height: 90,
    backgroundColor: '#3A5FCD',
    borderRadius: 16,
  },
  squareImage: {
    width: 44,
    height: 44,
    alignSelf: 'center',
    marginTop: 18,
  },
  squareText: {
    fontSize: 14,
    color: '#FBFBFB',
    alignSelf: 'center',
  }
});

export default homeDashboard;