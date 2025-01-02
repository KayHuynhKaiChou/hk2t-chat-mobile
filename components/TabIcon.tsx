import { StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

interface TabIconProps {
    nameTab: string;
    nameIconExpo: keyof typeof Ionicons.glyphMap;
    focused: boolean;
    color: string
}

export default function TabIcon({
    nameTab,
    nameIconExpo,
    focused,
    color
} : TabIconProps) {
    return (
        <View style={styles.container}>
            <Ionicons name={nameIconExpo} size={24} color={color} />
            <Text
                className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
                style={{ color }}
            >
                {nameTab}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  }
});
