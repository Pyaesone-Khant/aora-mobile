import React from "react";

// constants
import { icons } from "@/constants";

// components
import { Image, TextInput, TouchableOpacity, View } from "react-native";

type PropsType = {
    value: string;
    handleChange: (value: string) => void;
}

const SearchInput = ({ value, handleChange }: PropsType) => {
    return (
        <View className="w-full px-4 h-16 bg-black-100 border border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4 ">
            <TextInput
                className="flex-1 text-white font-pregular text-base mt-0.5"
                value={value}
                placeholder={"Search video topics"}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChange}
            />
            <TouchableOpacity>
                <Image
                    source={icons.search} className="w-5 h-5" resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;
