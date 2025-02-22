import { View, Text, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Octicons } from '@expo/vector-icons'
import { moderateScale } from 'react-native-size-matters'
import { StatusBar } from 'expo-status-bar'

const Tab = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          // tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: {
            height: moderateScale(70),
            paddingTop: moderateScale(12),
            borderTopLeftRadius: moderateScale(25),
            borderTopRightRadius: moderateScale(25),
          }
        }}
      >
        <Tabs.Screen name='index'
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center' }}>
                <Image
                  style={{
                    tintColor: focused ? '#c17e52' : '#adadad',
                    width: moderateScale(24),
                    height: moderateScale(24),
                  }}
                  source={require('@/assets/icons/Home.png')}
                />
                {focused && (<View style={styles.dot} />)}
              </View>
            ),
          }}
        />
        <Tabs.Screen name='Favorites'
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center' }}>
                <Image
                  style={{
                    tintColor: focused ? '#c17e52' : '#adadad',
                    width: moderateScale(24),
                    height: moderateScale(24)
                  }}
                  source={require('@/assets/icons/Heart.png')}
                />
                {focused && (<View style={styles.dot} />)}
              </View>
            ),
          }}
        />
        <Tabs.Screen name='Cart'
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center' }}>
                <Image
                  style={{
                    tintColor: focused ? '#c17e52' : '#adadad',
                    width: moderateScale(24),
                    height: moderateScale(24)
                  }}
                  source={require('@/assets/icons/Bag.png')}
                />
                {focused && (<View style={styles.dot} />)}
              </View>
            ),
          }}
        />
        <Tabs.Screen name='Notifications'
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center' }}>
                <Image
                  style={{
                    tintColor: focused ? '#c17e52' : '#adadad',
                    width: moderateScale(24),
                    height: moderateScale(24)
                  }}
                  source={require('@/assets/icons/Notification.png')}
                />
                {focused && (<View style={styles.dot} />)}
              </View>
            ),
          }}
        />
      </Tabs>
      <StatusBar style="dark" translucent={false} />
    </>
  )
}

export default Tab

const styles = StyleSheet.create({
  dot: {
    width: moderateScale(12),
    height: moderateScale(5),
    borderRadius: moderateScale(4),
    backgroundColor: '#c67c4e',
    position: 'absolute',
    bottom: -moderateScale(10),
  }
})