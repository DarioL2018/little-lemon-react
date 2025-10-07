import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import heroImage from '../assets/images/hero-image.png';

export default function BannerHome({ searchText, setSearchText }) {
    return <View style={styles.heroSection}>
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
                style={styles.heroImage} />
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color="gray" />
            <TextInput
                style={styles.searchInput}
                placeholder="Search menu"
                value={searchText}
                onChangeText={setSearchText} />
        </View>
    </View>;
}

const styles = StyleSheet.create({
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
});