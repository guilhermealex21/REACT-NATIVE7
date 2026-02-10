import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginSignupScreen from './src/screens/LoginSignupScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import { debugFirebaseConnection } from './src/services/debugFirebase';

const Stack = createNativeStackNavigator();

export default function App() {
  // Executar teste de conexão Firebase ao iniciar
  useEffect(() => {
    console.log('🚀 App iniciado - testando conexão com Firebase...');
    debugFirebaseConnection();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Crud React Native' }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Cadastro' }}
        />
        <Stack.Screen
          name="LoginSignup"
          component={LoginSignupScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: 'Redefinir Senha' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
