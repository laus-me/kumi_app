import * as React from "react";

import {View, Text, FlatList} from "react-native";
import {styled} from "nativewind";

import NoteItem from "./NoteItem";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledFlatList = styled(FlatList);

const NotePinItemList = (props) => {
    const {
        navigation,
        allPinNotes,
    } = props;

    const renderItem = ({item}) => (
        <NoteItem
            navigation={navigation}
            {...item}
        />
    );

    return (<>
        <StyledView className="mb-2">
            <StyledText>版上釘釘</StyledText>
        </StyledView>
        <StyledFlatList
            data={allPinNotes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    </>);
};

export default NotePinItemList;
