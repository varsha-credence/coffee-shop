import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { moderateScale } from 'react-native-size-matters'
import useStatusBar from '@/route/UseStatusbar'

const index = () => {
  useStatusBar('black', 'light-content');
  const router = useRouter()
  const handleSwitch = () => {
    router.navigate('/(Navigation)')
  }
  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}
      >
        <Image source={require('@/assets/images/Coffee-6.png')}
          style={{
            width: 'auto',
            height: moderateScale(550),
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: moderateScale(515),
            // left: moderateScale(50),
            paddingHorizontal: moderateScale(20),
            paddingBottom: moderateScale(25),
            alignItems: 'center',
            justifyContent: 'center',
            gap: moderateScale(10)
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(35),
              fontWeight: '500',
              textAlign: 'center',
              color: 'white',
              lineHeight: moderateScale(45),
            }}
          >
            Fall in Love with {"\n"} coffee in Blissful {"\n"} Delight!
          </Text>
          <Text
            style={{
              color: '#666666',
              textAlign: 'center',
              fontSize: moderateScale(17)
            }}
          >
            Welcome to our cozy coffee corner, where every cup is a delightful for you.
          </Text>
          <TouchableOpacity
            onPress={handleSwitch}
            style={{
              marginTop: moderateScale(20),
              backgroundColor: '#c67c4e',
              paddingHorizontal: moderateScale(130),
              paddingVertical: moderateScale(18),
              borderRadius: moderateScale(15)
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: moderateScale(18),
                fontWeight: '700'
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  )
}

export default index