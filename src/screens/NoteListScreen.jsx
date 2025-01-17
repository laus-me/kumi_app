import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import classnames from "classnames";

import {
    setNoteModified,
} from "../redux/actions/NoteAction";

import {
    getAllNotes,
    getAllPinNotes,
} from "../storage/NoteStorage";

import {View, TouchableOpacity} from "react-native";
import {styled} from "nativewind";

import NotePinItemList from "../components/NotePinItemList";
import NoteItemList from "../components/NoteItemList";

import {
    HomeIcon,
    BoltIcon,
} from "react-native-heroicons/outline";

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const createOptionNoteListScreen = ({navigation}) => ({
    title: "清單",
    headerRight: () => (
        <NoteListHeaderRightButton navigation={navigation} />
    ),
    tabBarIcon: ({color, size}) => (
        <HomeIcon
            name="home-icon"
            color={color}
            size={size}
        />
    ),
});

const NoteListHeaderRightButton = ({navigation}) => {
    const handlePress = () => {
        navigation.navigate("SyncStack");
    };

    return (
        <StyledView className="mr-3">
            <StyledTouchableOpacity onPress={handlePress}>
                <BoltIcon color="#000" />
            </StyledTouchableOpacity>
        </StyledView>
    );
};

export const NoteListScreen = ({navigation}) => {
    const {isNoteModified} = useSelector((state) => state.note);
    const dispatch = useDispatch();

    const [allNotes, setAllNotes] = useState([]);
    const [allPinNotes, setAllPinNotes] = useState([]);

    useEffect(() => {
        getAllNotes()
            .then((i) => {
                setAllNotes(i);
                dispatch(setNoteModified(false));
            })
            .catch((e) => {
                console.error(e);
            });
    }, [isNoteModified]);

    useEffect(() => {
        getAllPinNotes()
            .then((i) => {
                setAllPinNotes(i);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [isNoteModified]);

    const classNameHomeItemList = classnames({
        "min-h-0": true,
        "min-w-0": true,
        "px-3": allPinNotes.length > 0,
        "lg:flex-1": true,
    });

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
