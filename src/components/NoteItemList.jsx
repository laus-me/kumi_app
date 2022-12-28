import * as React from "react";

import {FlatList} from "react-native";
import {styled} from "nativewind";

import NoteItem from "./NoteItem";

const StyledFlatList = styled(FlatList);

const data = [
    {
        id: 0,
        title: "Hi00000",
        isResolved: false,
        isNotificationEnabled: false,
        notificationStart: 1000000,
        notificationEnd: 10000000,
    },
];

const NoteItemList = ({navigation}) => {
    const renderItem = ({item}) => (
        <NoteItem title={item.title} navigation={navigation} />
    );

    return (
        <StyledFlatList
            className="bg-white w-full h-full min-h-0 min-w-0 overflow-auto"
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    );
};

export default NoteItemList;
