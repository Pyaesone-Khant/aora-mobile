import React from "react";

// constants
import { images } from "@/constants";

// components
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";

type PropsType = {
    title: string
    subTitle: string
}

const NoData = ({ title, subTitle }: PropsType) => {
    return (
        <View className="justify-center items-center px-4">
            <Image source={images.empty} className="w-64 h-52" resizeMode="contain" />

            <Text className="text-xl text-center font-psemibold text-white mt-2">
                {title}
            </Text>
            <Text className="font-pmedium text-sm text-gray-100" >
                {subTitle}
            </Text>

            <CustomButton title="Create Video" containerStyles="w-full my-5" handlePress={() => router.push("/create")} />

        </View>
    );
};

export default NoData;
