import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

export default function SkeletonAvatarContact() {
    return (
        <ContentLoader
            height={100}
            width={100}
            speed={1}
            backgroundColor={'#333'}
            foregroundColor={'#999'}
            viewBox="0 20 150 100"
        >
            {/* Only SVG shapes */}
            <Circle cx="60" cy="60" r="55" />
            <Rect x="20" y="130" rx="4" ry="4" width="80" height="13" />
        </ContentLoader>
    )
}
