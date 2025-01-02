import AvatarContact from '@/components/AvatarContact';
import ButtonHk2t from '@/components/common/ButtonHk2t';
import { useAsyncStorageContext } from '@/hooks/provider/AsyncStorageProvider';
import userServices from '@/services/userServices';
import { patternAvatars } from '@/utils';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message';

export default function SetAvatarPage() {
    const [avatars, setAvatars] = useState<string[]>([]);
    const [selectedIndexAvatar, setSelectedIndexAvatar] = useState(0);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const {user, updateUser} = useAsyncStorageContext();

    const handleSetAvatar = () => {
        setIsLoadingBtn(true)
        userServices.setAvatarService({
            avatarImage : avatars[selectedIndexAvatar]
        },user ? user.id : '')
            .then(res => {
                user && updateUser({...user, avatarImage: avatars[selectedIndexAvatar]});
                Toast.show({
                    type: 'success',
                    text1: res.message
                })
                router.replace('/(tabs)/chat');
            })
            .catch(error => {
                Toast.show({
                    type: 'error',
                    text1: error.response.data.message
                })
            })
            .finally(() => {
                setIsLoadingBtn(false)
            })
    }

    useEffect(() => {
        patternAvatars()
            .then(data => 
                setAvatars(data)
            )
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={styles.containerWrapper}>
                <Text style={styles.title}>Pick an Avatar as your profile picture</Text>
                <View style={styles.avatars}>
                    {avatars.map((item, index) => (
                        <View 
                            key={index + item.slice(100, 106)} 
                            style={[styles.avatarWrapper, { borderColor: index === selectedIndexAvatar ? '#3ea7e4' : 'transparent' }]}
                        >
                            <AvatarContact svgBase64={item} isShowOnline={false} onPress={() => setSelectedIndexAvatar(index)}/>
                        </View>
                    ))}
                </View>
                <ButtonHk2t loading={isLoadingBtn} content='Set as Profile Picture' onPress={handleSetAvatar}/>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131324',
  },
  containerWrapper: {
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30
  },
  avatars: {
    width: 200,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16
  },
  avatarWrapper: {
    borderWidth: 5, 
    borderRadius: '50%'
  },
  title: {
    color: '#fff',
    fontSize: 18
  }
});
