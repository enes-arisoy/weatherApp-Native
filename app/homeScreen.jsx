import Entypo from "@expo/vector-icons/Entypo";

import Feather from "@expo/vector-icons/Feather";

import { StatusBar } from "expo-status-bar";
import { debounce } from "lodash";
import { useMemo, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getForecastData, getLocationData } from "../api/weather";
import Card from "../components/card";

export default function App() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});

  const handleLocation = (loc) => {
    setLocations([loc]);
    toggleSearch(false);

    getForecastData({ city: loc.name, day: 7 })
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  };

  const handleSearch = (value) => {
    // fetch location data from api
    if (value.length > 3) {
      // call api and set locations
      getLocationData({ city: value }).then((data) => {
        setLocations(data);
      });
    }
  };
  const handleTextDebounce = useMemo(() => debounce(handleSearch, 500), []);

  const { current, location, forecast } = weather;
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />

      <Image
        source={require("../assets/images/2151835809.jpg")}
        className="absolute w-full h-full"
      />
      <View className="absolute w-full h-full bg-black/40" />

      <SafeAreaView className="flex flex-1">
        <View style={{ height: "10%" }} className="mx-4 my-4 relative z-50">
          {/* Search Section */}
          <View
            className={`flex-row items-center justify-end  ${showSearch ? "bg-[#464646d7] rounded-full" : "transparent"}`}
          >
            {showSearch ? (
              <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Search..."
                placeholderTextColor={"white"}
                className="flex-1 text-white pl-6 py-5 text-base"
              />
            ) : null}
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              className="bg-[#8686e8] p-4 mr-1 flex rounded-full"
            >
              <Feather name="search" size={22} color="white" />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <View className="absolute top-16 left-0 right-0 bg-[#5d5d5d95] rounded-3xl p-2 mx-1 z-50">
              {locations.map((loc, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className="flex-row items-center p-3 px-3 rounded-2xl mb-2"
                  >
                    <Entypo
                      name="location"
                      size={26}
                      color="white"
                      style={{ marginRight: 4 }}
                    />
                    <Text className="text-white text-md">
                      {loc?.name}, {loc?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        {/* Forecast Section */}
        {current && location ? (
          <View className="flex flex-1 justify-evenly items-center my-3">
            <Text className="text-white text-3xl font-bold">
              {location?.name},
              <Text className="text-gray-300 text-xl font-semibold">
                {" " + location?.country}
              </Text>
            </Text>

            {/* weather image */}
            <View className="flex-row justify-center">
              <Image
                source={
                  current ? { uri: `https:${current.condition.icon}` } : null
                }
                className="w-44 h-44"
              />
            </View>
            <View className=" items-center">
              <Text className="text-white text-5xl font-semibold tracking-widest">
                {current?.temp_c}&#176;
              </Text>
              <Text className="text-gray-400 text-2xl text-center tracking-widest">
                {current?.condition.text}
              </Text>
            </View>
            {/* Details Section */}

            <View className="flex-row justify-evenly gap-4">
              <View className="flex-row space-x-2 items-center">
                <Feather name="wind" size={30} color="#D1D5DB" />
                <Text className="text-blue-100/70 font-semibold text-md ml-2">
                  {current?.wind_kph} km/h
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Entypo name="drop" size={30} color="#D1D5DB" />
                <Text className="text-blue-100/70 font-semibold text-md ml-2">
                  {current?.humidity}%
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Feather name="sun" size={30} color="#D1D5DB" />
                <Text className="text-blue-100/70 font-semibold text-md ml-2">
                  {forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-300 text-xl text-center mx-4">
              Please search for a location to display the weather forecast.
            </Text>
          </View>
        )}

        {/* Forecast Section */}
        {forecast && (
          <View className="space-y-3 mb-2">
            <Card weather={forecast} />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
