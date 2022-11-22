import React, { useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, Button, Text, SafeAreaView, Alert } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { getTrips, deleteAll } from "../services/db-service";
import TripListItem from '../components/TripListItem';
import { useDbContext } from "../context/DbContext";

const Home = ({ navigation }) => {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const db = useDbContext();

  useLayoutEffect(
    function () {
      navigation.setOptions({
        headerRight: () => (
          <View style={styles.buttonLayout}>
            <Button
              color="green"
              onPress={() => navigation.navigate("AddTrip")}
              title="Record Trip"
            />
            <Button
              color="red"
              onPress={() =>
                 handleDeleteAll()}
              title="Remove ALl"
            />
          </View>
        )
      })
    }, [navigation]
  );

  const handleDeleteAll = () => {

    Alert.alert(
      "Delete all trips",
      "Are you sure to delete all trips?",
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete all",
          onPress: () => {
            deleteAll(db)
          setTrips([]);
          },
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => 
        {
        }
          
      }
    );
           
            
  };

  const handleOnItemPress = (trip) => {
    navigation.navigate("DetailsTrip",trip)
};


  const focusEffect = useCallback(function () {
    async function fetchData() {
      try {
        const trips = await getTrips(db);
        setTrips(trips);
      } catch (e) {
        setError(`An error occurred while retrieving the trips: ${e.message}`);
      }
    }
    fetchData();
  }, [db]);
  useFocusEffect(focusEffect);


  if (error) {
    return <Text>{error.message}</Text>
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.list}>
        <FlatList
          data={trips}
          renderItem={({ item }) => (
            <TripListItem
            // TODO: Handle view detail
            trip={item}
            onPress={() => handleOnItemPress({trip: item})}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    marginRight: 15,
  },
  list: {
    flex: 1,
    width: "100%",
  },
});

export default Home;
