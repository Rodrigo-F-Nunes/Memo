import { Stack } from 'expo-router';

const creatingDecksLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
    );
};

export default creatingDecksLayout;