import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarInfo from "./CarInfo";
import Tabs from "./Tabs";

const MainPage = createNativeStackNavigator();
const Main = () => {
  return (
    <MainPage.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainPage.Screen name="Tabs" component={Tabs} />
      <MainPage.Screen name="CarInfo" component={CarInfo} />
    </MainPage.Navigator>
  );
};

export default Main;
