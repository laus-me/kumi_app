import * as React from 'react';

import { withExpoSnack } from 'nativewind';

import { Text, View } from 'react-native';
import {styled} from "nativewind";

import HomeItem from './HomeItem';

const StyledView = styled(View);
const StyledText = styled(Text);

const HomePinItemList = () => {
    return (
        <StyledView className="flex flex-col lg:flex-row h-full w-full">
            <StyledView className="mb-3 lg:pb-0 w-full lg:max-w-sm px-3 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap bg-white">
                <StyledText>版上釘釘</StyledText>
            </StyledView>
            <StyledView>
                <HomeItem />
                <HomeItem />
            </StyledView>
        </StyledView>
    )
}

export default withExpoSnack(HomePinItemList);
