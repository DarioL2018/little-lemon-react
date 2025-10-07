import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function DishList({ filteredMenu }) {
    return <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
            <View style={styles.dishItem}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.dishTitle}>{item.title}</Text>
                    <Text style={styles.dishDescription} numberOfLines={3} ellipsizeMode="tail">{item.description}</Text>
                    <Text style={styles.dishPrice}>${item.price}</Text>
                </View>
                <Image
                    source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }}
                    style={styles.dishImage}
                    resizeMode="cover" />
            </View>
        )}  />;
}

const styles = StyleSheet.create({
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