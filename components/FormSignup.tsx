import React, { useState } from 'react'
import { View, StyleSheet, Keyboard } from 'react-native'
import InputHk2t from './common/InputHk2t';
import ButtonHk2t from './common/ButtonHk2t';
import { useForm } from 'react-hook-form';
import userServices from '@/services/userServices';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { TextInput } from 'react-native-paper';
import { useAsyncStorageContext } from '@/hooks/provider/AsyncStorageProvider';

export default function FormSignup() {
    const router = useRouter();
    const {updateUser} = useAsyncStorageContext();
    
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm<FormSignUp>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    const onSubmit = (data: FormSignUp) => {
        setIsLoadingBtn(true);
        Keyboard.dismiss();
        userServices.signUpService(data)
            .then((res) => {
                updateUser(res.data);
                router.push('/(auth)/avatar');
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
                    required: 'Username is required !',
                    minLength: {
                        value: 6,
                        message: 'Username must be at least 6 characters !'
                    }
                }}
            />
            <InputHk2t 
                control={control} 
                label='email' 
                name='email'
                errors={errors}
                rules={{
                    required: 'email is required !',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email is wrong format !"
                    }
                }}
            />
            <InputHk2t 
                control={control} 
                label='password' 
                name='password'
                errors={errors}
                rules={{
                    required: 'Password is required !',
                    pattern: {
                        value: /^[A-Z]/,
                        message: "Password must start with a capital letter !"
                    },
                    minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters !'
                    }
                }}
                right={
                    <TextInput.Icon 
                        icon={isShowPassword ? "eye-off" : "eye"} 
                        onPress={() => setIsShowPassword(!isShowPassword)}
                    />
                }
                secureTextEntry={!isShowPassword}
            />
            <InputHk2t 
                control={control} 
                label='confirm password' 
                name='confirmPassword'
                errors={errors}
                rules={{
                    required: 'Password is required !',
                    validate: (value) => value === getValues('password') || 'Confirm password does not match password !'
                }}
                right={
                    <TextInput.Icon 
                        icon={isShowConfirmPassword ? "eye-off" : "eye"} 
                        onPress={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                    />
                }
                secureTextEntry={!isShowConfirmPassword}
            />
            <ButtonHk2t 
                loading={isLoadingBtn}
                content='sign up' 
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
