import React, { useState } from "react";

// constants
import { icons } from "@/constants";

// types
import { PostProps } from "@/types/typings";

// components
import { ResizeMode, Video } from "expo-av";
import { Image, Text, TouchableOpacity, View } from "react-native";

const VideoCard = ({ item: { title, thumbnail, video, creator: { username, avatar } } }: { item: PostProps }) => {

    const [play, setPlay] = useState(false);

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className=" flex-row gap-3 items-start" >
                <View className="flex-row justify-center items-center flex-1" >
                    <View className="w-11 h-11 rounded-lg border border-secondary justify-center items-center p-0.5" >
                        <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1" >
                        <Text className="text-white font-psemibold text-sm" >
                            {title}
                        </Text>
                        <Text className="text-gray-100 font-pregular text-xs" >
                            {username}
                        </Text>
                    </View>
                </View>

                <View className="pt-2" >
                    <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                </View>
            </View>

            {
                play ? <Video
                    source={{ uri: video }}
                    className="w-full h-60 rounded-3xl mt-3"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }} /> : <TouchableOpacity className="w-full h-60 rounded-xl mt-4 relative justify-center items-center" activeOpacity={0.7} onPress={() => setPlay(true)} >
                    <Image source={{ uri: thumbnail }} className="w-full h-full rounded-s-xl" resizeMode="cover" />
                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
                </TouchableOpacity>
            }

        </View>
    );
};

export default VideoCard;
