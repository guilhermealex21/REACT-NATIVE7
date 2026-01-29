import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { addDocument } from '../services/firestoreService';

type User = {
  id: string;
  name: string;
  email: string;
  idade: string;
  phone: string;
  createdAt: Date;
};

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Log ao montar componente
  useEffect(() => {
    console.log('📋 RegisterScreen montada e pronta para usar');
  }, []);

  const handleRegister = async () => {
    console.log('🔍 Iniciando validação...');
    console.log('Campo nome:', { valor: name, vazio: !name.trim() });
    console.log('Campo email:', { valor: email, vazio: !email.trim() });
    console.log('Campo idade:', { valor: idade, vazio: !idade.trim() });
    console.log('Campo phone:', { valor: phone, vazio: !phone.trim() });
    console.log('Campo password:', { vazio: !password.trim() });

    // Validar campos
    if (!name.trim() || !email.trim() || !idade.trim() || !phone.trim() || !password.trim()) {
      console.warn('⚠️ Validação falhou: campos vazios');
      Alert.alert('Aviso', 'Preencha todos os campos');
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('⚠️ Validação falhou: email inválido');
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    // Validar senha
    if (password.length < 6) {
      console.warn('⚠️ Validação falhou: senha muito curta');
      Alert.alert('Erro', 'Senha deve ter pelo menos 6 caracteres');
      return;
    }

    // Validar confirmação de senha
    if (password !== confirmPassword) {
      console.warn('⚠️ Validação falhou: senhas não conferem');
      Alert.alert('Erro', 'As senhas não conferem');
      return;
    }

    console.log('✅ Validação passou!');
    setLoading(true);

    try {
      const newUser = {
        name,
        email,
        idade,
        phone,
      };

      console.log('📤 Criando conta no Firebase Auth...');
      // Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      console.log('✅ Conta criada no Firebase Auth com ID:', firebaseUser.uid);

      // Atualizar perfil do usuário
      console.log('📤 Atualizando perfil do usuário...');
      await updateProfile(firebaseUser, {
        displayName: name,
      });
      console.log('✅ Perfil atualizado');

      // Salvar dados adicionais no Firestore
      console.log('📤 Salvando dados no Firestore...');
      const docId = await addDocument('users', {
        ...newUser,
        uid: firebaseUser.uid,
      });
      console.log('✅ Usuário registrado no Firestore com ID:', docId);

      Alert.alert('Sucesso', 'Conta criada e dados registrados com sucesso!');

      // Limpar campos
      setName('');
      setEmail('');
      setIdade('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      const errorMsg = error?.message || 'Erro desconhecido';
      console.error('❌ Erro ao registrar usuário:', errorMsg);
      console.error('📋 Erro completo:', error);
      Alert.alert('Erro', `Falha ao registrar: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha seus dados abaixo</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={name}
          onChangeText={setName}
          editable={!loading}
          placeholderTextColor="#999"
        />

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
          placeholder="Idade"
          value={idade}
          onChangeText={setIdade}
          keyboardType="numeric"
          editable={!loading}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
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

        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!loading}
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Registrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginTop: 20,
    marginBottom: 20,
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
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
