
import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View
} from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';
import MessageBanner from '../../components/MessageBanner';
import authService from '../../services/authService';

function VerificationCodeScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [showMessage, setShowMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();

  const handleResetPassword = async () => {
    if (isSubmitting) return;
    
    if (!verificationCode) {
      setMessage("Please enter the verification code.");
      setMessageType('error');
      setShowMessage(true);
      return;
    }

    if (!newPassword || !confirmPassword) {
      setMessage("Please enter and confirm your new password.");
      setMessageType('error');
      setShowMessage(true);
      return;
    }

    if (newPassword.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      setMessageType('error');
      setShowMessage(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType('error');
      setShowMessage(true);
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Usar el código de verificación como token
      await authService.resetPassword(verificationCode, newPassword);
      
      setMessage("Password has been reset successfully!");
      setMessageType('success');
      setShowMessage(true);
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        router.replace('/(auth)/login');
      }, 2000);
      
    } catch (error: any) {
      console.error("Password reset error:", error);
      
      if (error.response) {
        if (error.response.status === 400) {
          setMessage(error.response.data.message || "Invalid or expired verification code.");
        } else {
          setMessage(error.response.data.message || "Failed to reset password.");
        }
      } else if (error.request) {
        setMessage("Network error. Please check your internet connection and try again.");
      } else {
        setMessage(`Reset failed: ${error.message || "Unknown error"}`);
      }
      
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
          <Text style={styles.tagline}>Reset Password</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.description}>
            Enter the verification code sent to {email || "your email"} and your new password.
          </Text>
          
          <Text style={styles.label}>Verification Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter code"
            placeholderTextColor={Colors.textMuted}
            keyboardType="default"
            autoCapitalize="characters"
            value={verificationCode}
            onChangeText={setVerificationCode}
            editable={!isSubmitting}
          />
          
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={Colors.textMuted}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
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
            title={isSubmitting ? "Updating..." : "Reset Password"} 
            onPress={handleResetPassword} 
            disabled={isSubmitting}
          />

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code?</Text>
            <Link href={{
              pathname: '/(auth)/forgot-password',
              params: email ? { email } : {}
            }} asChild>
              <TouchableOpacity disabled={isSubmitting}>
                <Text style={styles.resendLink}>Resend Code</Text>
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
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  resendText: {
    color: Colors.textSecondary,
    marginRight: 5,
  },
  resendLink: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default VerificationCodeScreen;