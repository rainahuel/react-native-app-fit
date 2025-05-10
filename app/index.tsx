// app/index.tsx
import { Redirect } from 'expo-router';

function Index() {
  // Redirigir directamente a las pestañas principales, sin verificar autenticación
  return <Redirect href="/(tabs)" />;
}

export default Index;