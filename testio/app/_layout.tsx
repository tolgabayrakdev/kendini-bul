import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerBackTitle: 'Geri',
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="test/[id]" 
          options={{ 
            headerShown: false,
            title: '',
            headerBackTitle: 'Geri',
          }} 
        />
        <Stack.Screen 
          name="result" 
          options={{ 
            headerShown: false,
            headerBackTitle: 'Geri',
          }} 
        />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerBackTitle: 'Geri' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
