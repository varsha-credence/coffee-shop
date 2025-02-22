import React, { useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import Toast from 'react-native-toast-message';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../store/favoritesSlice';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


const Faviroute = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);
    const scaleValue = useRef(new Animated.Value(1)).current;


    const handleUnsave = (item) => {
        dispatch(removeFavorite(item));
        Toast.show({
            type: 'info',
            text1: 'Unsaved!',
            text2: `${item.name} has been removed from favorites.`,
            position: 'bottom',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
    };

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const handleRecentClick = (item) => {
        router.push({
            pathname: '/Screens/DetailsScreen',
            params: {
                id: item.id,
                title: item.title,
                rating: item.rating,
                image: item.image,
                price: item.price,
                name: item.name,
                description: item.description,
            },
        });
    };

    const renderItem = ({ item }) => (
        <View
            style={{
                flexDirection: 'row',
                marginBottom: moderateScale(20),
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: moderateScale(10)
            }}
        >
            <TouchableOpacity
                onPress={() => handleRecentClick(item)}
                activeOpacity={0.7}
            >
                <Image
                    source={item.image}
                    style={{
                        width: moderateScale(180),
                        height: moderateScale(150),
                        borderRadius: moderateScale(20),
                        borderColor: '#c67c4e',
                        borderWidth: moderateScale(1)
                    }}
                />
            </TouchableOpacity>
            <View
                style={{
                    flex: 1,
                    // alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: moderateScale(16),
                        color: '#313131',
                    }}
                >
                    {item.name}
                </Text>
                <Text
                    style={{
                        fontWeight: '400',
                        fontSize: moderateScale(12),
                        color: '#afafaf',
                        marginTop: moderateScale(8)
                    }}
                >
                    {item.title}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={() => handleUnsave(item)}
                    style={{
                        marginTop: moderateScale(10),
                        backgroundColor: '#c67c4e',
                        paddingVertical: moderateScale(5),
                        // paddingHorizontal: moderateScale(15),
                        borderRadius: moderateScale(5),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: moderateScale(10)
                        }}
                    >
                        <Animated.Text
                            style={{
                                color: '#fff',
                                fontSize: moderateScale(14),
                                fontWeight: '700',
                                transform: [{ scale: scaleValue }]
                            }}
                        >
                            Unsave
                        </Animated.Text>
                        <Ionicons name="heart" size={moderateScale(24)} color="#ffffff" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View
            style={{
                flex: 1,
                padding: moderateScale(20),
            }}
        >
            <Text
                style={{
                    fontSize: moderateScale(20),
                    fontWeight: 'bold',
                    marginBottom: moderateScale(20),
                }}
            >
                Favorite Items
            </Text>
            {favorites.length === 0 ? (
                <Text
                    style={{
                        fontSize: moderateScale(16),
                        color: 'gray',
                    }}
                >
                    No items saved yet!
                </Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default Faviroute;
