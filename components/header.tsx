import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  onBackPress?: () => void;
  onSettingsPress?: () => void;
  backIconColor?: string;
  settingsIconColor?: string;
}

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  position: fixed;
  top: 0;
`;

const SettingsIcon = styled.Pressable`
`;

const BackIcon = styled.Pressable`
`;

const Header: React.FC<HeaderProps> = ({
  onBackPress,
  onSettingsPress,
  backIconColor = "#fff",
  settingsIconColor = "#fff",
}) => {
  return (
    <HeaderContainer>
      <BackIcon onPress={onBackPress}>
        <Ionicons name="arrow-back" size={28} color={backIconColor} />
      </BackIcon>

      {onSettingsPress && (
        <SettingsIcon onPress={onSettingsPress}>
          <Ionicons name="ellipsis-vertical" size={28} color={settingsIconColor} />
        </SettingsIcon>
      )}
    </HeaderContainer>
  );
};

export default Header;
