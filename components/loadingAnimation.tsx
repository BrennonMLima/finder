import styled from "styled-components/native";
import { Animated } from "react-native";
import React, { useEffect, useRef } from "react";

const SkeletonContainer = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const SkeletonCard = styled.View`
  width: 90%;
  height: 90%;
  border-radius: 20px;
  background-color: #333;
  overflow: hidden;
`;

const SkeletonBanner = styled(Animated.View)`
  width: 100%;
  height: 70%;
  background-color: #444;
`;

const SkeletonTitle = styled(Animated.View)`
  width: 60%;
  height: 20px;
  background-color: #555;
  border-radius: 5px;
  margin: 10px auto 5px auto;
`;

const SkeletonDescription = styled(Animated.View)`
  width: 80%;
  height: 60px;
  background-color: #555;
  border-radius: 5px;
  margin: 5px auto;
`;

const SkeletonLoader = () => {
    const pulseAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, [pulseAnim]);
  
    const backgroundColor = pulseAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["#444", "#555"],
    });
  
    return (
      <SkeletonContainer>
        <SkeletonCard>
          <SkeletonBanner style={{ backgroundColor }} />
          <SkeletonTitle style={{ backgroundColor }} />
          <SkeletonDescription style={{ backgroundColor }} />
        </SkeletonCard>
      </SkeletonContainer>
    );
  };
  
  export default SkeletonLoader;