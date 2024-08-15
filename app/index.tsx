import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const RootPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Aora</Text>
      <StatusBar style="auto" />
      <Link href={"/profile"} style={{color: "blue"}} >
        Go to Profile
      </Link>
    </View>
  )
}

export default RootPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    }
})