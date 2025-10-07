import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CategoryList({ selectedCategories, setSelectedCategories }) {
    const categories = ['starters', 'mains', 'desserts'];

    const toggleCategory = (cat) => {
        if (selectedCategories.includes(cat)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== cat));
        } else {
            setSelectedCategories([...selectedCategories, cat]);
        }
    };
    return (
        <View style={styles.categoriesContainer}>
            <Text style={styles.categoryTitle}>ORDER FOR DELIVERY!</Text>
            <View style={styles.categories}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.categoryButton,
                            selectedCategories.includes(cat) && styles.categorySelected,
                        ]}
                        onPress={() => toggleCategory(cat)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategories.includes(cat) && styles.categoryTextSelected,
                            ]}
                        >
                            {formatCamelCase(cat)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    function formatCamelCase(text) {
        if (!text) return '';
        return text
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/^./, (str) => str.toUpperCase());
    }
}

const styles = StyleSheet.create({
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
});