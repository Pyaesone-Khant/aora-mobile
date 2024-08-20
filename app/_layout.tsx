import React, { useEffect } from 'react';

// fonts
import { useFonts } from 'expo-font';

// components
import { SplashScreen, Stack } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const RootPage = () => {

    // loading fonts in rn
    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    });

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error])

    if (!fontsLoaded && !error) return null;

    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerShown: false, title: "index"
            }} />
            <Stack.Screen name="(auth)" options={{
                headerShown: false
            }} />
            <Stack.Screen name="(tabs)" options={{
                headerShown: false
            }} />
            {/* <Stack.Screen name="/search/[query]" options={{
                headerShown: false
            }} /> */}
        </Stack>
    )
}

export default RootPage