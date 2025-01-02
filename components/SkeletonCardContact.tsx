import ContentLoader, { Rect, Circle } from 'react-content-loader/native'


export default function SkeletonCardContact() {
    return (
        <ContentLoader
            height={80}
            speed={1}
            backgroundColor={'#333'}
            foregroundColor={'#999'}
            viewBox="58 0 250 100"
        >
            <Circle cx="45" cy="45" r="45" />
            <Rect x="110" y="15" rx="4" ry="4" width="100" height="25" />
            <Rect x="110" y="55" rx="4" ry="4" width="300" height="15" />
        </ContentLoader>
    )
}
