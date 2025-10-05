import React from "react";
import { View } from "react-native";
import Onboarding from "../screens/Onboarding";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
      }}
    >
      <Onboarding />
    </View>
  );
}
