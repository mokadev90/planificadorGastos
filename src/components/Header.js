import {StyleSheet, Text, SafeAreaView} from 'react-native';

const Header = () => {
  return (
    <SafeAreaView>
      <Text style={styles.texto}>Planificador de Gastos</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  texto: {
    textAlign: 'center',
    fontSize: 30,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingTop: 20,
    paddingHorizontal: 30,
  },
});
export default Header;
