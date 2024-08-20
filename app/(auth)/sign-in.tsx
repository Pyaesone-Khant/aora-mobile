import React, { useState } from 'react'

// constants
import { images } from '@/constants'

// components
import { CustomButton, FormField } from '@/components'
import { Link } from 'expo-router'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const SignIn = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);


    const onSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    return (
        <SafeAreaView className="bg-primary h-full" >
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6" >
                    <Image source={images.logo} className='w-[115px] h-[35px]' />
                    <Text className='text-white text-2xl font-psemibold mt-10' > Log in to Aora </Text>

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChange={(value: string) => setForm({ ...form, email: value })}
                        otherStyles="mt-6"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChange={(value: string) => setForm({ ...form, password: value })}
                        otherStyles="mt-6"
                    />

                    <CustomButton
                        title='Sign In'
                        handlePress={() => { }}
                        containerStyles='mt-8'
                        isLoading={loading}
                    />

                    <View className="justify-center items-center py-6 flex-row gap-2">
                        <Text className='text-base text-gray-100 font-pregular'>
                            Don't have an account?
                        </Text>
                        <Link href={"/sign-up"} className="font-psemibold text-secondary" > Sign Up </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn