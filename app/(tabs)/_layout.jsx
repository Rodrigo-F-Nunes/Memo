import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import chat from '../../assets/images/chat.png';
import home from '../../assets/images/home.png';
import decks from '../../assets/images/meusdecks.png';

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'white',
      tabBarStyle: { backgroundColor: '#3A5FCD', height: 80 },
      headerShown: false,
     }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Image source={home} style={{ width: 28, height: 28, tintColor: color, marginTop: 5 }} />,
        }}
      />
      <Tabs.Screen
        name="decks"
        options={{
          title: 'Decks',
          tabBarIcon: ({ color }) => <Image source={decks} style={{ width: 28, height: 28, tintColor: color, marginTop: 5 }} />,
        }}
      />
      <Tabs.Screen
        name="memoBot"
        options={{
          title: 'MemoBot',
          tabBarIcon: ({ color }) => <Image source={chat} style={{ width: 28, height: 28, tintColor: color, marginTop: 5 }} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} style={{ marginTop: 1 }} />,
        }}
      />
    </Tabs>
  );
}
export default TabLayout;