import { Stack } from 'expo-router'
import React from 'react'

const RootPage = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            headerShown: false, title: "Home"
        }} />
    </Stack>
  )
}

export default RootPage