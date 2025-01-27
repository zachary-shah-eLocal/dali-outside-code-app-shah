import { View } from "react-native";
import { LoadingSpinner } from "../../../components/atoms";
const ScreenLoader = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <LoadingSpinner />
    </View>
  );
};

export default ScreenLoader;
