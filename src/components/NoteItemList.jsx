import React, {useState} from "react";

import {FlatList} from "react-native";
import {styled} from "nativewind";

import {getAllNotes} from "../storage/NoteStorage";

import NoteCreateItem from "./NoteCreateItem";
import NoteItem from "./NoteItem";

const StyledFlatList = styled(FlatList);

const NoteItemList = ({navigation}) => {
    const [allNotes, setAllNotes] = useState([]);

    getAllNotes()
        .then((i) => setAllNotes(i))
        .catch((e) => console.error(e));

    const renderItem = ({item}) => (
        <NoteItem title={item.title} navigation={navigation} />
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
