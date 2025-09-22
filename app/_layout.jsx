import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(decks)" options={{ headerShown: false }} />
      <Stack.Screen name="(scrpits)" options={{ headerShown: false }} />
      <Stack.Screen name="(ranking)" options={{ headerShown: false }} />
    </Stack>
  );
}
