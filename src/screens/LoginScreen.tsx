import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { login, register, logout, onAuthChange, AuthUser } from '../services/authService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  // Verificar se há usuário autenticado ao montar
  useEffect(() => {
    console.log('📋 LoginScreen montada');
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Aviso', 'Preencha email e senha');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Falha ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Aviso', 'Preencha email e senha');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, 'Usuário');
      Alert.alert('Sucesso', 'Conta criada com sucesso! Você já está autenticado.');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      Alert.alert('Erro', error?.message || 'Falha ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      console.log('✅ Logout bem-sucedido');
      Alert.alert('Sucesso', 'Você foi desconectado');
      setUser(null);
    } catch (error: any) {
      const errorMsg = error?.message || 'Erro desconhecido';
      console.error('❌ Erro ao fazer logout:', errorMsg);
      Alert.alert('Erro', `Falha ao fazer logout: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Bem-vindo! 👋</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.uid}>ID: {user.uid.substring(0, 12)}...</Text>

          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Desconectar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login / Registro</Text>
        <Text style={styles.subtitle}>Autentique-se com Firebase</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!loading}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Criar Conta</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: '#007AFF',
  },
  registerButton: {
    backgroundColor: '#34C759',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  email: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  uid: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'monospace',
  },
});
