import * as React from 'react';

import { withExpoSnack } from 'nativewind';

import { View } from 'react-native';
import { styled } from 'nativewind';

import HomeItem from "./HomeItem";

const StyledView = styled(View);

const HomeItemList = () => {
    return (
        <StyledView className="h-full w-full lg:flex-1 px-3 min-h-0 min-w-0">
            <StyledView className="bg-white w-full h-full min-h-0 min-w-0 overflow-auto">
                <HomeItem />
            </StyledView>
        </StyledView>
    )
}

export default withExpoSnack(HomeItemList);
