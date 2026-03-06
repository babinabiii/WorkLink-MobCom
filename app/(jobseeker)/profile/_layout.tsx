import { Stack } from "expo-router";

export default function ProfileLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="(settings)/edit" />
            <Stack.Screen name="(settings)/privacy" />
            <Stack.Screen name="(settings)/notifications" />
        </Stack>
    );
}
