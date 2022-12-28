import * as React from "react";

import { View } from "react-native";
import {styled} from "nativewind";

import HomePinItemList from "../components/HomePinItemList";
import HomeItemList from "../components/HomeItemList";

const StyledView = styled(View);

export const HomeScreen = () => {
    return (<>
        <StyledView className="bg-white px-3 py-5">
            <HomePinItemList />
        </StyledView>
        <StyledView className="lg:flex-1 px-3 min-h-0 min-w-0">
            <HomeItemList />
        </StyledView>
    </>)
}

export default HomeScreen;
