import { Stack } from 'expo-router';

const creatingDecksLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="createDeck" options={{ headerShown: false }} />
            <Stack.Screen name="(deckDetails)" options={{ headerShown: false }} />
        </Stack>
    );
};

export default creatingDecksLayout;