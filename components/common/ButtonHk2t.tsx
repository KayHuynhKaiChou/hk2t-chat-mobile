import React from 'react'
import { ViewStyle } from 'react-native'
import { StyleProp } from 'react-native'
import { Button } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

interface ButtonHk2tProps {
    icon?: IconSource,
    loading?: boolean,
    content: string,
    onPress: any,
    buttonColor?: string,
    textColor?: string,
    style?: StyleProp<ViewStyle>
}

export default function ButtonHk2t({
    icon = '',
    loading = false,
    content,
    onPress,
    buttonColor = 'rgb(66, 165, 245)',
    textColor = '#fff',
    style
} : ButtonHk2tProps) {
    return (
        <Button 
            buttonColor={buttonColor} 
            textColor={textColor}
            style={style}
            icon={icon} 
            mode="contained" 
            uppercase
            loading={loading}
            onPress={onPress}
            contentStyle={{ paddingHorizontal: 16 }}
        >
            {content}
        </Button>
    )
}
