import React, { useState } from 'react'
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import InputHk2t from './common/InputHk2t';
import ButtonHk2t from './common/ButtonHk2t';
import { useForm } from 'react-hook-form';
import userServices from '@/services/userServices';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { TextInput } from 'react-native-paper';
import { useAsyncStorageContext } from '@/hooks/provider/AsyncStorageProvider';

export default function FormSignin() {
    const router = useRouter();
    const {updateUser} = useAsyncStorageContext();
    
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSignIn>({
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const onSubmit = (data: FormSignIn) => {
        setIsLoadingBtn(true);
        Keyboard.dismiss();
        userServices.signInService(data)
            .then((res) => {
                updateUser(res.data);
                router.replace('/(tabs)/chat')
                Toast.show({
                    type: 'success',
                    text1: res.message
                })
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

    return (
        <View style={styles.container}>
            <InputHk2t 
                control={control} 
                label='username' 
                name='username'
                errors={errors}
                rules={{
                    required: 'Username is required !'
                }}
            />
            <InputHk2t 
                control={control} 
                label='password' 
                name='password'
                errors={errors}
                rules={{
                    required: 'Password is required !'
                }}
                right={
                    <TextInput.Icon 
                        icon={isShowPassword ? "eye-off" : "eye"} 
                        onPress={() => setIsShowPassword(!isShowPassword)}
                    />
                }
                secureTextEntry={!isShowPassword}
            />
            <ButtonHk2t 
                loading={isLoadingBtn}
                content='sign in' 
                onPress={handleSubmit(onSubmit)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    width: '80%',
    backgroundColor: 'black',
    display: 'flex',
    gap: 30
  }
});
