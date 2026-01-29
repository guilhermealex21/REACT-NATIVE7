import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import RegisterScreen from './src/screens/RegisterScreen';
import { debugFirebaseConnection } from './src/services/debugFirebase';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  // Executar teste de conexão Firebase ao iniciar
  useEffect(() => {
    console.log('🚀 App iniciado - testando conexão com Firebase...');
    debugFirebaseConnection();
  }, []);

  return (
    <View style={styles.container}>
      {currentScreen === 'Home' && (
        <>
          <Text style={styles.title}>Bem-vindo ao Meu Primeiro App!</Text>
          <Button
            title="Ir para Detalhes"
            onPress={() => setCurrentScreen('Details')}
          />
          <View style={styles.spacer} />
          <Button
            title="Cadastro"
            onPress={() => setCurrentScreen('Profile')}
          />
        </>
      )}
      {currentScreen === 'Details' && (
        <>
          <Text style={styles.title}>Tela de Detalhes</Text>
          <Text style={styles.text}>Esta é a tela de detalhes do aplicativo.</Text>
          <Button
            title="Voltar para Início"
            onPress={() => setCurrentScreen('Home')}
          />
        </>
      )}
      {currentScreen === 'Profile' && (
        <RegisterScreen />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  spacer: {
    height: 15,
  },
});
