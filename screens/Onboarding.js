import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";
import { Image, Text, TextInput, View } from "react-native";
import ButtonLittleLemon from "../components/ButtonLittleLemon";

function Onboarding({ onComplete }) {

    const saveChanges = async () => {
        await AsyncStorage.multiSet([
            ['kFirstName', firstName],
            ['kLastName', lastName],
            ['kEmail', email]
        ]);
    };

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");

    const isFirstNameValid = /^[A-Za-zÀ-ÿ\s]+$/.test(firstName) && firstName.trim() !== "";
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isButtonDisabled = !isFirstNameValid || !isEmailValid;

    return (
        <View style={Styles.content}>
            <View style={Styles.header}>
                <Image source={require('../assets/images/logo.png')}
                    style={{ width: 179, height: 56, resizeMode: 'contain' }} />
            </View>
            <View style={Styles.hero}>
                <Text style={Styles.heroTitle}>Let’s get to know you</Text>
            </View>
            <View style={{ padding: 20 }} />
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>
                PERSONAL INFORMATION
            </Text>

            <View style={{ padding: 20 }} />

            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <TextInput style={Styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
                <TextInput style={Styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

            </View>
            <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
                <ButtonLittleLemon text="Register" onPress={async () => {
                    if (!isButtonDisabled) {
                        saveChanges();
                        await onComplete();
                    }
                }} disabled={isButtonDisabled} />
            </View>
        </View>);

}

const Styles = {
    content: {
        //padding: 16,
        flex: 1,
        //justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    header: {
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 17,
    },
    hero: {
        height: 158,
        width: '100%',
        backgroundColor: '#495E57',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroTitle: {
        color: 'white',
        fontSize: 40,
        //fontWeight: 'bold',
    },
    input: {
        height: 52,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 40,
    },
};

export default Onboarding;