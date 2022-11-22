import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, TextInput, Button, Alert } from 'react-native'
import { RadioButton, Switch, Text } from 'react-native-paper';
import { insertTrip, updateTrip } from '../services/db-service';
import { useDbContext } from "../context/DbContext";
import { ScrollView } from 'react-native-gesture-handler';

const DetailsTrip = ({ navigation, route }) => {
  const {trip} = route.params;
  const [name, setName] = useState(trip.name);
  const [isEnableSave, setIsEnableSave] = useState(false);
  const [destination, setDestination] = useState(trip.destination);
  const [date, setDate] = useState(trip.date);
  const [risk, setRisk] = useState(trip.isRequireRiskAssessment);
  const [description, setDescription] = useState(trip.description);
  const [error, setError] = useState(null);
  const [isEnableEdit, setIsEnableEdit] = useState(true);
  const db = useDbContext();

  const handleOnEnableSwitchChange = () =>
  {
    setIsEnableEdit(previousState => !previousState)
    setIsEnableSave(!isEnableSave)
  }

  async function UpdateTrip() {
    if (name === "") {
      setError("Trip name is required");
      return;
    } if (destination === "") {
      setError("Destination is required");
      return;
    } if (date === "") {
      setError("Trip date is required");
      return;
    }

    try {
      await updateTrip(db, name, destination, date, risk, description, trip.id);
      navigation.navigate('Home')
    } catch (e) {
      setError(`An error occurred while update the Trip: ${e.message}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>Name</Text>
        <TextInput
          defaultValue={trip.name}
          onChangeText={name => setName(name)}
          placeholder="Trip Name" />
        <Text>Destination</Text>
        <TextInput
          defaultValue={trip.destination}
          onChangeText={destination => setDestination(destination)}
          placeholder="Trip Destination" />
        <Text>Date</Text>
        <TextInput
          defaultValue={trip.date}
          onChangeText={date => setDate(date)}
          placeholder="Trip Date" />
        <Text>Risk Assessment</Text>
        <View>
          <View>
            <Text>Yes</Text>
            <RadioButton
              defaultValue={trip.isRequireRiskAssessment}
              status={risk === 'Yes' ? 'checked' : 'unchecked'}
              onPress={() => setRisk('Yes')} />
          </View>
          <View>
            <Text>No</Text>
            <RadioButton
              defaultValue="No"
              status={risk === 'No' ? 'checked' : 'unchecked'}
              onPress={() => setRisk('No')} />
          </View>
        </View>
        <Text>Description</Text>
        <TextInput
          defaultValue={description}
          onChangeText={description => setDescription(description)}
          placeholder="Trip Description" />

        <View>

      <View style={styles.switch}>
        <Text>Enable Edit</Text>
        <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnableEdit ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleOnEnableSwitchChange}
        value={isEnableEdit}
        />
      </View>

        <Button
          disabled={isEnableSave}
          title="Save"
          onPress={UpdateTrip} />
        {error && <Text>{error}</Text>}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 30,
    paddingTop: 30,
  },
  switch: {
    flexDirection: "column",
    alignContent: "center"
  }
});

export default DetailsTrip;