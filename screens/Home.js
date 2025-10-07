// Menu.js
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';
import BannerHome from '../components/BannerHome';
import CategoryList from '../components/CategoryList';
import DishList from '../components/DishList';
import HeaderHome from '../components/HeaderHome';
import {
    createTable,
    filterByQueryAndCategories,
    getMenuItems,
    saveMenuItems
} from '../database';
export default function Home(props) {
    const [searchText, setSearchText] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [menu, setMenu] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL =
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

    useEffect(() => {
        (async () => {
            try {
                await createTable();
                let menuItems = await getMenuItems();

                if (!menuItems.length) {
                    const menuItemsFromAPI = await fetchData();
                    await saveMenuItems(menuItemsFromAPI);
                    menuItems = menuItemsFromAPI;
                }

                setMenu(menuItems);
                setFilteredMenu(menuItems); // inicialmente sin filtros
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


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 500); // 500ms requerido por el Step 4

        return () => clearTimeout(handler); // cleanup: cancelar timeout previo si sigue escribiendo
    }, [searchText]);


    useEffect(() => {
        runFilter(debouncedSearch);
    }, [debouncedSearch]);


    const runFilter = async (query) => {
        try {
            const result = await filterByQueryAndCategories(query, selectedCategories);
            setFilteredMenu(result);
        } catch (error) {
            console.error('Error filtering from database:', error);
        }
    };

    useEffect(() => {        
        runFilter(searchText);
    }, [selectedCategories]);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <HeaderHome navigation={props.navigation} />
            <BannerHome searchText={searchText} setSearchText={setSearchText} />
            <CategoryList selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
            {/* MENU LIST */}
            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            ) : (
                <DishList filteredMenu={filteredMenu} />

            )}
        </SafeAreaView>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },




});




