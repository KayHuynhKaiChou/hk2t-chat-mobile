import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';
import ToastHk2t from '@/components/common/ToastHk2t';
import { AsyncStorageProvider } from '@/hooks/provider/AsyncStorageProvider';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { DialogHk2tProvider } from '@/components/common/DialogHk2t';
import { ChatBadgeProvider } from '@/hooks/provider/ChatBadgeProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false
});

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <AsyncStorageProvider>
        <DialogHk2tProvider>
          <ChatBadgeProvider>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <ToastHk2t />
          </ChatBadgeProvider>
        </DialogHk2tProvider>
      </AsyncStorageProvider>
    </PaperProvider>
  );
}
