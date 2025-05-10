// app/(tabs)/profile.tsx
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, userData, signOut, isAuthenticated, isLoading } = useAuth();

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    Alert.alert(
      "Logout", 
      "Are you sure you want to log out?",
      [
        { 
          text: "Cancel", 
          style: "cancel" 
        },
        { 
          text: "Log Out", 
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
              console.log("User logged out successfully");
            } catch (error) {
              console.error("Error signing out:", error);
              Alert.alert("Error", "Failed to log out. Please try again.");
            }
          }
        }
      ]
    );
  };

  // Si está cargando, mostrar indicador de carga
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Si no está autenticado, mostrar pantalla de invitación
  if (!isAuthenticated || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.guestContainer, styles.centerContent]}>
          <Ionicons name="person-circle-outline" size={80} color={Colors.primary} />
          <Text style={styles.guestTitle}>Welcome to Built by Rain</Text>
          <Text style={styles.guestSubtitle}>
            Create an account to track your fitness journey, save your workout plans and 
            nutrition goals.
          </Text>
          
          <View style={styles.guestButtonsContainer}>
            <TouchableOpacity 
              style={styles.guestPrimaryButton} 
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={styles.guestPrimaryButtonText}>Log In</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.guestSecondaryButton} 
              onPress={() => router.push('/(auth)/register')}
            >
              <Text style={styles.guestSecondaryButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.guestFeatureList}>
            <Text style={styles.guestFeatureTitle}>What you get with an account:</Text>
            
            <View style={styles.guestFeatureItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
              <Text style={styles.guestFeatureText}>Save your workout routines</Text>
            </View>
            
            <View style={styles.guestFeatureItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
              <Text style={styles.guestFeatureText}>Track your nutrition goals</Text>
            </View>
            
            <View style={styles.guestFeatureItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
              <Text style={styles.guestFeatureText}>Generate personalized meal plans</Text>
            </View>
            
            <View style={styles.guestFeatureItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
              <Text style={styles.guestFeatureText}>Monitor your progress over time</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Usuario autenticado - mostrar información básica
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userContainer}>
        {/* Sección de cabecera con información del usuario */}
        <View style={styles.headerSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitial}>
                {userData?.displayName ? userData.displayName.charAt(0).toUpperCase() : 
                 user.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </Text>
            </View>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{userData?.displayName || user.email}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color={Colors.white} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Mensaje para usuario autenticado */}
        <View style={styles.welcomeMessageContainer}>
          <Text style={styles.welcomeTitle}>Welcome, {userData?.displayName?.split(' ')[0] || 'User'}!</Text>
          <Text style={styles.welcomeMessage}>
            You're now logged in and can access all features of the app. Use the tools below to start your fitness journey.
          </Text>
        </View>

        {/* Botones de navegación rápida */}
        <View style={styles.quickLinksContainer}>
          <Text style={styles.quickLinksTitle}>Quick Actions</Text>
          
          <TouchableOpacity 
            style={styles.quickLinkButton} 
            onPress={() => router.push('/screen/nutrition/nutrition-meals')}
          >
            <Ionicons name="nutrition-outline" size={20} color={Colors.primary} />
            <Text style={styles.quickLinkText}>Generate Meal Plan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickLinkButton} 
            onPress={() => router.push('/screen/nutrition/calories-calculator')}
          >
            <Ionicons name="calculator-outline" size={20} color={Colors.primary} />
            <Text style={styles.quickLinkText}>Calculate Calories</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickLinkButton} 
            onPress={() => router.push('/screen/workouts')}
          >
            <Ionicons name="fitness-outline" size={20} color={Colors.primary} />
            <Text style={styles.quickLinkText}>Create Workout Plan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: Colors.textSecondary,
    marginTop: 12,
    fontSize: 16,
  },
  
  // Estilos para usuario no autenticado (guest)
  guestContainer: {
    padding: 20,
  },
  guestTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  guestSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  guestButtonsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  guestPrimaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  guestPrimaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestSecondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  guestSecondaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  guestFeatureList: {
    width: '100%',
  },
  guestFeatureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 16,
  },
  guestFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  guestFeatureText: {
    fontSize: 16,
    color: Colors.white,
    marginLeft: 12,
  },
  
  // Estilos para usuario autenticado
  userContainer: {
    flex: 1,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileImageContainer: {
    marginRight: 12,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.white,
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: Colors.white,
    marginLeft: 4,
    fontSize: 14,
  },
  welcomeMessageContainer: {
    padding: 20,
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  welcomeMessage: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  quickLinksContainer: {
    padding: 16,
    marginBottom: 20,
  },
  quickLinksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 12,
  },
  quickLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  quickLinkText: {
    color: Colors.white,
    fontSize: 16,
    marginLeft: 12,
  },
});