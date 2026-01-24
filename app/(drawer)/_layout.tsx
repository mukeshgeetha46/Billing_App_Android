import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CustomDrawer from '@/components/Drawer/CustomDrawer';
import AppHeader from '@/components/Header/AppHeader';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  initialRouteName: '(drawer)/(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>

        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Drawer
            screenOptions={{
              header: () => <AppHeader />,
              drawerStyle: {
                width: 280, // matches your image
              },
            }}
            drawerContent={() => <CustomDrawer />}
            initialRouteName="(tabs)"
          >
            <Drawer.Screen name="(tabs)" options={{ title: 'Home' }} />
            <Drawer.Screen name="Storelist" options={{ title: 'My Stores' }} />
            <Drawer.Screen name="Company/Addcompany" options={{ title: 'Add Company', headerShown: false }} />
            <Drawer.Screen name="Store/Newstore" options={{ title: 'Add Store', headerShown: false }} />

          </Drawer>

          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
