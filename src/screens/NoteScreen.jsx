import * as React from "react";
import classnames from "classnames";

import {View} from "react-native";
import {styled} from "nativewind";

import NotePinItemList from "../components/NotePinItemList";
import NoteItemList from "../components/NoteItemList";

import {HomeIcon} from "react-native-heroicons/outline";

const StyledView = styled(View);

const isPinItemExists = false;

export
const optionNoteScreen = {
    title: "清單",
    tabBarIcon: ({color, size}) => (
        <HomeIcon
            name="home-icon"
            color={color}
            size={size}
        />
    ),
};

export const NoteScreen = ({navigation}) => {
    const classNameHomeItemList = classnames({
        "min-h-0": true,
        "min-w-0": true,
        "px-3": isPinItemExists,
        "lg:flex-1": true,
    })

    return (<>
        {isPinItemExists && (
            <StyledView className="bg-white px-3 py-5 mb-3">
                <NotePinItemList navigation={navigation} />
            </StyledView>
        )}
        <StyledView className={classNameHomeItemList}>
            <NoteItemList navigation={navigation} />
        </StyledView>
    </>);
};
