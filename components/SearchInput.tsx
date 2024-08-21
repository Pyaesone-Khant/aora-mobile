import React, { useState } from "react";

// constants
import { icons } from "@/constants";

// components
import { router, usePathname } from "expo-router";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";

const SearchInput = ({ initialQuery }: { initialQuery: string }) => {

    const [query, setQuery] = useState("" || initialQuery);
    const pathname = usePathname();

    const onChange = (text: string) => {
        setQuery(text);
    }

    const onSearch = () => {
        if (!query) {
            Alert.alert("Missing Query", "Please input something to search results across database.");
            return;
        }

        if (pathname.startsWith("/search")) router.setParams({ query });
        else router.push(`/search/${query}`);
    }

    return (
        <View className="w-full px-4 h-16 bg-black-100 border border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4 ">
            <TextInput
                className="flex-1 text-white font-pregular text-base mt-0.5"
                value={query}
                placeholder={"Search video topics"}
                placeholderTextColor="#cdcde0"
                onChangeText={onChange}
            />
            <TouchableOpacity onPress={onSearch}>
                <Image
                    source={icons.search} className="w-5 h-5" resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;
