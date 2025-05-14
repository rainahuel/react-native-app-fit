// app/(auth)/register.tsx
import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton';
import MessageBanner from '../../components/MessageBanner';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [showMessage, setShowMessage] = useState(false);

  const { signUp, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redireccionar si ya está autenticado
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleRegister = async () => {
    if (isSubmitting) return;

    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill out all fields.");
      setMessageType('error');
      setShowMessage(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType('error');
      setShowMessage(true);
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      setMessageType('error');
      setShowMessage(true);
      return;
    }

    try {
      setIsSubmitting(true);
      await signUp(email, password, name);
      setMessage("Your account has been created successfully!");
      setMessageType('success');
      setShowMessage(true);
      
      // Después de mostrar el mensaje de éxito por un momento, redirigir
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 1500);
    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Mensajes específicos según el código de error del servidor
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        if (error.response.status === 400) {
          if (error.response.data.message?.includes('already exists')) {
            setMessage("This email is already registered. Please use a different email or log in.");
          } else if (error.response.data.message?.includes('valid email')) {
            setMessage("Please enter a valid email address.");
          } else if (error.response.data.message?.includes('password')) {
            setMessage("Password is too weak. Please use a stronger password.");
          } else {
            setMessage(error.response.data.message || "Invalid registration data.");
          }
        } else {
          setMessage(`Registration failed: ${error.response.data.message || "Server error"}`);
        }
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        setMessage("Network error. Please check your internet connection and try again.");
      } else {
        // Error en la configuración de la solicitud
        setMessage(`Registration failed: ${error.message || "Unknown error"}`);
      }
      
      setMessageType('error');
      setShowMessage(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si está cargando (verificando autenticación), mostrar spinner
  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <MessageBanner 
        message={message}
        type={messageType}
        visible={showMessage}
        onHide={() => setShowMessage(false)}
      />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.back()} disabled={isSubmitting}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor={Colors.textMuted}
            value={name}
            onChangeText={setName}
            editable={!isSubmitting}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            placeholderTextColor={Colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!isSubmitting}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={Colors.textMuted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!isSubmitting}
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={Colors.textMuted}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!isSubmitting}
          />

          <CustomButton 
            title={isSubmitting ? "Creating Account..." : "Register"} 
            onPress={handleRegister} 
            disabled={isSubmitting} 
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity disabled={isSubmitting}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textSecondary,
    marginTop: 12,
    fontSize: 16,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  headerContainer: {
    marginBottom: 32,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  backButton: {
    color: Colors.primary,
    fontSize: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.text,
  },
  input: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: Colors.textSecondary,
    marginRight: 5,
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;