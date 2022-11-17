import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function TripListItem({ trip, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text>Name: {trip.name}</Text>
        <Text>Destination: {trip.destination}</Text>
        <Text>Date: {trip.date}</Text>
        <Text>Require risk asssessment: {trip.isRequireRiskAssessment}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  }
})
