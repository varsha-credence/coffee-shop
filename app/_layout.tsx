import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import Toast from 'react-native-toast-message'
import { PersistGate } from 'redux-persist/integration/react'
const _App = () => {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='(Navigation)' />
                        <Stack.Screen name='index' />
                    </Stack>
                </PersistGate>
            </Provider>
            <Toast />
        </>
    )
}

export default _App