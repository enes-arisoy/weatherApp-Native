import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Image, ScrollView, Text, View } from "react-native";

const Card = ({ weather }) => {
  return (
    <View>
      <View className="flex-row items-center mx-5 mb-4 space-x-2">
        <EvilIcons name="calendar" size={32} color="lightgray" />
        <Text className="text-white text-xl font-semibold tracking-widest">
          Daily Forecast
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 14 }}
        className="mx-5"
      >
        {weather?.forecastday?.map((item, index) => (
          <View
            key={index}
            className="flex justify-center items-center w-24 rounded-3xl bg-gray-400/20 py-3"
          >
            <Image
              source={{
                uri: `https:${item.day.condition.icon}`,
              }}
              className="w-16 h-16"
            />
            <Text className="text-white text-lg">
              {new Date(item.date).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </Text>
            <Text className="text-blue-300 text-xl font-semibold">
              {item.day.avgtemp_c}&#176;
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Card;
