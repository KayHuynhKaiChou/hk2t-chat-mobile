import { SocketProvider } from '@/hooks/provider/SocketProvider'
import { Stack } from 'expo-router'
import { KeyboardAvoidingView, Platform } from 'react-native'

export default function ChatLayout() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <SocketProvider>
                <Stack>
                    <Stack.Screen 
                        name="index" 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="conversation/[id]" 
                    />
                </Stack>
            </SocketProvider>
        </KeyboardAvoidingView>
    )
}
