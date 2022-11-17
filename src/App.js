import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, AddTrip} from './screens';
import { DbContextProvider } from "./context/DbContext";
import { initDatabase } from './services/db-service';
import DetailsTrip from './screens/Details';

const Stack = createStackNavigator();



const App = () => {
  useEffect(function () {
    async function init() {
      // Summary: Drop tables if existed then init new table with seed
      await initDatabase();
    }
    init();
  }, []);
  return (
    <DbContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddTrip" component={AddTrip} />
          <Stack.Screen name="DetailsTrip" component={DetailsTrip} />
        </Stack.Navigator>
      </NavigationContainer>
    </DbContextProvider>
  );
};

export default App;

