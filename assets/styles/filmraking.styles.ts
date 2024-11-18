import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 20px;
    text-Align: center;
`;

export const FilmCard = styled.View`
    flex-direction: row;
    align-items: center;
    borderWidth: 1px;
    borderRadius: 20px;
    border-color: #fff;
    padding: 10px;
    width: 100%;
    margin-top: 20px;
`;

export const FilmTitle = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    margin-left: 10px;
`;

export const FilmInfo = styled.View`
    flex-direction: column;
    margin-left: 10px;
    flex: 1;
`

export const Votes = styled.Text`
    color: #fff;
    font-size: 15px;
    margin-left:10px;
`;

export const ImageFilm = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 10px;
`