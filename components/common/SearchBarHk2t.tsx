import React from 'react'
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface SearchBarHk2tProps {
    value: string;
    onChangeText: (text: string) => void;
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export default function SearchBarHk2t({ 
    value,
    onChangeText,
    onFocus,
    onBlur 
} : SearchBarHk2tProps) {
    
    return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeText}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    )
}
