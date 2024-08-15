import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ProfilePage = () => {
  return (
    <View>
      <Text style={styles.header} >ProfilePage</Text>
    </View>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    }
})