import React from "react";
import { Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface StarRatingProps {
  rating: number;
  onPress?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onPress }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <Pressable key={index} onPress={() => onPress && onPress(starValue)}>
            <MaterialIcons
              name={rating >= starValue ? "star" : "star-border"}
              size={24}
              color={rating >= starValue ? "#FFD700" : "#888"}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default StarRating;
