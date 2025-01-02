import React, { useMemo } from 'react'
import { FlatList, View, Text } from 'react-native';
import ContactHorizontal from './ContactHorizontal';
import SkeletonAvatarContact from './SkeletonAvatarContact';

interface ListUserOnlineProps {
    isLoadingListContacts: boolean;
    listContacts: Contact[];
}

export default function ListUserOnline({
    isLoadingListContacts,
    listContacts
} : ListUserOnlineProps) {

    const listContactsHasMessage = useMemo(() => {
        return listContacts.filter(c => c.newMessage)
    }, [listContacts])

    return (
        <FlatList
            // ItemSeparatorComponent={
            //   <View
            //     style={{
            //       height: 1,
            //       backgroundColor: "#CED0CE",
            //     }}
            //   />
            // }
            horizontal
            data={isLoadingListContacts ? Array.from({ length: 4 }, (_, i) => i + 1) as any : listContactsHasMessage}
            keyExtractor={(item) => typeof item === 'number' ? item : item.receiver.id}
            renderItem={({ item }) => {
                if (isLoadingListContacts) {
                    return <SkeletonAvatarContact/>
                }
                return <ContactHorizontal receiver={item.receiver} />
            }}
            showsHorizontalScrollIndicator={false}
            // ListFooterComponent={() => {
            // if (!isLoadMore) return;
            // return (
            //     <View className="flex justify-center items-center">
            //     <ActivityIndicator size="small" color="#fff" />
            //     </View>
            // );
            // }}
            // ListEmptyComponent={() => (
            //     <EmptyState
            //         title="No Videos Found"
            //         subtitle="No videos created yet"
            //     />
            // )}
            // refreshControl={
            //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
        />
    )
}
