import { icons } from "@/constants";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

type PropsType = {
    title: string;
    value: string;
    handleChange: (value: string) => void;
    otherStyles?: string;
    keyboardType?: string;
    placeholder?: string;
}

const FormField = ({ title, value, handleChange, otherStyles, keyboardType, placeholder }: PropsType) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">
                {title}
            </Text>
            <View className="w-full px-4 h-16 bg-black-100 border border-black-200 rounded-2xl focus:border-secondary items-center  flex-row">
                <TextInput
                    className="flex-1 text-white font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChange}
                    secureTextEntry={title === 'Password' && !showPassword}
                />
                {
                    title === 'Password' && (
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} >
                            <Image
                                source={!showPassword ? icons.eye : icons.eyeHide}
                                className="w-5 h-6 self-end"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    );
};

export default FormField;
