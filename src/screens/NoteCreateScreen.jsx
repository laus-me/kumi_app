import * as React from "react";

import {Text, View} from "react-native";
import {styled} from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const NoteCreateScreen = () => {
    return (
        <StyledView
            className="container h-12 justify-center bg-slate-300 items-center"
        >
            <StyledText className="text-slate-800">
                Try resizing me! 🎉
            </StyledText>
        </StyledView>
    );
};

export default NoteCreateScreen;
