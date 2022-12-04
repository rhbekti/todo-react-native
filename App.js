import "react-native-gesture-handler";
import { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import { View } from "react-native";

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Add" component={Add} />
            <Stack.Screen name="Edit" component={Edit} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

export default App;
