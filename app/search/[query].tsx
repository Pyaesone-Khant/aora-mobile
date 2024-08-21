import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';

// constants
import { images } from '@/constants';

// components
import { NoData, SearchInput, VideoCard } from '@/components';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// apis
import { searchPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';

const Search = () => {
    const { query } = useLocalSearchParams();

    const { data: posts, refetch } = useAppwrite(() => searchPosts(query as string));

    useEffect(() => {
        refetch()
    }, [query])

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={posts}
                renderItem={({ item }) => <VideoCard item={item} key={item.id} />}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4 space-y-6'>
                        <View className="justify-between items-start flex-row mb-6" >
                            <View>
                                <Text className='font-pmedium text-sm text-gray-100'>
                                    Search Results
                                </Text>
                                <Text className='text-2xl font-psemibold text-gray-100'>
                                    {query}
                                </Text>
                            </View>
                            <View className='mt-1.5'>
                                <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain' />
                            </View>
                        </View>
                        <SearchInput initialQuery={query as string} />
                    </View>
                )}
                ListEmptyComponent={() => <NoData title='No Video Found!' subTitle='No videos found for this search query!' />}
            />

            <StatusBar style="light" />
        </SafeAreaView>
    )
}

export default Search