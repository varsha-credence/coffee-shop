import useStatusBar from '@/route/UseStatusbar';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { coffeeData } from '@/component/Card';

const DetailsScreen = () => {
    useStatusBar('#f9f9f9', 'dark-content');
    const params = useLocalSearchParams();
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [selectedButton, setSelectedButton] = useState('S');
    const [isSaved, setIsSaved] = useState(false);
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)
    const buttons = [
        { id: '1', title: 'S' },
        { id: '2', title: 'M' },
        { id: '3', title: 'L' },
    ]

    // let sizes = [];
    // try {
    //     sizes = JSON.parse(params.sizes || '[]');
    // } catch (error) {
    //     console.error('Failed to parse sizes:', error);
    // }

    // console.log('params:', params);
    // console.log('sizes:', sizes);
    // console.log("sizesss:", JSON.stringify(coffeeData[1].sizes, null, 2));


    const sizes = JSON.parse(params.sizes || '[]');
    // console.log("Sizes array:", sizes);



    useEffect(() => {
        const isItemSaved = favorites.some(fav => fav.id === params.id);
        setIsSaved(isItemSaved);
    }, [favorites, params.id]);

    const handleFavorite = (item) => {
        const isItemSaved = favorites.some(fav => fav.id === item.id);

        if (isItemSaved) {
            dispatch(removeFavorite(item));
            setIsSaved(false);
            Toast.show({
                type: 'info',
                text1: 'Unsaved!',
                text2: `${item.name} has been removed from favorites.`,
                position: 'bottom',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                props: {
                    style: {
                        height: 100,
                        width: '80%',
                        backgroundColor: 'purple',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    },
                    text1Style: {
                        color: 'red',
                        fontSize: 18,
                        fontWeight: 'bold',
                    },
                    text2Style: {
                        color: 'yellow',
                        fontSize: moderateScale(25),
                    },
                },
            });
        } else {
            dispatch(addFavorite(item));
            setIsSaved(true);
            Toast.show({
                type: 'success',
                text1: 'Saved!',
                text2: `${item.name} has been added to favorites.`,
                position: 'bottom',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        }

        // console.log(favorites);
    };

    const renderButton = ({ item }) => {
        console.log('Button Item:', item);

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={[
                    styles.button,
                    selectedButton === item.size
                        ? {
                            backgroundColor: '#faf2ec',
                            borderColor: '#ce8c5b',
                            borderWidth: moderateScale(1)
                        }
                        : {
                            backgroundColor: '#ffffff',
                            borderColor: '#e3e3e3',
                            borderWidth: moderateScale(1)
                        }
                ]}
                onPress={() => setSelectedButton(item.size)}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                        style={[
                            styles.buttonText,
                            selectedButton === item.size
                                ? { color: '#ce8c5b' }
                                : { color: '#2e2e2e' }
                        ]}
                    >
                        {item.size}
                    </Text>
                    <Text
                        style={[
                            styles.buttonText,
                            selectedButton === item.size
                                ? { color: '#975d48' }
                                : { color: '#2e2e2e' }
                        ]}
                    >
                        ₹{item.price}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <GestureHandlerRootView>
            <View
                style={{
                    flex: 1,
                    padding: moderateScale(20),
                    backgroundColor: '#f9f9f9'
                }}
            >
                <View>
                    <Image
                        source={params.image}
                        style={{
                            width: 'auto',
                            height: moderateScale(250),
                            borderRadius: moderateScale(20),
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => handleFavorite(params)}
                        style={{
                            backgroundColor: '#c67c4e',
                            position: 'absolute',
                            right: moderateScale(15),
                            top: moderateScale(10),
                            padding: moderateScale(10),
                            borderRadius: moderateScale(30),
                        }}
                    >
                        {isSaved ? (
                            <Ionicons name="heart" size={moderateScale(30)} color="#ffffff" />
                        ) : (
                            <Image
                                source={require('@/assets/icons/Heart.png')}
                                style={{
                                    height: moderateScale(30),
                                    width: moderateScale(30),
                                    tintColor: '#ffffff'
                                }}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        fontSize: moderateScale(24),
                        fontWeight: 'bold',
                        marginTop: moderateScale(20)
                    }}
                >
                    {params.name}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: moderateScale(14),
                            color: '#afafaf',
                            marginTop: moderateScale(5)
                        }}
                    >
                        {params.title}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: moderateScale(16)
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#f5f5f5',
                                padding: moderateScale(6),
                                borderRadius: moderateScale(10)
                            }}
                        >
                            <Image
                                style={{
                                    width: moderateScale(30),
                                    height: moderateScale(30),
                                }}
                                source={require('@/assets/icons/bike.png')}
                            />
                        </View>
                        <View
                            style={{
                                backgroundColor: '#f5f5f5',
                                padding: moderateScale(8),
                                borderRadius: moderateScale(10)
                            }}
                        >
                            <Image
                                style={{
                                    width: moderateScale(25),
                                    height: moderateScale(25),
                                }}
                                source={require('@/assets/icons/bean.png')}
                            />
                        </View>
                        <View
                            style={{
                                backgroundColor: '#f5f5f5',
                                padding: moderateScale(8),
                                borderRadius: moderateScale(10)
                            }}
                        >
                            <Image
                                style={{
                                    width: moderateScale(25),
                                    height: moderateScale(25),
                                }}
                                source={require('@/assets/icons/milk.png')}
                            />
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: moderateScale(5),
                        marginTop: moderateScale(10),
                        marginBottom: moderateScale(2),
                    }}
                >
                    <FontAwesome5 name='star' size={28} color='#f9bf23' solid />
                    <Text
                        style={{
                            alignItems: 'center',
                            fontSize: moderateScale(22),
                            fontWeight: '700'
                        }}
                    >
                        {params.rating}
                    </Text>
                </View>
                <Text
                    style={{
                        borderBottomWidth: moderateScale(1),
                        borderColor: '#b8b8b8',
                        marginHorizontal: moderateScale(20)
                    }}
                />
                <View
                    style={{
                        marginTop: moderateScale(14)
                    }}
                >
                    <Text
                        style={{
                            fontSize: moderateScale(18),
                            fontWeight: '600',
                            marginBottom: moderateScale(10)
                        }}
                    >
                        Description
                    </Text>
                    <View >
                        <Text
                            style={{
                                color: '#a3a3a3',
                                fontSize: moderateScale(14),
                                lineHeight: moderateScale(20),
                                letterSpacing: moderateScale(0.7),
                                textAlign: 'auto',
                            }}
                            numberOfLines={showFullDescription ? 0 : 3}
                        >
                            {params.description}
                        </Text>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setShowFullDescription(!showFullDescription)}>
                            <Text
                                style={{
                                    color: '#c87e59',
                                    fontSize: moderateScale(16),
                                    fontWeight: '600'
                                }}
                            >
                                {showFullDescription ? 'Show Less' : 'Read More'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    style={{
                        marginTop: moderateScale(20),
                    }}
                >
                    <Text
                        style={{
                            fontSize: moderateScale(18),
                            fontWeight: '600',
                            marginBottom: moderateScale(12)
                        }}
                    >
                        Size
                    </Text>
                    <View>
                        <FlatList
                            data={sizes}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderButton}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </View>
            <View
                style={{
                    backgroundColor: '#ffffff',
                    paddingHorizontal: moderateScale(30),
                    paddingTop: moderateScale(15),
                    paddingBottom: moderateScale(30),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: moderateScale(120),
                    borderRadius: moderateScale(20)
                }}
            >
                <View>
                    <Text
                        style={{
                            color: '#9a9a9a',
                            fontSize: moderateScale(16),
                            fontWeight: '400',
                            marginBottom: moderateScale(8)
                        }}
                    >
                        Price
                    </Text>
                    <Text
                        style={{
                            color: '#c67c4e',
                            fontSize: moderateScale(20),
                            fontWeight: '800'
                        }}
                    >
                        ₹ {params.price}
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                        backgroundColor: '#c67c4e',
                        paddingHorizontal: moderateScale(75),
                        paddingVertical: moderateScale(16),
                        borderRadius: moderateScale(15)
                    }}
                >
                    <Text
                        style={{
                            color: '#f5fff3',
                            fontSize: moderateScale(18),
                            fontWeight: '500'
                        }}
                    >
                        Buy Now
                    </Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: moderateScale(15),
        width: moderateScale(104),
        paddingVertical: moderateScale(10),
        marginRight: moderateScale(20),
        borderRadius: moderateScale(15),
        justifyContent: 'space-between',
        marginTop: moderateScale(8)
    },
    buttonText: {
        fontSize: moderateScale(18),
        fontWeight: '500',
    }
});
