import { Stack } from 'expo-router';

const creatingDecksLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="ranks" options={{ headerShown: false }} />
        </Stack>
    );
};

export default creatingDecksLayout;