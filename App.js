import {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Pressable,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGastos from './src/components/FormularioGastos';
import {generarId} from './src/helpers/index';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState('');
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage =
          (await AsyncStorage.getItem('presupuesto')) ?? 0;
        if (presupuestoStorage > 0) {
          setPresupuesto(presupuestoStorage);
          setIsValidPresupuesto(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    obtenerPresupuestoStorage();
  }, []);

  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem('presupuesto', presupuesto);
        } catch (error) {
          console.log(error);
        }
      };
      guardarPresupuestoStorage();
    }
  }, [isValidPresupuesto]);

  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('gastos');

        setGastos(gastosStorage ? JSON.parse(gastosStorage) : []);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerGastosStorage();
  }, []);

  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem('gastos', JSON.stringify(gastos));
      } catch (error) {
        console.log(error);
      }
    };

    guardarGastosStorage();
  }, [gastos]);

  const handleNuevoPresupuesto = presupuesto => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El presupuesto no puede ser 0 o menor', ['Ok']);
    }
  };

  const handleGasto = gasto => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map(
        gastoState => (gastoState.id = gasto.id ? gasto : gastoState),
      );
      setGastos(gastosActualizados);
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setModal(!modal);
  };

  const eliminarGasto = id => {
    Alert.alert(
      '¿Desear eliminar éste gasto?',
      'Un gasto eliminado no se puede recuperar',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Sí, Eliminar',
          onPress: id => {
            const gastosActualizados = gastos.filter(
              gastoState => gastoState.id !== id,
            );
            setGastos(gastosActualizados);
            setModal(!modal);
            setGasto({});
          },
        },
      ],
    );
  };

  const resetarApp = () => {
    Alert.alert(
      '¿Deseas resetear la app?',
      'Esto eliminará presupuesto y gastos',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Si, Eliminar',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setIsValidPresupuesto(false);
              setPresupuesto(0);
              setGastos([]);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
            <ControlPresupuesto
              resetarApp={resetarApp}
              presupuesto={presupuesto}
              gastos={gastos}
            />
          ) : (
            <NuevoPresupuesto
              handleNuevoPresupuesto={handleNuevoPresupuesto}
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
            />
          )}
        </View>
        {isValidPresupuesto && (
          <>
            <Filtro
              setFiltro={setFiltro}
              filtro={filtro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />
            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>
      {modal && (
        <Modal
          visible={modal}
          animationType="slide"
          onRequestClose={() => setModal(!modal)}>
          <FormularioGastos
            gasto={gasto}
            setModal={setModal}
            handleGasto={handleGasto}
            setGasto={setGasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}
      {isValidPresupuesto && (
        <Pressable style={styles.pressable} onPress={() => setModal(!modal)}>
          <Image
            source={require('./src/img/nuevo-gasto.png')}
            style={styles.imagen}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3b82f6',
    minHeight: 400,
  },
  imagen: {
    width: 60,
    height: 60,
  },
  pressable: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default App;
