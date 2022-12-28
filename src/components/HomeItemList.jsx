import * as React from "react";

import {withExpoSnack} from "nativewind";

import { View, FlatList } from "react-native";
import { styled } from "nativewind";

import HomeItem from "./HomeItem";

const StyledView = styled(View);
const StyledFlatList = styled(FlatList);

const data = [
    {
        id: 0,
        title: "Hi00000",
        isResolved: false,
        isNotificationEnabled: false,
        notificationStart: 1000000,
        notificationEnd: 10000000
    }
];

const HomeItemList = () => {
    const renderItem = ({ item }) => (
        <HomeItem title={item.title} />
    );

    return (
        <StyledView className="lg:flex-1 px-3 min-h-0 min-w-0">
            <StyledFlatList
                className="bg-white w-full h-full min-h-0 min-w-0 overflow-auto"
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </StyledView>
    )
};

export default withExpoSnack(HomeItemList);
