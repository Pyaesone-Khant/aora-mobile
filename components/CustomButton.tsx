import React from "react";

// components
import { Text, TouchableOpacity } from "react-native";

type PropsType = {
    title: string
    handlePress: () => void,
    containerStyles?: string,
    textStyles?: string
    isLoading?: boolean
}

const CustomButton = ({ title = "Button", handlePress, containerStyles, textStyles, isLoading }: PropsType) => {
    return (
        <TouchableOpacity
            className={`bg-secondary rounded-xl py-4 justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''} `}
            disabled={isLoading}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
