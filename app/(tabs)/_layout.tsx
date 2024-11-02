import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  const colorScheme = "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        tabBarStyle: {
          backgroundColor: "#333",
          borderTopWidth: 0,
          height: 70,
          paddingVertical: 10,
          paddingBottom: 15,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
          padding: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Filmes",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconType="MaterialIcons"
              name={focused ? "movie" : "movie"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Grupo",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconType="Ionicons"
              name={focused ? "people-sharp" : "people-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconType="Ionicons"
              name={focused ? "person-sharp" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
