import React, { useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { coffeeData } from '@/component/Card';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import useStatusBar from '@/route/UseStatusbar';
import { useDispatch, useSelector } from 'react-redux';
import {
    setSearchQuery,
    setSearchResults,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
} from '../store/searchSlice'

const SearchScreen = () => {
    useStatusBar('#ffffff', 'dark-content');
    const router = useRouter();
    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.search.query);
    const searchResults = useSelector((state) => state.search.results);
    const recentSearches = useSelector((state) => state.search.recentSearches);

    const handleSearch = (text) => {
        dispatch(setSearchQuery(text));
        if (text) {
            const results = coffeeData.filter(item =>
                item.name.toLowerCase().includes(text.toLowerCase())
            );
            dispatch(setSearchResults(results));
        } else {
            dispatch(setSearchResults([]));
        }
    };

    const handleRecentClick = (item) => {
        console.log('Item:', item);

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
                sizes: JSON.stringify(item.sizes),
                // sizes: JSON.stringify(coffeeData[0].sizes, null, 2)
            },
        });
    };

    const renderResult = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: moderateScale(20),
            }}
            onPress={() => {
                dispatch(addRecentSearch(item));
                handleRecentClick(item);
            }}
        >
            <View
                style={{
                    width: moderateScale(60),
                    height: moderateScale(60),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: moderateScale(12),
                    borderColor: '#E3E3E3',
                    borderRadius: moderateScale(10),
                    borderWidth: moderateScale(1),
                }}
            >
                <Image
                    style={{
                        width: moderateScale(40),
                        height: moderateScale(40),
                        borderRadius: moderateScale(5),
                    }}
                    source={item.image}
                />
            </View>
            <Text
                style={{
                    fontSize: moderateScale(16),
                    color: '#333',
                }}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    const renderRecentSearch = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                dispatch(addRecentSearch(item));
                handleRecentClick(item);
            }}
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: moderateScale(10),
                marginBottom: moderateScale(16),
            }}
        >
            <View
                style={{
                    position: 'relative'
                }}
            >
                <View
                    style={{
                        width: moderateScale(65),
                        height: moderateScale(65),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: moderateScale(8),
                        borderColor: '#E3E3E3',
                        borderRadius: moderateScale(50),
                        borderWidth: moderateScale(1),
                    }}
                >
                    <Image
                        style={{
                            width: moderateScale(50),
                            height: moderateScale(50),
                            borderRadius: moderateScale(50),
                        }}
                        source={item.image}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => dispatch(removeRecentSearch(item))}
                    style={{
                        backgroundColor: '#f5f5f5',
                        padding: moderateScale(3),
                        borderRadius: moderateScale(50),
                        marginLeft: moderateScale(50),
                        position: 'absolute',
                        top: moderateScale(0.5),
                        right: moderateScale(1)
                    }}
                >
                    <Image
                        style={{
                            width: moderateScale(14),
                            height: moderateScale(14),
                            tintColor: 'black',
                        }}
                        source={require('@/assets/icons/cancel.png')}
                    />
                </TouchableOpacity>
            </View>
            <Text
                style={{
                    fontSize: moderateScale(14),
                    color: '#333',
                    textAlign: 'center',
                    width: moderateScale(70),
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#ffffff',
                paddingHorizontal: moderateScale(20),
                paddingVertical: moderateScale(12),
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: moderateScale(16),
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: '#E3E3E3',
                        borderWidth: moderateScale(2),
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
                            tintColor: '#9e9e9e',
                        }}
                    />
                    <TextInput
                        placeholder="Search coffee..."
                        placeholderTextColor="#9e9e9e"
                        value={searchQuery}
                        onChangeText={handleSearch}
                        style={{
                            flex: 1,
                            color: '#313131',
                            fontSize: moderateScale(16),
                            marginLeft: moderateScale(10),
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            dispatch(setSearchQuery(''));
                            dispatch(setSearchResults([]));
                        }}
                    >
                        <MaterialIcons name="cancel" size={28} color="#9e9e9e" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Recent Searches Section */}
            <View>
                <Text
                    style={{
                        fontSize: moderateScale(18),
                        fontWeight: 'bold',
                        marginBottom: moderateScale(8),
                    }}
                >
                    Recent Searches
                </Text>

                {recentSearches.length > 0 ? (
                    <FlatList
                        data={recentSearches}
                        keyExtractor={(item) => item.id}
                        renderItem={renderRecentSearch}
                        horizontal={true}
                        contentContainerStyle={{
                            marginTop: moderateScale(8),
                            paddingBottom: moderateScale(8),
                        }}
                        showsHorizontalScrollIndicator={false}
                    />
                ) : (
                    <Text
                        style={{
                            textAlign: 'center',
                            color: '#999',
                            fontSize: moderateScale(14),
                            marginTop: moderateScale(10),
                        }}
                    >
                        No results found
                    </Text>
                )}
            </View>

            {/* Search Results Section */}
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={renderResult}
                contentContainerStyle={{ marginTop: moderateScale(8) }}
                ListEmptyComponent={
                    searchQuery ? (
                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#999',
                                fontSize: moderateScale(14),
                            }}
                        >
                            No results found
                        </Text>
                    ) : null
                }
            />
        </View>
    );
};

export default SearchScreen;
