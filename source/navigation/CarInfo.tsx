import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Linking
} from "react-native";
import data from "../dataset/automobile.json";
import { Route, RouteProp } from "@react-navigation/native";

const back = require("../assets/icons/left-arrow.png");
const dots = require("../assets/icons/dots.png");
// Type definition for route params
type CarInfoRouteProp = RouteProp<MainPageParamList, "Info">;

const image_v_1 = require("../assets/automobile/car1.png");
const image_v_2 = require("../assets/automobile/car2.png");
const image_v_3 = require("../assets/automobile/car3.png");
const image_v_4 = require("../assets/automobile/bike1.png");
const image_v_5 = require("../assets/automobile/bike2.png");

const CarInfo: React.FC<{ navigation: any; route: CarInfoRouteProp; }> 
= ({ navigation, route }) => {

  const vehicle = data.automobile.filter(
    (element) => element.id == route.params.id
  )[0];
  const getImage: Record<number, any> = {
    1: image_v_1,
    2: image_v_2,
    3: image_v_3,
    4: image_v_4,
    5: image_v_5,
  };
  const getImageById = (id: number): any => {
    return getImage[id] || null; // Return image path or null if ID not found
  };
  const reserveListing = () => {
    Linking.openURL('https://forms.gle/zebKuS61Hy8jpPzF7') // Google form for user to submit the car application
   };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
          >
            <Image
              source={back}
              resizeMode="contain"
              style={styles.menuIconStyle}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Detail</Text>
          <Image
            source={dots}
            resizeMode="contain"
            style={styles.faceIconStyle}
          />
        </View>

        <View style={styles.imageSection}>
          <Image
            source={getImageById(vehicle.id)}
            resizeMode="contain"
            style={styles.vehicleImage}
          />
        </View>

        <View style={styles.headSection}>
          <View style={styles.topTextArea}>
            <Text style={styles.makemodelText}>
              {vehicle.make} {vehicle.model}
            </Text>
            <Text style={styles.price}>
              <Text style={styles.amount}>${vehicle.price_per_day}</Text> /day
            </Text>
          </View>
          <Text style={styles.typetranText}>
            {vehicle.type}-{vehicle.transmission}
          </Text>
        </View>

        <Text style={styles.descriptionText}>{vehicle.description}</Text>
        <Text style={styles.propertiesText}>Properties</Text>

        <View style={styles.propertiesArea}>
          <View style={styles.level}>
            <Text style={styles.propertyText}>
              Motor power:
              <Text style={styles.valueText}>
                {" "}
                {vehicle.properties.motor_power_hp} hp
              </Text>
            </Text>
            <Text style={styles.propertyText}>
              Engine capacity:
              <Text style={styles.valueText}>
                {" "}
                {vehicle.properties.engine_capacity_cc} cc
              </Text>
            </Text>
          </View>
          <View style={styles.level}>
            <Text style={styles.propertyText}>
              Fuel:
              <Text style={styles.valueText}>
                {" "}
                {vehicle.properties.fuel_type}
              </Text>
            </Text>

            <Text style={styles.propertyText}>
              Traction:
              <Text style={styles.valueText}>
                {" "}
                {vehicle.properties.traction}
              </Text>
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.rentButton} onPress={reserveListing}>
          <Text style={styles.rentButtonText}>Rent a Car</Text>
  </TouchableOpacity>
       {/* <TouchableOpacity style={styles.rentButton}>
          <Text style={styles.rentButtonText}>Rent a Car</Text>
        </TouchableOpacity>*/}
      </View>
    </SafeAreaView>
  );
};

export default CarInfo;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingRight: 35,
    paddingLeft: 35,
  },
  headerSection: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuIconStyle: {
    width: 25,
  },
  HeaderText: {
    fontSize: 20,
    marginLeft: 5,
    fontWeight: "500",
  },
  faceIconStyle: {
    width: 30,
  },

  imageSection: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  vehicleImage: {
    width: 300,
    height: 300,
  },

  headSection: {},
  topTextArea: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  makemodelText: {
    fontSize: 20,
    fontWeight: "500",
  },
  price: {
    fontWeight: "400",
  },
  amount: {
    fontWeight: "bold",
  },
  typetranText: {
    marginTop: 1,
    color: "#696969",
    fontWeight: "600",
    fontSize: 12,
  },
  descriptionText: {
    marginTop: 30,
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 18,
    color: "#696969",
    fontWeight: "500",
  },
  propertiesText: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "500",
  },
  propertiesArea: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  level: {
    marginRight: 30,
  },
  propertyText: {
    fontSize: 12,
    color: "#696969",
  },
  valueText: {
    fontSize: 12,
    color: "black",
  },
  rentButton: {
    marginTop: 50,
    height: 40,
    // padding: 10,
    alignSelf: "center",
    width: 250,
    backgroundColor: "#453F3C",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  rentButtonText: {
    color: "white",
    fontWeight: "500",
  },
});
