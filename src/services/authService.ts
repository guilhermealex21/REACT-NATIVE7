import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User,
  AuthError,
} from 'firebase/auth';
import { auth } from './firebaseConfig';
import { addDocument, updateDocument } from './firestoreService';

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export type AuthErrorType =
  | 'auth/email-already-in-use'
  | 'auth/weak-password'
  | 'auth/invalid-email'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/too-many-requests'
  | 'unknown';

export const getErrorMessage = (error: AuthError): string => {
  const errorCode = error?.code as AuthErrorType;
  
  const errorMessages: Record<AuthErrorType, string> = {
    'auth/email-already-in-use': 'Este email já está registrado',
    'auth/weak-password': 'Senha muito fraca (mínimo 6 caracteres)',
    'auth/invalid-email': 'Email inválido',
    'auth/user-not-found': 'Usuário não encontrado',
    'auth/wrong-password': 'Senha incorreta',
    'auth/too-many-requests': 'Muitas tentativas de login. Tente novamente mais tarde',
    'unknown': error?.message || 'Erro desconhecido na autenticação',
  };

  return errorMessages[errorCode] || errorMessages['unknown'];
};

export const login = async (email: string, password: string): Promise<AuthUser> => {
  try {
    console.log('🔍 Tentando login com:', email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('✅ Login bem-sucedido:', user.email);
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
  } catch (error) {
    const authError = error as AuthError;
    const message = getErrorMessage(authError);
    console.error('❌ Erro ao fazer login:', message);
    throw new Error(message);
  }
};

export const register = async (
  email: string,
  password: string,
  name: string,
  userData?: Record<string, any>
): Promise<AuthUser> => {
  try {
    // Validações básicas
    if (!email.trim() || !password.trim() || !name.trim()) {
      throw new Error('Email, senha e nome são obrigatórios');
    }

    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }

    console.log('🔍 Criando conta com email:', email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Atualizar perfil do usuário
    console.log('📤 Atualizando perfil do usuário...');
    await updateProfile(user, { displayName: name });

    // Salvar dados adicionais no Firestore
    console.log('📤 Salvando dados do usuário no Firestore...');
    await addDocument('users', {
      uid: user.uid,
      name,
      email,
      ...userData,
      createdAt: new Date(),
    });

    console.log('✅ Usuário criado com sucesso:', user.email);
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
  } catch (error) {
    const authError = error as AuthError;
    const message = getErrorMessage(authError);
    console.error('❌ Erro ao registrar:', message);
    throw new Error(message);
  }
};

export const logout = async (): Promise<void> => {
  try {
    console.log('🔍 Fazendo logout...');
    await signOut(auth);
    console.log('✅ Logout realizado com sucesso');
  } catch (error) {
    const authError = error as AuthError;
    const message = getErrorMessage(authError);
    console.error('❌ Erro ao fazer logout:', message);
    throw new Error(message);
  }
};

export const getCurrentUser = (): AuthUser | null => {
  const user = auth.currentUser;
  
  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
};

export const onAuthChange = (callback: (user: AuthUser | null) => void): (() => void) => {
  console.log('👂 Configurando listener de autenticação');
  
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('✅ Usuário autenticado:', user.email);
      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });
    } else {
      console.log('❌ Nenhum usuário autenticado');
      callback(null);
    }
  });

  return unsubscribe;
};

export const updateUserProfile = async (displayName: string): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Nenhum usuário autenticado');
    }

    await updateProfile(user, { displayName });
    console.log('✅ Perfil atualizado com sucesso');
  } catch (error) {
    const authError = error as AuthError;
    const message = getErrorMessage(authError);
    console.error('❌ Erro ao atualizar perfil:', message);
    throw new Error(message);
  }
};
