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

const Control = ({ Props }) => {
  const {
    showControl,
    muteVolumn,
    currentValue,
    fullscreenVideo,
    showFullScreenOption,
    endTime,
    hideVolumn,
    showLoader,
  } = Props.state;

  return (
    <>
      {showControl && (
        <View style={styles.main}>
          {!hideVolumn && (
            <TouchableOpacity
              style={styles.volumn_Con}
              onPress={() =>
                Props.setState({ muteVolumn: !Props.state.muteVolumn })
              }
            >
              <Ionicons
                name={muteVolumn ? "md-volume-mute" : "md-volume-high"}
                color={"#FFF"}
                size={20}
              />
            </TouchableOpacity>
          )}

          <View style={styles.slider_Parent}>
            <Text style={styles.current_Label}>
              {Props.millisToMinutesAndSeconds(currentValue)}
            </Text>
            <Slider
              style={{ width: "70%", height: 30 }}
              minimumValue={0}
              maximumValue={endTime}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={(data) => {
                Props.setState({ currentValue: data });
                Props.video.seek(data, 50);
                // Props.setState({ showLoader: true });
              }}
              value={currentValue}
              step={1}
            />
            <Text style={styles.end_Label}>
              {Props.millisToMinutesAndSeconds(endTime)}
            </Text>
          </View>

          {showFullScreenOption && (
            <TouchableOpacity
              style={styles.full_Con}
              onPress={() => {
                if (Platform.OS === "ios") {
                  if (fullscreenVideo) {
                    Props.setState({ fullscreenVideo: false }, () => {
                      Props.setState({ fullscreenVideo: true });
                    });
                  } else {
                    Props.setState({ fullscreenVideo: true });
                  }
                } else {
                  Props.setState({ fullscreenVideo: !fullscreenVideo }, () => {
                    Props.handleFullScreen();
                  });
                }
              }}
            >
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
export default Control;
