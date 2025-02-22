import React, { createContext, useContext } from 'react';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';

const FontContext = createContext();

export const useFont = () => useContext(FontContext);

export const FontProvider = ({ children }) => {
    let [fontsLoaded] = useFonts({
        'Sora': require('./fonts/assets/fonts/Sora-VariableFont_wght.ttf'),
        // 'Sora-Bold': require('./fonts/Sora-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <FontContext.Provider value={{ fontFamily: 'Sora' }}>
            {children}
        </FontContext.Provider>
    );
};
