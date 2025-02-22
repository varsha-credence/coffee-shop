import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import useStatusBar from '@/route/UseStatusbar'
import { moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { buttonsData, coffeeData } from '@/component/Card';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Home = () => {
    useStatusBar('#1e1e1e', 'light-content');
    const router = useRouter();
    const [filteredCoffee, setFilteredCoffee] = useState(coffeeData);
    const [selectedButton, setSelectedButton] = useState('All Coffee');
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["1%", "25%", "40%"], []);

    const openBottomSheet = () => {
        sheetRef.current?.expand();
    };


    const filterCoffee = (title) => {
        if (title === 'All Coffee') {
            setFilteredCoffee(coffeeData);
        } else {
            const filtered = coffeeData.filter(item => item.title === title);
            setFilteredCoffee(filtered);
        }
        setSelectedButton(title);
    };

    const renderButton = ({ item }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.button,
                    selectedButton === item.title ? {
                        backgroundColor: '#cb7b48',
                    } : {
                        backgroundColor: '#f5f5f5',
                    }
                ]}
                onPress={() => filterCoffee(item.title)}
            >
                <Text
                    style={[
                        styles.buttonText,
                        selectedButton === item.title ? {
                            color: '#fdfbff'
                        } : {
                            color: '#484848'
                        }
                    ]}
                >
                    {item.title}
                </Text>
            </TouchableOpacity >
        )
    }

    const renderCoffee = ({ item }) => {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    marginHorizontal: moderateScale(8),
                    gap: moderateScale(10),
                    marginVertical: moderateScale(15),
                    backgroundColor: '#ffffff',
                    width: 'auto',
                    height: 'auto',
                    paddingVertical: moderateScale(10),
                    paddingHorizontal: moderateScale(8),
                    borderRadius: moderateScale(20),
                    elevation: moderateScale(0.9)
                }}
            >
                <View>
                    <Image
                        source={item.image}
                        style={{
                            width: 'auto',
                            height: moderateScale(140),
                            borderRadius: moderateScale(12),
                        }}
                    />
                    <Text style={{
                        fontSize: moderateScale(12),
                        fontWeight: '700',
                        color: '#ffffff',
                        padding: moderateScale(5),
                        alignSelf: 'flex-start',
                        borderRadius: moderateScale(5),
                        backgroundColor: '#201818',
                        position: 'absolute',
                        top: moderateScale(8),
                        left: moderateScale(8),
                    }}
                    >
                        {item.title}
                    </Text>
                </View>

                <Text
                    style={{
                        fontSize: moderateScale(16),
                        fontWeight: '800',
                        color: '#2c2c2c'
                    }}
                >
                    {item.name}
                </Text>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{
                        fontSize: moderateScale(18),
                        fontWeight: '700',
                        color: '#242424',
                        alignItems: 'center'
                    }}
                    >
                        ₹ {item.price}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={openBottomSheet}
                    >
                        <Image
                            source={require('@/assets/icons/plus.png')}
                            style={{
                                width: moderateScale(28),
                                height: moderateScale(28),
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <GestureHandlerRootView>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#f9f9f9',
                    }}>
                    {/* Location & Search Bar */}
                    <View
                        style={{
                            paddingBottom: moderateScale(100),
                            padding: moderateScale(20),
                            backgroundColor: '#1e1e1e',
                        }}
                    >
                        {/* Location */}
                        <View
                            style={{
                                marginBottom: moderateScale(20),
                            }}
                        >
                            <Text
                                style={{
                                    color: '#9e9e9e',
                                    fontSize: moderateScale(14),
                                }}
                            >
                                Location
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: moderateScale(5),
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: moderateScale(16),
                                        marginRight: moderateScale(5),
                                    }}
                                >
                                    Bilzen, Tanjungbalai
                                </Text>
                                <Ionicons name="chevron-down" size={18} color="white" />
                            </View>
                        </View>

                        {/* Serach Bar */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: moderateScale(10)
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: '#2a2a2a',
                                    borderRadius: moderateScale(10),
                                    paddingHorizontal: moderateScale(10),
                                    height: moderateScale(50),
                                }}
                            >
                                <Image
                                    source={require('@/assets/icons/Search.png')}
                                    style={{
                                        width: moderateScale(22),
                                        height: moderateScale(22),
                                        tintColor: 'white'
                                    }}
                                />
                                <TextInput
                                    style={{
                                        flex: 1,
                                        color: 'white',
                                        fontSize: moderateScale(16),
                                        marginLeft: moderateScale(10),
                                    }}
                                    placeholder="Search coffee"
                                    placeholderTextColor="#9e9e9e"
                                    onPress={() => router.push('/Screens/SearchScreen')}
                                />
                            </View>
                            <TouchableOpacity
                                style={{
                                    marginLeft: moderateScale(10),
                                    backgroundColor: '#c67c4e',
                                    borderRadius: moderateScale(10),
                                    padding: moderateScale(12),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    source={require('@/assets/icons/Filter.png')}
                                    style={{
                                        width: moderateScale(22),
                                        height: moderateScale(22),
                                        tintColor: 'white'
                                    }}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Promo Banner */}
                        <View
                            style={{
                                position: 'absolute',
                                top: moderateScale(165),
                                left: 0,
                                right: 0,
                                alignItems: 'center',
                                zIndex: 1,
                                // backgroundColor: 'green',
                                // borderRadius: moderateScale(20),
                            }}
                        >
                            <View
                                style={{
                                    width: '89%',
                                    height: moderateScale(140),
                                    borderRadius: moderateScale(20),
                                    backgroundColor: 'green',
                                    overflow: 'hidden',
                                }}
                            >
                                <Image
                                    source={require('@/assets/images/promo.png')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'contain'
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    {/* FLATLIST */}
                    <View
                        style={{
                            flex: 1,
                            // paddingHorizontal: moderateScale(20),
                            paddingTop: moderateScale(100),
                            backgroundColor: '#f9f9f9',
                            paddingBottom: moderateScale(20)
                        }}
                    >
                        <View>
                            <FlatList
                                data={buttonsData}
                                keyExtractor={(item) => item.id}
                                renderItem={renderButton}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    marginBottom: moderateScale(15),
                                    marginHorizontal: moderateScale(20)
                                }}
                            />
                        </View>
                        <FlatList
                            data={filteredCoffee}
                            keyExtractor={(item) => item.id}
                            renderItem={renderCoffee}
                            numColumns={2}
                            style={{
                                // marginBottom: moderateScale(15),
                                marginHorizontal: moderateScale(10)
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    {/* {Object.keys(cart).length > 0 && (
                        <View style={{ position: "absolute", bottom: 0, width: "100%", backgroundColor: "black", padding: 10 }}>
                            <TouchableOpacity
                                onPress={() => router.push('/Cart')}
                                style={{ alignItems: "center" }}
                            >
                                <Text style={{ color: "white" }}>Go to Cart ({Object.keys(cart).length})</Text>
                            </TouchableOpacity>
                        </View>
                    )} */}
                </View>
                <BottomSheet
                    ref={sheetRef}
                    enablePanDownToClose={true}
                    snapPoints={snapPoints}
                >
                    <BottomSheetView style={{ padding: 20 }}>
                        <Text>Select Size:</Text>
                        {['Small', 'Medium', 'Large'].map((size) => (
                            <TouchableOpacity key={size} >
                                <Text style={{ fontSize: 18 }}>{size}</Text>
                            </TouchableOpacity>
                        ))}
                    </BottomSheetView>
                </BottomSheet>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
}

export default Home;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: moderateScale(12),
        // paddingTop: moderateScale(4),
        // paddingBottom: moderateScale(8),
        paddingVertical: moderateScale(8),
        // alignItems: 'center',
        marginRight: moderateScale(10),
        borderRadius: moderateScale(10),
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: moderateScale(18),
        fontWeight: '600',
        // alignItems: 'center'
    },
    sizeButton: {
        padding: moderateScale(10),
        marginVertical: moderateScale(5),
        borderRadius: moderateScale(10),
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        backgroundColor: "green",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
    },
});