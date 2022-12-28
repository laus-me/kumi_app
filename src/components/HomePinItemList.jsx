import * as React from "react";

import {withExpoSnack} from "nativewind";

import { Text, View, FlatList } from "react-native";
import {styled} from "nativewind";

import HomeItem from "./HomeItem";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledFlatList = styled(FlatList);

const data = [
    {
        id: 0,
        title: "Hi",
        isResolved: true,
        isNotificationEnabled: false,
        notificationStart: 1000000,
        notificationEnd: 10000000
    }
];

const HomePinItemList = () => {
    const renderItem = ({ item }) => (
        <HomeItem title={item.title} />
    );

    return (
        <StyledView className="bg-white px-3 py-5">
            <StyledView className="mb-2">
                <StyledText>版上釘釘</StyledText>
            </StyledView>
            <StyledFlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </StyledView>
    )
};

export default withExpoSnack(HomePinItemList);
