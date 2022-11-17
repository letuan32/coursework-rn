import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView, TextInput, Button, Alert } from 'react-native'
import { RadioButton, Text } from 'react-native-paper';
import { insertTrip } from '../services/db-service';
import { useDbContext } from "../context/DbContext";
import { ScrollView } from 'react-native-gesture-handler';

const AddTrip = ({ navigation }) => {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [risk, setRisk] = useState('No');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const db = useDbContext();

  async function AddTrip() {
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
      await insertTrip(db, name, destination, date, risk, description);
      navigation.navigate('Home')
    } catch (e) {
      setError(`An error occurred while adding the Trip: ${e.message}`);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>Name</Text>
        <TextInput
          onChangeText={name => setName(name)}
          placeholder="Trip Name" />
        <Text>Destination</Text>
        <TextInput
          onChangeText={destination => setDestination(destination)}
          placeholder="Trip Destination" />
        <Text>Date</Text>
        <TextInput
          onChangeText={date => setDate(date)}
          placeholder="Trip Date" />
        <Text>Risk Assessment</Text>
        <View>
          <View>
            <Text>Yes</Text>
            <RadioButton
              value="Yes"
              status={risk === 'Yes' ? 'checked' : 'unchecked'}
              onPress={() => setRisk('Yes')} />
          </View>
          <View>
            <Text>No</Text>
            <RadioButton
              value="No"
              status={risk === 'No' ? 'checked' : 'unchecked'}
              onPress={() => setRisk('No')} />
          </View>
        </View>
        <Text>Description</Text>
        <TextInput
          onChangeText={description => setDescription(description)}
          placeholder="Trip Description" />
        <Button
          title="Add"
          onPress={AddTrip} />
        {error && <Text>{error}</Text>}
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
  }
});

export default AddTrip;