import { CustomButton, FormField } from '@/components'
import { icons } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { createVideo } from '@/lib/appwrite'
import { ResizeMode, Video } from 'expo-av'
import * as ImagePicker from "expo-image-picker"
import React, { useState } from 'react'
import { Alert, Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'

const Create = () => {

    const {user} = useGlobalContext();
    const [form, setForm] = useState({
        title: "",
        prompt: "",
        video: null,
        thumbnail: null,
    })
    const [loading, setLoading] = useState(false)

    const openPicker = async (fileType: "video" | "image") => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: fileType === "image" ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })

        if(!result.canceled){
            if(fileType === "image"){
                setForm({...form, thumbnail: result.assets[0]})
            }

            if(fileType === "video"){
                setForm({...form, video: result.assets[0]})
            }
        }
    }

    const onSubmit = async () => {
        if(!(form.prompt && form.title && form.video && form.thumbnail)){
            return Alert.alert("Please fill in all the fields!")
        }

        setLoading(true);

        try {
            await createVideo({...form, userId: user.$id})

            Alert.alert("Success", "Post uploaded successfully!")
        } catch (error: any) {
            Alert.alert("Error", error?.message)
        } finally{
            setForm({
                title: "",
                prompt: "",
                video: null,
                thumbnail: null,    
            });
            setLoading(false);
        }
    }

    return (
        <SafeAreaView 
            className='bg-primary h-full'
        >
            <ScrollView
                className='px-4 my-6'
            >
                <Text className='text-2xl font-psemibold text-white' >
                    Upload Video
                </Text>
                <FormField 
                    title='Video Title'
                    value={form.title}
                    placeholder="Give your video a catch title . . ."
                    handleChange={(text) => setForm({...form, title: text})}
                    otherStyles='mt-8'
                />
                <View className='mt-8 space-y-2' >
                    <Text className='text-base text-gray-100 font-pmedium'>
                        Upload Video
                    </Text>
                    <TouchableOpacity
                        onPress={() => openPicker("video")}
                    >
                        {
                            form.video ? (
                            <Video 
                            source={{uri: form.video?.uri!}}
                            className='w-full h-40 rounded-xl'
                            resizeMode={ResizeMode.COVER}
                            />
                            ) : 
                            ( <View className='w-full h-40 px-4 bg-black-100 rounded-xl justify-center items-center ' >
                                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                                    <Image source={icons.upload} resizeMode='contain' className='w-1/2 h-1/2' />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View className='mt-8 space-y-2' >
                    <Text className='text-base text-gray-100 font-pmedium'>
                        Upload Thumbnail
                    </Text>
                    <TouchableOpacity
                        onPress={() => openPicker("image")}
                    >
                        {
                            form.thumbnail ? (
                                <Image source={{uri: form.thumbnail?.uri}} resizeMode='cover' className='w-full h-40 rounded-xl' />
                            ) : 
                            ( <View className='w-full  p-4 bg-black-100 rounded-xl justify-center items-center flex flex-row space-x-3 ' >
                                    <Image source={icons.upload} resizeMode='contain' className='w-6 h-6' />
                                    <Text
                                        className='text-sm text-gray-100 font-pmedium'
                                    >
                                    Choose a File
                                    </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>


                <FormField
                    title="AI Prompt"
                    value={form.prompt}
                    placeholder="The prompt you used to create this video"
                    handleChange={(text) => setForm({...form, prompt: text})}
                    otherStyles='mt-8'
                />

                <CustomButton
                    title='Submit & Publish'
                    handlePress={onSubmit}
                    containerStyles='mt-8'
                    isLoading={loading}
                />

            </ScrollView>
        </SafeAreaView>
    )
}

export default Create