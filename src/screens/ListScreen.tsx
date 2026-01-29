import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getDocuments } from '../services/firestoreService';

type User = {
  id: string;
  name: string;
  email: string;
  idade: string;
  phone: string;
};

export default function ListScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // READ carregar do Firestore ao focar
  useFocusEffect(
    useCallback(() => {
      const loadUsers = async () => {
        setLoading(true);
        try {
          const firebaseUsers = await getDocuments('users');
          setUsers(firebaseUsers as User[]);
          console.log('✅ Usuários carregados do Firestore:', firebaseUsers.length);
        } catch (error) {
          console.error('❌ Erro ao carregar usuários do Firestore:', error);
          Alert.alert('Erro', 'Não foi possível carregar a lista de usuários');
        } finally {
          setLoading(false);
        }
      };
      loadUsers();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : users.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum usuário registrado</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.userContainer}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
              <Text style={styles.userPhone}>{item.phone}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  userPhone: {
    fontSize: 14,
    color: '#999',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
