import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

interface SkeletonMessageProps {
    direction?: 'left' | 'right'
}

export default function SkeletonMessage({ direction = 'left' } : SkeletonMessageProps) {
    if(direction === 'right') {
        return (
            <ContentLoader
                height={80}
                speed={1}
                backgroundColor={'#333'}
                foregroundColor={'#999'}
                viewBox="0 0 250 100"
            >
                <Circle cx="300" cy="45" r="45" />
                <Rect x="35" y="25" rx="4" ry="4" width="200" height="40" />
            </ContentLoader>

        )
    }
    return (
        <ContentLoader
            height={80}
            speed={1}
            backgroundColor={'#333'}
            foregroundColor={'#999'}
            viewBox="58 0 250 100"
        >
            <Circle cx="45" cy="45" r="45" />
            <Rect x="110" y="25" rx="4" ry="4" width="200" height="40" />
        </ContentLoader>
    )
}
