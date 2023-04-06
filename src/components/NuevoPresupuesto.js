import {Text, TextInput, Pressable, View, StyleSheet} from 'react-native';
import globalStyles from '../styles';

const NuevoPresupuesto = ({
  handleNuevoPresupuesto,
  presupuesto,
  setPresupuesto,
}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir Presupuesto</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto: Ej. 300"
        value={presupuesto.toString()}
        onChangeText={setPresupuesto}
        style={styles.input}
      />
      <Pressable
        onPress={() => handleNuevoPresupuesto(presupuesto)}
        style={styles.boton}>
        <Text style={styles.botonTexto}>Agregar presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3b82f6',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30,
    color: 'black',
  },
  boton: {
    marginTop: 30,
    backgroundColor: '#1048a4',
    padding: 10,
    borderRadius: 10,
  },
  botonTexto: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
export default NuevoPresupuesto;
