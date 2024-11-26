import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const FilmCard = styled.View`
    width: 80%;
    margin-bottom: 20px;
    background-color: #333;
    border-radius: 10px;
    padding: 10px;
    align-items: center;
`;

export const FilmTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
    text-align: center;
`;

export const FilmBanner = styled.Image`
    width: 100%;
    aspect-ratio: 1;
    border-radius: 10px;
    margin-bottom: 10px;
`;

export const FilmRating = styled.Text`
    font-size: 14px;
    color: #fff;
`;

export const RateButton = styled.Pressable`
    background-color: #007bff;
    padding: 10px 20px;
    border-radius: 5px;
`;

export const RateButtonLabel = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
`;
