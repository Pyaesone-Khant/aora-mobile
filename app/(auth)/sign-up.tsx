import React, { useState } from 'react'

// constants
import { images } from '@/constants'

// components
import { CustomButton, FormField } from '@/components'
import { useGlobalContext } from '@/context/GlobalProvider'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const SignUp = () => {

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUser, setIsLoggedIn } = useGlobalContext();

    const onSubmit = async () => {
        if (!(form.username && form.email && form.password)) {
            Alert.alert("Error", "Please fill in all the fields");
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await createUser(form)
            setUser(result);
            setIsLoggedIn(true);
            router.replace("/home")
        } catch (error: any) {
            Alert.alert("Error", error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full" >
            <ScrollView contentContainerStyle={{
                justifyContent: "center"
            }} >
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                    <Image source={images.logo} className='w-[115px] h-[35px]' />
                    <Text className='text-white text-2xl font-psemibold mt-10' > Sign up to Aora </Text>

                    <FormField
                        title="Username"
                        value={form.username}
                        handleChange={(value: string) => setForm({ ...form, username: value })}
                        otherStyles="mt-6"
                    />

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
                        title='Sign Up'
                        handlePress={onSubmit}
                        containerStyles='mt-8'
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center items-center py-6 flex-row gap-2">
                        <Text className='text-base text-gray-100 font-pregular'>
                            Already have an account?
                        </Text>
                        <Link href={"/sign-in"} className="font-psemibold text-secondary" > Sign In </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp