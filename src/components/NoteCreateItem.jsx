import * as React from "react";

import {View, Text, TouchableOpacity} from "react-native";
import {styled} from "nativewind";

import {
    PlusCircleIcon,
} from "react-native-heroicons/outline";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const NoteCreateItem = (props) => {
    const {navigation} = props;

    const handlePress = () => {
        navigation.navigate("NoteCreateStack");
    };

    return (
        <StyledTouchableOpacity
            className="flex px-5 py-3 hover:bg-gray-100 w-full flex-row"
            onPress={handlePress}
        >
            <StyledView
                className="flex-none w-10 mr-3 cursor-pointer"
            >
                <PlusCircleIcon color="#000" title="新增" size={35} />
            </StyledView>
            <StyledView
                className="grow select-none cursor-pointer"
            >
                <StyledView>
                    <StyledText className="text-slate-900">
                        建立新的提醒事項
                    </StyledText>
                </StyledView>
                <StyledView className="grow w-64 select-none cursor-pointer">
                    <StyledText className="text-gray-600">
                        我還能提醒你更多更多 😊
                    </StyledText>
                </StyledView>
            </StyledView>
        </StyledTouchableOpacity>
    );
};

export default NoteCreateItem;
