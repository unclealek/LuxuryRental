import React, { useState } from "react";
import { View, Linking, StyleSheet, Image, SafeAreaView, ScrollView, TextInput,  TouchableOpacity } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "../initSupabase";
import {
  Layout,
  Text,
  TopNav,
  useTheme,
  themeColor, 
} from "react-native-rapi-ui";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import data from "../dataset/vehicles.json";

const magnifying_glass = require("../assets/icons/magnifying-glass.png");
const image_v_1 = require("../assets/vehicles/v-1.png");
const image_v_2 = require("../assets/vehicles/v-2.png");
const image_v_3 = require("../assets/vehicles/v-3.png");
const image_v_4 = require("../assets/vehicles/v-4.png");
interface Props extends NativeStackScreenProps<MainStackParamList, "MainTabs"> {}

const Home: React.FC<Props> = ({ navigation }) => {
  const { setTheme, isDarkmode } = useTheme();
  const [vehicles, setVehicles] = useState(data.vehicles);
  const [filteredVehicles, setFilteredVehicles] = useState(data.vehicles);

  const searchVehicles = (keyword: string) => {
    const lowercasedKeyword = keyword.toLowerCase();
    const results = vehicles.filter(vehicle => vehicle.make.toLowerCase().includes(lowercasedKeyword));
    setFilteredVehicles(results);
  };

  const getImageById = (id: number): any => {
    
    const imageMap = {
      1: image_v_1,
      2: image_v_2,
      3: image_v_3,
      4: image_v_4,
    };
    return imageMap[id] || null; // Return image path or null if ID not found
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout>
      <TopNav
        leftContent={
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color="black"
            status="danger"
            text="Logout"
            onPress={async () => {
              const { error } = await supabase.auth.signOut();
              if (!error) {
                alert("Signed out!");
              } else {
                alert(error.message);
              }
            }}
            style={{
              marginTop: 10,
            }}
          />
        }
        middleContent="Home"
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          setTheme(isDarkmode ? "light" : "dark");
        }}
      />
  <View style={styles.container}>

      <View style={styles.titleSection}>
        <Text style={styles.title}>Rent a Car</Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchPallet}>
          <TextInput
              style={styles.searchInput}
              placeholder="Search a Car"
              onChangeText={(text) => searchVehicles(text)}
          />
          <TouchableOpacity style={styles.searchIconArea}>
            <Image
              source={magnifying_glass}
              resizeMode="contain"
              style={styles.magnifyingIconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.typesSection}>
        <Text style={styles.typesTextActive}>All</Text>
        <Text style={styles.typesText}>Suv</Text>
        <Text style={styles.typesText}>Sedan</Text>
        <Text style={styles.typesText}>Mpv</Text>
        <Text style={styles.typesText}>Hatchback</Text>
      </View>

      <View style={styles.listSection}>
        <Text style={styles.headText}>Most Rented</Text>

        <ScrollView style={styles.elementPallet}>
          {filteredVehicles.map((vehicle) => (
              <TouchableOpacity
                  style={styles.element}
                  key={vehicle.id}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('InfoScreen', { id: vehicle.id }) }
              >
                <View style={styles.infoArea}>
                  <Text style={styles.infoTitle}>{vehicle.make} {vehicle.model}</Text>
                  <Text style={styles.infoSub}>{vehicle.type}-{vehicle.transmission}</Text>
                  <Text style={styles.infoPrice}>
                    <Text style={styles.infoAmount}>${vehicle.price_per_day} </Text>/day
                  </Text>
                </View>
                <View style={styles.imageArea}>
                  <Image
                    source={getImageById(vehicle.id)}
                    resizeMode="contain"
                    style={styles.vehicleImage}
                  />
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      </View>
      </Layout>
    </SafeAreaView>
    );
  };
      
    


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e7e7e7",
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
    width: 30,
  },
  faceIconStyle: {
    width: 40,
  },

  titleSection: {
    marginTop: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
  },

  searchSection: {
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "center",
  },
  searchPallet: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    borderRadius: 8,
    width: "100%",
    height: 30,
    backgroundColor: "white",
  },
  searchInput: {
    width: 245,
    height: 30,

    backgroundColor: "white",
  },
  searchIconArea: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  magnifyingIconStyle: {
    width: 24,
    height: 24,
    marginRight: -10,
  },

  typesSection: {
    marginTop: 15,
    flexDirection: "row",
  },
  typesTextActive: {
    fontSize: 15,
    marginRight: 34,
    fontWeight: "bold",
    color: "black",
  },
  typesText: {
    fontSize: 15,
    marginRight: 33,
    fontWeight: "500",
    color: "#696969",
  },

  listSection: {
    marginTop: 25,
  },
  headText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  elementPallet: {
    marginLeft: -15,
    paddingLeft: 15,
    paddingRight: 15,
    width: "110%",
    height: 450,
  },
  element: {
    height: 100,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    marginBottom: 13,
  },
  infoArea: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  infoSub: {
    fontSize: 11,
    fontWeight: "600",
    color: "#696969",
  },
  infoPrice: {
    position: "absolute",
    bottom: 0,
    fontSize: 10,
    color: "#696969",
    fontWeight: "bold",
  },
  infoAmount: {
    fontSize: 12,
    color: "black",
    fontWeight: "600",
  },
  imageArea: {
    flex: 1,
  },
  vehicleImage: {
    position: "absolute",
    top: -15,
    left: -15,
    width: "140%",
    height: "140%",
  },
});


export default Home;