# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.



1. Macchiato
      Caramel Macchiato✅
      Mocha Macchiato✅
      Iced Macchiato✅
      Vanilla Macchiato✅
      Espresso Macchiato✅
      Hazelnut Macchiato✅
      Cinnamon Macchiato✅
      Almond Macchiato✅
      Coconut Macchiato✅
      Iced Caramel Macchiato✅
      Brown Sugar Macchiato
      Irish Macchiato
      Chocolate Macchiato
      Salted Caramel Macchiato
      Pumpkin Spice Macchiato
      Mocha Almond Macchiato
      Peppermint Macchiato
      Lemon Macchiato
      Rose Macchiato
      Hazelnut Mocha Macchiato
2. Latte
      Vanilla Latte✅
      Caramel Latte✅
      Hazelnut Latte✅
      Iced Latte✅
      Mocha Latte✅
      Almond Latte✅
      Cinnamon Latte✅
      Coconut Latte✅
      Pumpkin Spice Latte✅
      Chai Latte
      Dirty Chai Latte✅
      Iced Vanilla Latte
      Irish Latte
      Maple Latte
      Rose Latte
      Matcha Latte
      Pistachio Latte
      Tiramisu Latte
      Lavender Latte
      Brown Sugar Latte
3. Americano
      Black Americano✅
      Iced Americano✅
      Espresso Americano✅
      Vanilla Americano✅
      Hazelnut Americano✅
      Caramel Americano✅
      Iced Vanilla Americano✅
      Mocha Americano✅
      Iced Hazelnut Americano✅
      Spiced Americano✅
      Iced Caramel Americano
      Almond Americano
      Irish Americano
      Coconut Americano
      Brown Sugar Americano
      Lemon Americano
      Choco Americano
      Pumpkin Spice Americano
      Salted Caramel Americano
      Cinnamony Americano
4. Caffe Mocha
      Iced Mocha✅
      White Chocolate Mocha✅
      Dark Chocolate Mocha✅
      Caramel Mocha✅
      Hazelnut Mocha✅
      Mint Mocha✅
      Coconut Mocha✅
      Mocha Latte✅
      Mocha Frappe✅
      Raspberry Mocha✅
      Tiramisu Mocha
      Cinnamon Mocha
      Mocha Macchiato
      Mocha Creme
      Iced White Mocha
      Mocha Espresso
      Black Forest Mocha
      Mocha Hazelnut Frappe
      Pumpkin Mocha
      Almond Mocha
5. Flat White
      Iced Flat White✅
      Vanilla Flat White✅
      Caramel Flat White✅
      Hazelnut Flat White✅
      Coconut Flat White✅
      Mocha Flat White✅
      Almond Flat White✅
      Spiced Flat White✅
      Iced Vanilla Flat White✅
      Chocolate Flat White✅
      Maple Flat White
      Cinnamon Flat White
      Brown Sugar Flat White
      Matcha Flat White
      Rose Flat White
      Pistachio Flat White
      Iced Hazelnut Flat White
      Lavender Flat White
      Irish Flat White
      Lemon Flat White
