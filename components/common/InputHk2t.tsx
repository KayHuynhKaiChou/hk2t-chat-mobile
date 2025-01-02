import React from 'react'
import { View, StyleSheet } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'
import { Controller, Control, FieldValues, Path, RegisterOptions, FieldErrors } from "react-hook-form"

interface InputHk2tProps<T extends FieldValues> {
    label: string;
    right?: React.ReactNode;
    secureTextEntry?: boolean;
    name: Path<T>;
    control: Control<T>;
    errors: FieldErrors<T>;
    rules?: Omit<RegisterOptions<T, Path<T>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
}

export default function InputHk2t<T extends FieldValues>({
    label,
    right = <></>,
    secureTextEntry = false,
    name,
    control,
    errors,
    rules
} : InputHk2tProps<T>) {
    return (
        <View>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        keyboardType='default'
                        label={label}
                        mode='outlined'
                        right={right}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={!!errors[name]}
                        secureTextEntry={secureTextEntry}
                        activeOutlineColor="rgb(66, 165, 245)"
                    />
                )}
            />
            {errors[name] && (
                <HelperText type="error" visible={!!errors[name]}>
                    {errors[name].message as string}
                </HelperText>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
  msgError: {
    marginTop: 10,
    color: 'red'
  }
});
