import React from "react";
import { Text, View } from "react-native";

type PropsType = {
    title: string;
    subTitle?: string;
    containerStyles?: string;
    titleStyles?: string;
}

const InfoBox = ({ title, subTitle, containerStyles, titleStyles }: PropsType) => {

    return (
        <View className={containerStyles}>
            <Text className={`text-white font-psemibold text-center ${titleStyles}`}>
                {title}
            </Text>
            <Text className="text-sm text-gray-100 text-center font-pregular" >
                {subTitle}
            </Text>
        </View>
    );
};

export default InfoBox;
