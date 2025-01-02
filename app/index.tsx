import ButtonHk2t from '@/components/common/ButtonHk2t'
import { useAsyncStorageContext } from '@/hooks/provider/AsyncStorageProvider'
import { Redirect, router } from 'expo-router'
import { Image, Text, View, StyleSheet, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

export default function Welcome() {

  const {user} = useAsyncStorageContext();

  if (user) return <Redirect href="/(tabs)/chat" />

  const handleOpenLinkWebsite = () => {
    const URL_WEBSITE = process.env.EXPO_PUBLIC_URL_WEBSITE
    if(!URL_WEBSITE) return
    Linking.canOpenURL(URL_WEBSITE)
      .then(supported => {
        if(supported) {
          Linking.openURL(URL_WEBSITE)
        } else {
          Toast.show({
            type: 'error',
            text1: "Can not open url : " + URL_WEBSITE
          })
        }
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerWrapper}>
        <Image style={styles.image} source={require('../assets/images/logoChat.png')} />
        <Text style={styles.title}>hk2t</Text>
        <Text style={styles.welcome}> Welcome to app chat HK2T</Text>
      </View>
      <View style={styles.actionWrapper}>
        <ButtonHk2t content='sign in' onPress={() => router.push('/(auth)/signin')}/>
        <ButtonHk2t content='sign up' onPress={() => router.push('/(auth)/signup')}/>
        <ButtonHk2t content='link website' onPress={handleOpenLinkWebsite}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height : '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    backgroundColor: '#131324'
  },
  containerWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  image: {
    width: 150, 
    height: 150
  },
  title: {
    color: '#fff',
    fontSize: 21,
    textTransform: 'uppercase'
  },
  welcome: {
    color: '#fff',
    fontSize: 16,
  },
  actionWrapper: {
    display: 'flex',
    alignItems: 'stretch',
    gap: 12
  }
});
