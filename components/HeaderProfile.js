import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import logo from '../assets/images/logo.png';
export default function HeaderProfile() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" style={{ fontWeight: 'bold' }} />
      </TouchableOpacity>
      <View style={{ flex: 1 }} />

      {/* Logo */}
      <Image
        source={logo}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={{ flex: 1 }} />

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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#495E57', // charcoal
    justifyContent: 'center',
    alignItems: 'center',
  },
});