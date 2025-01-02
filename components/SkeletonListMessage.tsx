import React from 'react'
import { View } from 'react-native'
import SkeletonMessage from './SkeletonMessages'

export default function SkeletonListMessage() {
    return (
        <View>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <SkeletonMessage key={item} direction={item % 2 === 0 ? 'left' : 'right'}/>
            ))}
        </View>
    )
}
