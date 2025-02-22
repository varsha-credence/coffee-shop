import { useEffect } from 'react';
import { StatusBar } from 'react-native';
// import { StatusBar } from 'expo-status-bar';

const useStatusBar = (backgroundColor, barStyle) => {
    useEffect(() => {
        StatusBar.setBackgroundColor(backgroundColor);
        StatusBar.setBarStyle(barStyle);
    }, [backgroundColor, barStyle]);
};

export default useStatusBar;