import React, { useState } from 'react'

// constants
import { images } from '@/constants'

// components
import { NoData, SearchInput, TrendingVideos, VideoCard } from '@/components'
import { StatusBar } from 'expo-status-bar'
import { FlatList, Image, RefreshControl, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// apis
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { useLocalSearchParams } from 'expo-router'

const Home = () => {

    const [refreshing, setRefreshing] = useState(false);
    const { query } = useLocalSearchParams()

    const { data: posts, refetch } = useAppwrite(getAllPosts);
    const { data: latestPosts } = useAppwrite(getLatestPosts);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

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
                                    Welcome Back
                                </Text>
                                <Text className='text-2xl font-psemibold text-gray-100'>
                                    Wooki Dooki
                                </Text>
                            </View>
                            <View className='mt-1.5'>
                                <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain' />
                            </View>
                        </View>
                        <SearchInput initialQuery={query as string} />
                        <View className='w-full flex-1 py-6'>
                            <Text className='text-gray-100 text-base font-pregular' >
                                Latest Videos
                            </Text>
                            <TrendingVideos posts={latestPosts} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => <NoData title='No Video Found!' subTitle='Be the first one to upload the videos! ' />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />

            <StatusBar style="light" />
        </SafeAreaView>
    )
}

export default Home