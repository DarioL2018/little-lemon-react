import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import logo from '../assets/images/logo.png';
import UserAvatar from './UserAvatar';

export default function HeaderHome({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} /> 
      
      {/* Logo */}
      <Image
        source={logo} // reemplaza con tu logo
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={{ flex: 1 }} /> 

      {/* Profile Avatar */}
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <UserAvatar />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  logo: {
    width: 179,
    height: 56,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28, // opcional para que sea circular
  },
});