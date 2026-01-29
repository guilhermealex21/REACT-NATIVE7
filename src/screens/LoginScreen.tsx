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
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

type User = {
  uid: string;
  email: string | null;
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Verificar se há usuário autenticado ao montar
  useEffect(() => {
    console.log('📋 LoginScreen montada');
    const unsubscribe = auth.onAuthStateChanged((currentUser: any) => {
      if (currentUser) {
        console.log('✅ Usuário autenticado:', currentUser.email);
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
        });
      } else {
        console.log('❌ Sem usuário autenticado');
        setUser(null);
      }
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
      console.log('🔍 Tentando fazer login com:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login bem-sucedido:', userCredential.user.email);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      const errorMsg = error?.message || 'Erro desconhecido';
      console.error('❌ Erro ao fazer login:', errorMsg);
      Alert.alert('Erro', `Falha ao fazer login: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Aviso', 'Preencha email e senha');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Aviso', 'Senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      console.log('🔍 Criando conta com:', email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ Conta criada com sucesso:', userCredential.user.email);
      Alert.alert('Sucesso', 'Conta criada com sucesso! Você já está autenticado.');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      const errorMsg = error?.message || 'Erro desconhecido';
      console.error('❌ Erro ao criar conta:', errorMsg);
      Alert.alert('Erro', `Falha ao criar conta: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      console.log('🔍 Fazendo logout...');
      await signOut(auth);
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
