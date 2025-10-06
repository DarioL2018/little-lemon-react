import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import UserAvatar from './UserAvatar';

const ProfileImage = ({ firstName, lastName }) => {
    const [imageUri, setImageUri] = useState(null);

    const pickImage = async () => {
        // Pedir permisos
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('We need access to your gallery to upload a profile picture.');
            return;
        }

        // Seleccionar imagen
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType,
            allowsEditing: true,
            aspect: [1, 1], // cuadrada
            quality: 0.8,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImageUri(uri);
            await AsyncStorage.setItem('kAvatarImage', uri);
        }
    };

    const removeImage = async () => {
        setImageUri("");
        await AsyncStorage.removeItem('kAvatarImage');
    };

    return (
        <View style={styles.container}>
            <UserAvatar firstNameExternal={firstName} lastNameExternal={lastName} uriExternal={imageUri} />

            <TouchableOpacity onPress={pickImage} style={[styles.btn, { backgroundColor: '#495E57' }]}>
                <Text style={[styles.btnText, { color: 'white' }]}>Change</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={removeImage} style={[styles.btn, { backgroundColor: 'white' }]}>
                <Text style={[styles.btnText, { color: '#495E57' }]}>Remove</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    image: {
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: '#eee',
    },
    placeholder: {
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    initials: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#495E57',
    },
    btn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#495E57',
        marginLeft: 12,
    },
    btnText: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ProfileImage;
