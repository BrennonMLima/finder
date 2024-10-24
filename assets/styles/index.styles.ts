import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";

export const Banner = styled.Image`
  width: 100%;
  height: 90%;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  position: relative;
`;

export const ImageRating = styled.View`
  width: 100%;
  height: 70%;
  position: relative;
`;

export const TitleContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
`;

export const MovieTitle = styled.Text`
  font-size: ${RFValue(22)}px;
  color: #ddd;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

export const DescriptionWrapper = styled.View`
  background-color: #333;
  padding: 10px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 100%;
`;

export const Description = styled.Text`
  font-size: ${RFValue(16)}px;
  color: #ddd;
  text-align: center;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 60%;
  margin-top: 30px;
`;
