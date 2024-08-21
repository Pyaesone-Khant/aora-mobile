import React from 'react';

// constants

// components
import { InfoBox, NoData, VideoCard } from '@/components';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// apis
import { icons } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getUserPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';

const Profile = () => {

    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    const { data: posts, refetch } = useAppwrite(() => getUserPosts(user?.$id));

    const onLogout = () => {

    }

    console.log(user)

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={posts}
                renderItem={({ item }) => <VideoCard item={item} key={item.$id} />}
                keyExtractor={(item) => item.$id}
                ListHeaderComponent={() => (
                    <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
                        <TouchableOpacity className='w-full items-end mb-10' onPress={onLogout}>
                            <Image source={icons.logout} className='w-6 h-6' resizeMode='contain' />
                        </TouchableOpacity>
                        <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center' >
                            <Image source={{ uri: user?.avatar }} className='w-[90%] h-[90%] rounded' resizeMode='cover' />
                        </View>
                        <InfoBox
                            title={user?.username}
                            containerStyles="mt-2"
                            titleStyles="text-lg"
                        />

                        <View className="flex-row mt-4 ">
                            <InfoBox
                                title={posts?.length.toString() || "0"}
                                subTitle='Posts'
                                containerStyles="mr-10"
                                titleStyles="text-xl"
                            />
                            <InfoBox
                                title={"1.2K"}
                                subTitle='Followers'
                                titleStyles="text-xl"
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => <NoData title='No Video Found!' subTitle='No videos found for this search query!' />}
            />

            <StatusBar style="light" />
        </SafeAreaView>
    )
}

export default Profile