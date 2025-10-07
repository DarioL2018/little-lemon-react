import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";
import { Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
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
    const isLastNameValid = /^[A-Za-zÀ-ÿ\s]+$/.test(lastName) && lastName.trim() !== "";
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isButtonDisabled = !isFirstNameValid || !isLastNameValid || !isEmailValid;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Image source={require('../assets/images/logo.png')}
                    style={{ width: 179, height: 56, resizeMode: 'contain' }} />
            </View>
            <View style={styles.hero}>
                <Text style={styles.heroTitle}>Let’s get to know you</Text>
            </View>
            <View style={{ padding: 20 }} />

            <Text style={ styles.sectionTitle}>
                PERSONAL INFORMATION
            </Text>

            <View style={{ padding: 20 }} />

            <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                <Text style={styles.label}>First Name *</Text>
                <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
                <Text style={styles.label}>Last Name *</Text>
                <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
                <Text style={styles.label}>Email *</Text>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(text) => setEmail(text.toLowerCase())} keyboardType="email-address" />

            </View>
            <View style={{ marginHorizontal: 20, marginBottom: 40 }}>
                <ButtonLittleLemon text="Register" onPress={async () => {
                    if (!isButtonDisabled) {
                        saveChanges();
                        await onComplete();
                    }
                }} disabled={isButtonDisabled} />
            </View>
        </SafeAreaView>);

}

const styles = {
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
    sectionTitle: { 
        fontSize: 20, 
        paddingLeft: 20,
        fontWeight: 'bold'
    },
    input: {
        height: 52,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 40,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,

    },
};

export default Onboarding;