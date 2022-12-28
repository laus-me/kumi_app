import * as React from "react";

import {View, Text, FlatList} from "react-native";
import {styled} from "nativewind";

import NoteItem from "./NoteItem";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledFlatList = styled(FlatList);

const data = [
    {
        id: 0,
        title: "Hi",
        isResolved: true,
        isNotificationEnabled: false,
        notificationStart: 1000000,
        notificationEnd: 10000000,
    },
];

const NotePinItemList = ({navigation}) => {
    const renderItem = ({item}) => (
        <NoteItem title={item.title} navigation={navigation} />
    );

    return (<>
        <StyledView className="mb-2">
            <StyledText>版上釘釘</StyledText>
        </StyledView>
        <StyledFlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    </>);
};

export default NotePinItemList;