6. Espresso
      Espresso Con Panna✅
      Iced Espresso✅
      Espresso Macchiato✅
      Double Espresso✅
      Single Espresso✅
      Ristretto Espresso✅
      Espresso Romano✅
      Espresso Doppio✅
      Iced Caramel Espresso✅
      Mocha Espresso✅
      Espresso Lungo
      Espresso Affogato
      Iced Hazelnut Espresso
      Espresso Tonic
      Almond Espresso
      Lemon Espresso
      Iced Vanilla Espresso
      Irish Espresso
      Cinnamon Espresso
      Salted Caramel Espresso



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
import React, { useState } from 'react'
import useStatusBar from '@/route/UseStatusbar'
import { moderateScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { buttonsData, coffeeData } from '@/component/Card';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Home = () => {
    useStatusBar('#1e1e1e', 'light-content');
    const router = useRouter();
    const [filteredCoffee, setFilteredCoffee] = useState(coffeeData);
    const [selectedButton, setSelectedButton] = useState('All Coffee');
    const [isVisible, setIsVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart?.items || {});

    console.log("isVisible set to:", true);

    const openBottomSheet = (item) => {
        console.log("BottomSheet opened for item sizes:", item.sizes);
        const isItemInCart = cart.some(cartItem => cartItem.id === item.id);
        if (isItemInCart) {
            return;
        }
        setSelectedItem(item);
        setSelectedSize(item.sizes[0]);
        setIsVisible(true);
        console.log("isVisible set to:", true);
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
                        onPress={() => openBottomSheet(item)}
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
                    <BottomSheet
                        index={isVisible ? 0 : -1}
                        snapPoints={["40%", "60%"]}
                        onChange={(index) => setIsVisible(index !== -1)}
                    >
                        {selectedItem && (
                            <BottomSheetView style={{ padding: moderateScale(20) }}>
                                <Text style={{ fontSize: moderateScale(18), fontWeight: 'bold', marginBottom: moderateScale(10) }}>Select Size</Text>
                                {selectedItem.sizes.map((size) => (
                                    <TouchableOpacity
                                        key={size.id}
                                        onPress={() => setSelectedSize(size)}
                                        style={[
                                            styles.sizeButton,
                                            selectedSize?.id === size.id && styles.selectedSizeButton,
                                        ]}
                                    >
                                        <Text style={{ fontSize: moderateScale(16) }}>{size.size} - ₹{size.price}</Text>
                                    </TouchableOpacity>
                                ))}
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: moderateScale(20) }}>
                                    <TouchableOpacity
                                        onPress={() => dispatch(removeFromCart({ ...selectedItem, ...selectedSize }))}
                                        style={styles.cartButton}
                                    >
                                        <Text style={{ fontSize: moderateScale(20) }}>➖</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: moderateScale(18) }}>{cart[selectedSize?.size]?.quantity || 0}</Text>
                                    <TouchableOpacity
                                        onPress={() => dispatch(addToCart({ ...selectedItem, ...selectedSize }))}
                                        style={styles.cartButton}
                                    >
                                        <Text style={{ fontSize: moderateScale(20) }}>➕</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    onPress={() => setIsVisible(false)}
                                    style={styles.goToCartButton}
                                >
                                    <Text style={{ fontSize: moderateScale(16), color: 'white' }}>Go to Cart</Text>
                                </TouchableOpacity>
                            </BottomSheetView >
                        )}
                    </BottomSheet>
                    {Object.keys(cart).length > 0 && (
                        <View style={{ position: "absolute", bottom: 0, width: "100%", backgroundColor: "black", padding: 10 }}>
                            <TouchableOpacity
                                onPress={() => router.push('/Cart')}
                                style={{ alignItems: "center" }}
                            >
                                <Text style={{ color: "white" }}>Go to Cart ({Object.keys(cart).length})</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
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
    selectedSizeButton: {
        backgroundColor: '#cb7b48',
    },
    cartButton: {
        padding: moderateScale(10),
        borderRadius: moderateScale(10),
        backgroundColor: '#f5f5f5',
    },
    goToCartButton: {
        marginTop: moderateScale(20),
        padding: moderateScale(15),
        borderRadius: moderateScale(10),
        backgroundColor: '#cb7b48',
        alignItems: 'center',
    }
});



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
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Home = () => {
    useStatusBar('#1e1e1e', 'light-content');
    const router = useRouter();
    const [filteredCoffee, setFilteredCoffee] = useState(coffeeData);
    const [selectedButton, setSelectedButton] = useState('All Coffee');
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

    const handleSheetChange = useCallback((index: number) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index: number) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);


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
                        onPress={() => handleClosePress()}
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
            </KeyboardAvoidingView>
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enableDynamicSizing={false}
                onChange={handleSheetChange}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text>Awesome 🔥</Text>
                </BottomSheetView>
            </BottomSheet>
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
    selectedSizeButton: {
        backgroundColor: '#cb7b48',
    },
    cartButton: {
        padding: moderateScale(10),
        borderRadius: moderateScale(10),
        backgroundColor: '#f5f5f5',
    },
    goToCartButton: {
        marginTop: moderateScale(20),
        padding: moderateScale(15),
        borderRadius: moderateScale(10),
        backgroundColor: '#cb7b48',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
        backgroundColor: 'green'
    },
});