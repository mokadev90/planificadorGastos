import {Pressable, StyleSheet, Text, View} from 'react-native';
import globalStyles from '../styles';
import {formatearCantidad} from '../helpers';
import {useEffect, useState} from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';

const ControlPresupuesto = ({resetarApp, presupuesto, gastos}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0,
    );
    const totalDisponible = presupuesto - totalGastado;
    const nuevoPorcentaje =
      ((presupuesto - totalDisponible) / presupuesto) * 100;

    setPorcentaje(nuevoPorcentaje);
    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <CircularProgress
          value={porcentaje}
          delay={1000}
          duration={1000}
          radius={150}
          valueSuffix={'%'}
          inActiveStrokeColor="#f5f5f5"
          inActiveStrokeWidth={20}
          activeStrokeColor="#3b82f6"
          activeStrokeWidth={20}
          title="Gastado"
          titleStyle={{fontWeight: 'bold', fontSize: 20}}
          titleColor="#64748b"
        />
      </View>
      <View style={styles.contenedorTexto}>
        <Pressable style={styles.boton} onPress={resetarApp}>
          <Text style={styles.textoBoton}>Reiniciar App</Text>
        </Pressable>
        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: </Text>
          <Text style={styles.texto}>{formatearCantidad(presupuesto)}</Text>
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: </Text>
          <Text style={styles.texto}>{formatearCantidad(disponible)}</Text>
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: </Text>
          <Text style={styles.texto}>{formatearCantidad(gastado)}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  centrarGrafica: {
    alignItems: 'center',
  },
  boton: {
    backgroundColor: '#db2777',
    padding: 10,
    marginBottom: 40,
    borderRadius: 5,
  },
  textoBoton: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
    color: '#3b82f6',
  },
  texto: {
    color: 'black',
  },
});
export default ControlPresupuesto;
