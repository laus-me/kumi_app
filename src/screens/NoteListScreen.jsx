import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';

import classnames from "classnames";

import {
    setNoteModified,
    setPinNoteModified
} from '../redux/actions/NoteAction';

import {
    getAllNotes,
    getAllPinNotes
} from "../storage/NoteStorage";

import {View} from "react-native";
import {styled} from "nativewind";

import NotePinItemList from "../components/NotePinItemList";
import NoteItemList from "../components/NoteItemList";

import {HomeIcon} from "react-native-heroicons/outline";

const StyledView = styled(View);

export const optionNoteListScreen = {
    title: "清單",
    tabBarIcon: ({color, size}) => (
        <HomeIcon
            name="home-icon"
            color={color}
            size={size}
        />
    ),
};

export const NoteListScreen = ({navigation}) => {
    const {
        isNoteModified,
        isPinNoteModified
    } = useSelector(state => state.note);
    const dispatch = useDispatch();

    const [allNotes, setAllNotes] = useState([]);
    const [allPinNotes, setAllPinNotes] = useState([]);

    useEffect(() => {
        getAllNotes()
            .then((i) => {
                setAllNotes(i);
                console.log(i)
                dispatch(setNoteModified(false));
            })
            .catch((e) => console.error(e));
    }, [isNoteModified, isPinNoteModified]);

    useEffect(() => {
        getAllPinNotes()
            .then((i) => {
                setAllPinNotes(i);
                dispatch(setPinNoteModified(false));
            })
            .catch((e) => console.error(e));
    }, [isNoteModified, isPinNoteModified]);

    const classNameHomeItemList = classnames({
        "min-h-0": true,
        "min-w-0": true,
        "px-3": allPinNotes.length > 0,
        "lg:flex-1": true,
    })

    return (<>
        {allPinNotes.length > 0 && (
            <StyledView className="bg-white px-3 py-5 mb-3">
                <NotePinItemList
                    allPinNotes={allPinNotes}
                    navigation={navigation}
                />
            </StyledView>
        )}
        <StyledView className={classNameHomeItemList}>
            <NoteItemList
                allNotes={allNotes}
                navigation={navigation}
            />
        </StyledView>
    </>);
};
