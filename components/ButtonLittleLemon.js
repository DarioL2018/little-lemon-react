import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const LittleLemonButton = ({ onPress, text, disabled }) => {
  return (
    <TouchableOpacity style={!disabled ? styles.button : styles.buttonDisabled} onPress={onPress} disabled={disabled}>
      <Text style={!disabled ? styles.text : { ...styles.text, color: 'white' }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F4CE14', // LittleLemonColor.yellow
    borderRadius: 8,
    paddingHorizontal: 25,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch', // Similar to fillMaxWidth
  },
  buttonDisabled: {
    backgroundColor: '#525251ff', // LittleLemonColor.yellow
    borderRadius: 8,
    paddingHorizontal: 25,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch', // Similar to fillMaxWidth
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    //fontFamily: 'Karla-Regular', // asegúrate de tener la fuente cargada
  },
});

export default LittleLemonButton;
