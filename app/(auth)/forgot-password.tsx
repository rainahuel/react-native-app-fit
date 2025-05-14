// app/(auth)/forgot-password.tsx - Versión actualizada

import React, { useState } from 'react';
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
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';
import MessageBanner from '../../components/MessageBanner';
import authService from '../../services/authService';

function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [showMessage, setShowMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();

  const handleRequestReset = async () => {
    if (isSubmitting) return;
    
    if (!email) {
      setMessage("Please enter your email address.");
      setMessageType('error');
      setShowMessage(true);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await authService.requestPasswordReset(email);
      
      setMessage("If an account with that email exists, we have sent a verification code to your email.");
      setMessageType('success');
      setShowMessage(true);
      
      // En desarrollo, podemos mostrar el token para pruebas
      if (process.env.NODE_ENV !== 'production' && response?.devToken) {
        console.log('Development token:', response.devToken);
        console.log('Verification code:', response.devToken.substring(0, 8).toUpperCase());
      }
      
      // Redirigir a la pantalla de código de verificación después de 2 segundos
      setTimeout(() => {
        router.push({
          pathname: '/(auth)/verification-code',
          params: { email }
        });
      }, 2000);
      
    } catch (error: any) {
      console.error("Password reset request error:", error);
      
      // Mantener mensaje genérico por seguridad
      setMessage("An error occurred. Please try again later.");
      setMessageType('error');
      setShowMessage(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <MessageBanner 
        message={message}
        type={messageType}
        visible={showMessage}
        onHide={() => setShowMessage(false)}
      />
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Built by Rain</Text>
          <Text style={styles.tagline}>Password Recovery</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.description}>
            Enter your email address and we'll send you a verification code to reset your password.
          </Text>
          
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

          <CustomButton 
            title={isSubmitting ? "Sending..." : "Request Code"} 
            onPress={handleRequestReset} 
            disabled={isSubmitting}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Remember your password?</Text>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  formContainer: {
    width: '100%',
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
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

export default ForgotPasswordScreen;