import { Text, TextInput, View } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppContext } from '../App';
import ButtonLittleLemon from "../components/ButtonLittleLemon";
import HeaderProfile from "../components/HeaderProfile";
import ProfileImage from "../components/ProfileImage";

const Profile = (props) => {
  const { setState } = useContext(AppContext);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [isOrdersStatuses, setIsOrdersStatuses] = useState(false);
  const [isPasswordChanges, setIsPasswordChanges] = useState(false);
  const [isSpecialOffers, setIsSpecialOffers] = useState(false);
  const [isNewsletter, setIsNewsletter] = useState(false);

  const charcoal = '#495E57';
  const yellow = '#F4CE14';

  useEffect(() => {
    const loadData = async () => {
      setFirstName((await AsyncStorage.getItem('kFirstName')) || '');
      setLastName((await AsyncStorage.getItem('kLastName')) || '');
      setEmail((await AsyncStorage.getItem('kEmail')) || '');
      setPhone((await AsyncStorage.getItem('kPhone')) || '');
      setIsOrdersStatuses((await AsyncStorage.getItem('kOrdersStatuses')) === 'true');
      setIsPasswordChanges((await AsyncStorage.getItem('kPasswordChanges')) === 'true');
      setIsSpecialOffers((await AsyncStorage.getItem('kSpecialOffers')) === 'true');
      setIsNewsletter((await AsyncStorage.getItem('kNewsletter')) === 'true');
    };
    loadData();
  }, []);


  const saveChanges = async () => {
    await AsyncStorage.multiSet([
      ['kFirstName', firstName],
      ['kLastName', lastName],
      ['kEmail', email],
      ['kPhone', phone],
      ['kOrdersStatuses', String(isOrdersStatuses)],
      ['kPasswordChanges', String(isPasswordChanges)],
      ['kSpecialOffers', String(isSpecialOffers)],
      ['kNewsletter', String(isNewsletter)],
    ]);
  };

  const discardChanges = async () => {
    const data = await AsyncStorage.multiGet([
      'kFirstName',
      'kLastName',
      'kEmail',
      'kPhone',
      'kOrdersStatuses',
      'kPasswordChanges',
      'kSpecialOffers',
      'kNewsletter',
    ]);
    setFirstName(data[0][1] || '');
    setLastName(data[1][1] || '');
    setEmail(data[2][1] || '');
    setPhone(data[3][1] || '');
    setIsOrdersStatuses(data[4][1] === 'true');
    setIsPasswordChanges(data[5][1] === 'true');
    setIsSpecialOffers(data[6][1] === 'true');
    setIsNewsletter(data[7][1] === 'true');
  };

  const logout = async () => {
    await AsyncStorage.multiRemove([
      'kFirstName',
      'kLastName',
      'kEmail',
      'kPhone',
      'kOrdersStatuses',
      'kPasswordChanges',
      'kSpecialOffers',
      'kNewsletter',
      'kOnboardingCompleted',
      'kAvatarImage'
    ]);
    setState({ isLoading: false, isOnboardingCompleted: false });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <HeaderProfile />
        {/* Top bar */}
        <Text style={styles.title}>PERSONAL INFORMATION</Text>
        <Text style={styles.label}>Avatar</Text>
        <ProfileImage firstName={firstName} lastName={lastName} />

        {/* Input fields */}
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />

        <View style={{ padding: 5 }} />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />

        <View style={{ padding: 5 }} />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <View style={{ padding: 5 }} />

        <Text style={styles.label}>Phone Number</Text>
        <MaskedTextInput
          mask="(999) 999-9999"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(text, rawText) => {
            setPhone(rawText);
          }}
          placeholder="(123) 456-7890"
          style={styles.input}
        />

        <View style={{ padding: 1 }} />

        <Text style={styles.subTitle}>Email notifications</Text>

        <CustomCheckBox
          label="Order statuses"
          isChecked={isOrdersStatuses}
          setIsChecked={setIsOrdersStatuses}
        />
        <CustomCheckBox
          label="Password changes"
          isChecked={isPasswordChanges}
          setIsChecked={setIsPasswordChanges}
        />
        <CustomCheckBox
          label="Special offers"
          isChecked={isSpecialOffers}
          setIsChecked={setIsSpecialOffers}
        />
        <CustomCheckBox
          label="Newsletter"
          isChecked={isNewsletter}
          setIsChecked={setIsNewsletter}
        />

        <View style={{ padding: 10 }} />
        <ButtonLittleLemon text="Log out" onPress={logout} disabled={false} />
        {/* Logout */}

        <View style={{ padding: 10 }} />
        {/* Actions */}
        <View style={[styles.row, { justifyContent: 'center' }]}>
          <TouchableOpacity onPress={discardChanges} style={[styles.btn, { backgroundColor: 'white' }]}>
            <Text style={[styles.btnText, { color: charcoal }]}>Discard changes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveChanges} style={[styles.btn, { backgroundColor: charcoal }]}>
            <Text style={[styles.btnText, { color: 'white' }]}>Save changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CustomCheckBox = ({ label, isChecked, setIsChecked }) => {
  const charcoal = '#495E57';
  return (
    <TouchableOpacity
      style={styles.checkboxRow}
      onPress={() => setIsChecked(!isChecked)}>
      <Ionicons
        name={isChecked ? 'checkbox' : 'square-outline'}
        size={25}
        color={isChecked ? charcoal : 'black'}
      />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  image: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10,

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 15,
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
  logoutBtn: {
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
  },
  logoutText: {
    fontWeight: '700',
    color: 'black',
    fontSize: 15,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default Profile;