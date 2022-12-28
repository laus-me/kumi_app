import * as React from "react";
import classnames from "classnames";

import {View} from "react-native";
import {styled} from "nativewind";

import HomePinItemList from "../components/HomePinItemList";
import HomeItemList from "../components/HomeItemList";

const StyledView = styled(View);

const isPinItemExists = false;

export const HomeScreen = ({navigation}) => {
    const classNameHomeItemList = classnames({
        "min-h-0": true,
        "min-w-0": true,
        "px-3": isPinItemExists,
        "lg:flex-1": true,
    })

    return (<>
        {isPinItemExists && (
            <StyledView className="bg-white px-3 py-5 mb-3">
                <HomePinItemList navigation={navigation} />
            </StyledView>
        )}
        <StyledView className={classNameHomeItemList}>
            <HomeItemList navigation={navigation} />
        </StyledView>
    </>);
};

export default HomeScreen;
