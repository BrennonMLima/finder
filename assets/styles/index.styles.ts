import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";

export const Banner = styled.Image`
  width: 90%;
  height: 90%;
  border-radius: 10px;
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

export const RatingContainer = styled.View`
  display:flex;
  flex-direction:row;
  justify-content: flex-start;
  width: 70%;
  gap: 5px;
`;

export const ImageRating = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 50%;
`;
