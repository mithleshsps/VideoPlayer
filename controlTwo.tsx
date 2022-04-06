import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import Slider from "@react-native-community/slider";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export interface props {
  showControl?: boolean;
  muteVolumn?: boolean;
  currentValue: number;
  endTime: number;
  fullscreenVideo?: boolean;
  showFullScreenOption?: boolean;
  hideVolumn?: boolean;
  onVolumn?: () => void;
  onValueChange?: (value: number) => void;
  onFullScreen?: () => void;
}

const ControlTwo = (Props: props) => {
  const {
    showControl,
    muteVolumn,
    currentValue,
    fullscreenVideo,
    showFullScreenOption,
    endTime,
    hideVolumn,
    onVolumn,
    onValueChange,
    onFullScreen,
  } = Props;

  const millisToMinutesAndSeconds = (secs: number) => {
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    if (hours > 0) {
      return hours + ":" + minutes + ":" + seconds;
    } else {
      return minutes + ":" + seconds;
    }
  };

  return (
    <>
      {showControl && (
        <View style={styles.main}>
          {!hideVolumn && (
            <TouchableOpacity style={styles.volumn_Con} onPress={onVolumn}>
              <Ionicons
                name={muteVolumn ? "md-volume-mute" : "md-volume-high"}
                color={"#FFF"}
                size={20}
              />
            </TouchableOpacity>
          )}

          <View style={styles.slider_Parent}>
            <Text style={styles.current_Label}>
              {millisToMinutesAndSeconds(currentValue)}
            </Text>
            <Slider
              style={{ width: "70%", height: 30 }}
              minimumValue={0}
              maximumValue={endTime}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={onValueChange}
              value={currentValue}
              step={1}
            />
            <Text style={styles.end_Label}>
              {millisToMinutesAndSeconds(endTime)}
            </Text>
          </View>

          {showFullScreenOption && (
            <TouchableOpacity style={styles.full_Con} onPress={onFullScreen}>
              <MaterialCommunityIcons
                name={"fullscreen"}
                color={"#FFF"}
                size={20}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    height: 30,
  },
  volumn_Con: {
    padding: 2,
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  slider_Parent: {
    width: "80%",
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  current_Label: {
    width: "15%",
    color: "#FFF",
    alignSelf: "center",
    textAlign: "center",
  },
  end_Label: {
    width: "15%",
    color: "#FFF",
    alignSelf: "center",
    textAlign: "center",
  },
  full_Con: {
    padding: 2,
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
export default ControlTwo;
