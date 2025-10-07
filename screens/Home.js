// Menu.js
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';
import heroImage from '../assets/images/hero-image.png';
import HeaderHome from '../components/HeaderHome';
import {
    createTable,
    getMenuItems, saveMenuItems
} from '../database';

export default function Home(props) {
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL =
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

    useEffect(() => {
        console.log('Start database setup');
        (async () => {
            try {
                await createTable();
                console.log('Table created or already exists');

                let menuItems = await getMenuItems();
                console.log('Menu items from DB:', menuItems);

                if (!menuItems.length) {
                    const menuItemsFromAPI = await fetchData();
                    saveMenuItems(menuItemsFromAPI);
                    setMenu(menuItemsFromAPI);
                } else {
                    setMenu(menuItems);
                }
            } catch (e) {
                console.error('Database setup error:', e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const json = await response.json();
            return json.menu.map(item => ({
                id: uuidv4(),
                title: item.name,
                price: item.price,
                description: item.description,
                image: item.image,
                category: item.category,
            }));


            //setMenu(json.menu);
        } catch (error) {
            console.error('Error fetching menu:', error);
        } finally {
            setLoading(false);
        }
        return [];
    };

    // === 2. Build predicate/filter ===
    const filteredMenu = useMemo(() => {
        return menu.filter((dish) => {
            const matchesSearch = dish.title.toLowerCase().includes(searchText.toLowerCase());
            const matchesCategory = selectedCategory ? dish.category === selectedCategory : true;
            return matchesSearch && matchesCategory;
        });
    }, [menu, searchText, selectedCategory]);

    // === 3. UI ===
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* HEADER */}
            <HeaderHome navigation={props.navigation} />
            <View style={styles.heroSection}>
                <Text style={styles.topBarText}>Little Lemon</Text>


                {/* HERO SECTION */}
                <View style={styles.hero}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.city}>Chicago</Text>
                        <Text style={styles.heroText}>
                            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                        </Text>
                    </View>

                    <Image
                        source={heroImage}
                        style={styles.heroImage}
                    />
                </View>

                {/* SEARCH BAR */}
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={18} color="gray" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search menu"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>
            </View>
            {/* CATEGORIES */}
            <View style={styles.categoriesContainer}>
                <Text style={styles.categoryTitle}>ORDER FOR DELIVERY!</Text>
                <View style={styles.categories}>
                    {['starters', 'mains', 'desserts'].map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryButton,
                                selectedCategory === cat && styles.categorySelected,
                            ]}
                            onPress={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        >
                            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextSelected]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {/* MENU LIST */}
            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={filteredMenu}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                        <View style={styles.dishItem}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.dishTitle}>{item.title}</Text>
                                <Text style={styles.dishDescription}>{item.description}</Text>
                                <Text style={styles.dishPrice}>${item.price}</Text>
                            </View>
                            <Image
                                source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }}
                                style={styles.dishImage}
                                resizeMode="cover"
                            />
                        </View>
                    )}
                />
                
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    heroSection: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#495E57',
    },
    topBarText: {
        fontSize: 64,
        color: '#F4CE14',
        fontWeight: '600',
    },
    hero: {
        flexDirection: 'row',
        backgroundColor: '#495E57',
        //padding: 20,
        //paddingHorizontal: 20,
        alignItems: 'center',
    },
    city: {
        fontSize: 40,
        color: 'white',
        marginBottom: 8,
    },
    heroText: {
        color: 'white',
        fontSize: 18,
        lineHeight: 22,
    },
    heroImage: {
        width: 140,
        height: 151,
        borderRadius: 10,
        marginLeft: 10,
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        //margin: 15,
        marginVertical: 15,
        padding: 8,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
    },

    categoriesContainer: {
        paddingVertical: 15,
    },

    categoryTitle: {
        fontSize: 20,
        paddingLeft: 20,
        fontWeight: '800'
    },

    categories: {
        flexDirection: 'row',
        //justifyContent: 'space-around',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    categoryButton: {
        paddingVertical: 9,
        paddingHorizontal: 12,
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#EDEFEE',
        borderRadius: 13,
        backgroundColor: '#EDEFEE',
    },
    categorySelected: {
        backgroundColor: '#495E57',
    },
    categoryText: {
        color: '#495E57',
        fontWeight: 'bold',
    },

    categoryTextSelected: {
        color: '#EDEFEE',
        fontWeight: 'bold',
    },
    dishItem: {
        flexDirection: 'row',
        padding: 15,
        borderTopColor: '#eee',
        borderTopWidth: 1,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    dishTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    dishDescription: {
        fontSize: 16,
        color: '#555',
        marginVertical: 10,
    },
    dishPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#495E57',
    },
    dishImage: {
        width: 100,
        height: 100,
        //borderRadius: 10,
        marginLeft: 10,
    },
});
