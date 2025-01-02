import FormSignup from '@/components/FormSignup';
import { router } from 'expo-router';
import { Image, Text, View, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function SignupPage() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.container}>
            <View style={styles.formWrapper}>
              <Image style={styles.image} source={require('../../assets/images/logoChat.png')} />
              <Text style={styles.title}>hk2t</Text>
            </View>
            <FormSignup/>
            <View style={styles.formWrapper}>
              <Text style={styles.notAccount}>Already have an account ?</Text>
              <Text style={styles.signup} onPress={() => router.push('/(auth)/signin')}>sign in</Text>
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
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
