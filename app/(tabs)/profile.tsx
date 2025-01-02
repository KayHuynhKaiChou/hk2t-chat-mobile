import AvatarContact from '@/components/AvatarContact';
import ButtonHk2t from '@/components/common/ButtonHk2t';
import { useAsyncStorageContext } from '@/hooks/provider/AsyncStorageProvider';
import { router } from 'expo-router';
import React from 'react'
import { View, StyleSheet, Text, SafeAreaView } from 'react-native'

export default function ProfilePage() {

    const {user, clearUser} = useAsyncStorageContext();

    const handleLogout = () => {
        clearUser();
        router.replace('/(auth)/signin');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileWrapper}>
                <AvatarContact svgBase64={user?.avatarImage || ''} isShowOnline={false} width={160}/>
                <Text style={styles.infor}>{user?.username}</Text>
                <Text style={styles.infor}>{user?.email}</Text>
            </View>
            <View>
                <ButtonHk2t content="Logout" icon="logout" onPress={handleLogout}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 26
  },
  profileWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  infor: {
    color: '#fff',
    fontSize: 18
  }
});
