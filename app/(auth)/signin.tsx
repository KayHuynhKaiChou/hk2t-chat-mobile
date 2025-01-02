import FormSignin from '@/components/FormSignin';
import { router } from 'expo-router';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Image, Text, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SigninPage() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.container}>
            <View style={styles.formWrapper}>
              <Image style={styles.image} source={require('../../assets/images/logoChat.png')} />
              <Text style={styles.title}>hk2t</Text>
            </View>
            <FormSignin/>
            <View style={styles.formWrapper}>
              <Text style={styles.notAccount}>Don't have an account ?</Text>
              <Text 
                style={styles.signup} 
                onPress={() => router.push('/(auth)/signup')}
              >
                sign up           
              </Text>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  container: {
    height : '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#131324',
    gap: 12
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  image: {
    width: 50, 
    height: 50
  },
  title: {
    color: '#fff',
    fontSize: 30,
    textTransform: 'uppercase'
  },
  notAccount: {
    color: '#fff',
    fontSize: 16
  },
  signup: {
    color: 'blue',
    fontSize: 16
  }
});
