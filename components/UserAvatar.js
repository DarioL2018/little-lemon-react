import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const CHARCOAL = '#495E57';

const UserAvatar = ({
    firstNameExternal = null,
    lastNameExternal = null,
    uriExternal = null,
    size = 50
}) => {
    const [imageUri, setImageUri] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // Cargar imagen del almacenamiento

    const loadImage = async () => {
            const uri = await AsyncStorage.getItem('kAvatarImage');
            if (uriExternal !== "" || uri) {
                setImageUri(uri);
            } else {
                setImageUri(null);
            }              

            if (firstNameExternal === null) {
                setFirstName((await AsyncStorage.getItem('kFirstName')) || '');
            } else setFirstName(firstNameExternal);

            if (lastNameExternal === null) {
                setLastName((await AsyncStorage.getItem('kLastName')) || '');
            } else setLastName(lastNameExternal);
        };

    useEffect(() => {  
        loadImage();
    }, [uriExternal]);

    const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadImage();
    }
  }, [isFocused]);
    
    useEffect(() => {
        setFirstName(firstNameExternal);
        setLastName(lastNameExternal);
    }, [firstNameExternal, lastNameExternal]);
    
    const initials =
        (firstName?.[0]?.toUpperCase() || '') +
        (lastName?.[0]?.toUpperCase() || '');

    const AvatarContent = () => {
        if (imageUri) {
            return <Image source={{ uri: imageUri }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />;
        } else {
            return (
                <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2 }]}>
                    <Text style={styles.initials}>{initials || '?'}</Text>
                </View>
            );
        }
    };

    return <AvatarContent />;
};

const styles = StyleSheet.create({
    image: {
        backgroundColor: '#eee',
    },
    placeholder: {
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    initials: {
        color: CHARCOAL,
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default UserAvatar;
