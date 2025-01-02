import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-paper'
import {SvgXml} from 'react-native-svg';

interface AvatarContactProps {
    svgBase64?: string;
    svg?: string;
    width?: number;
    isShowOnline?: boolean;
    onPress?: () => void
}

export default function AvatarContact({
    svgBase64,
    svg,
    width = 70,
    isShowOnline = true,
    onPress
}: AvatarContactProps) {
    return (
        <TouchableOpacity style={{ width }} onPress={onPress}>
            <SvgXml xml={svg || atob(`${svgBase64}`)} width={width} height={width} />
            <Badge 
                visible={isShowOnline} 
                style={[styles.badge, { right: width === 70 ? 2 : 0}]} 
                size={width === 70 ? 16 : 12}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#42df5c',
        borderWidth: 2,
        borderColor: 'black'
    }
});
