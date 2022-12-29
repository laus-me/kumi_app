import * as React from "react";

import {FlatList} from "react-native";
import {styled} from "nativewind";

import NoteCreateItem from "./NoteCreateItem";
import NoteItem from "./NoteItem";

const StyledFlatList = styled(FlatList);

const NoteItemList = (props) => {
    const {
        navigation,
        allNotes,
    } = props;

    const renderItem = ({item}) => (
        <NoteItem
            navigation={navigation}
            {...item}
        />
    );

    return (<>
        <NoteCreateItem navigation={navigation} />
        <StyledFlatList
            className="bg-white w-full h-full min-h-0 min-w-0 overflow-auto"
            data={allNotes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    </>);
};

export default NoteItemList;
