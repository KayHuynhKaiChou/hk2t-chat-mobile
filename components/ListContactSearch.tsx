import CardContact from "./CardContact"
import { View, StyleSheet, FlatList } from "react-native"


interface ListContactsSearchProps {
    listContacts: Contact[]
}
export default function ListContactSearch({
    listContacts
} : ListContactsSearchProps) {
    return (
        <FlatList
        data={listContacts}
        keyExtractor={item => item.receiver.id}
        renderItem={({ item }) => {
            return <CardContact contact={item} isUseForSearch/>
        }}
        showsHorizontalScrollIndicator={false}
        // ListHeaderComponentStyle={{ marginBottom: 12 }}
        // ListHeaderComponent={() => (
        //     <ListUserOnline isLoadingListContacts={isLoadingListContacts} listContacts={listContacts}/>
        // )}
        contentContainerStyle={{ paddingBottom: 90 }}
        ItemSeparatorComponent={() => (
            <View style={styles.seperatorWrapper}>
                <View style={styles.seperator}></View>
            </View>
        )}
    />
    )
}

const styles = StyleSheet.create({
  seperatorWrapper: {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },
  seperator: {
    width: '84%', 
    height: 1, 
    backgroundColor: "#5c5c5c"
  }
});
