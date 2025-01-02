import { FlatList, View } from "react-native"
import CardContact from "./CardContact"
import ListUserOnline from "./ListUserOnline";
import SkeletonCardContact from "./SkeletonCardContact";

interface ListContactsProps {
    isLoadingListContacts: boolean;
    listContacts: Contact[];
    user: User;
}

export default function ListContacts({
    isLoadingListContacts,
    listContacts,
    user
} : ListContactsProps) {
    
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
            data={isLoadingListContacts ? Array.from({ length: 6 }, (_, i) => i + 1) as any : listContacts}
            keyExtractor={(item) => typeof item === 'number' ? item : item.receiver.id}
            renderItem={({ item }) => {
                if (isLoadingListContacts) {
                    return <SkeletonCardContact />
                }
                return <CardContact contact={item} user={user}/>
            }}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponentStyle={{ marginBottom: 12 }}
            ListHeaderComponent={() => (
                <ListUserOnline isLoadingListContacts={isLoadingListContacts} listContacts={listContacts}/>
            )}
            ListFooterComponent={() => (<View/>)}
            ListFooterComponentStyle={{ height: 100 }}
            contentContainerStyle={{ paddingBottom: 90 }}
            ItemSeparatorComponent={() => (
                <View style={{ marginVertical: 7 }}></View>
            )}
        />
    )
}
