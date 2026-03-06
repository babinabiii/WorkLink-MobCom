import { Stack } from "expo-router";

export default function ApplyLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="[jobId]" />
            <Stack.Screen name="success" />
        </Stack>
    );
}
