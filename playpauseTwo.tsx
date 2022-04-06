import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

export interface props {
  showPoster?: boolean;
  thumbnail?: string | undefined;
  pause?: boolean;
  showLoader?: boolean;
  showControl?: boolean | undefined;
  currentValue?: number;
  endTime?: number;
  showForwardButton?: boolean | undefined;
  showBackwardButton?: boolean | undefined;
  posterResizeMode?: "stretch" | "contain" | "cover" | "none" | undefined; // via Image#resizeMode
  onPlay?: () => void;
  onShowControlIn?: () => void;
  onShowControlOut?: () => void;

  clickFarward?: () => void;
  clickBackward?: () => void;
}

var time: any = null;

const playPauseTwo = (Props: props) => {
  const {
    showPoster,
    thumbnail,
    pause,
    showLoader,
    currentValue,
    endTime,
    showForwardButton,
    showBackwardButton,
    onPlay,
    onShowControlIn,
    onShowControlOut,
    showControl,
    clickFarward,
    clickBackward,
  } = Props;
  const [videoBackward, setVideoBackward] = React.useState<boolean>(false);
  const [videoForward, setVideoForward] = React.useState<boolean>(false);
  return (
    <>
      {showPoster ? (
        <ImageBackground
          style={{
            width: "100%",
            height: "100%",
            zIndex: 999,
            justifyContent: "center",
            alignItems: "center",
          }}
          resizeMode={"cover"}
          source={{ uri: thumbnail }}
        >
          <TouchableOpacity onPress={onPlay}>
            <AntDesign name={"play"} size={60} color={"#FFF"} />
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <View
          style={{
            width: "100%",
            height: "80%",
            zIndex: 9999,
            position: "absolute",
            top: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "row",
            }}
          >
            {showBackwardButton ? (
              <Pressable
                style={{
                  width: "32%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPressIn={() => setVideoBackward(true)}
                onPressOut={() => setVideoBackward(false)}
                onPress={clickBackward}
              >
                {videoBackward && (
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(52, 52, 52, 0.5)",
                    }}
                  >
                    <AntDesign name={"banckward"} color={"#FFF"} size={30} />
                    <Text style={{ color: "#FFF", fontSize: 12 }}>10 Sec</Text>
                  </View>
                )}
              </Pressable>
            ) : (
              <View style={{ width: "32%" }} />
            )}
            {showLoader ? (
              <View
                style={{
                  width: "36%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator
                  size="large"
                  color="#FFF"
                  style={{ marginTop: 15 }}
                />
              </View>
            ) : (
              <Pressable
                style={{
                  width: "36%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPressIn={onShowControlIn}
                onPressOut={onShowControlOut}
              >
                {showControl && (
                  <TouchableOpacity onPress={onPlay}>
                    {!pause ? (
                      <Feather name={"pause-circle"} color={"#FFF"} size={60} />
                    ) : (
                      <AntDesign name={"play"} size={60} color={"#FFF"} />
                    )}
                  </TouchableOpacity>
                )}
              </Pressable>
            )}
            {showForwardButton ? (
              <Pressable
                style={{
                  width: "32%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPressIn={() => setVideoForward(true)}
                onPressOut={() => setVideoForward(false)}
                onPress={clickFarward}
              >
                {videoForward && (
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(52, 52, 52, 0.5)",
                      marginTop: 20,
                    }}
                  >
                    <AntDesign name={"forward"} color={"#FFF"} size={30} />
                    <Text style={{ color: "#FFF", fontSize: 12 }}>10 Sec</Text>
                  </View>
                )}
              </Pressable>
            ) : (
              <View style={{ width: "32%" }} />
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default playPauseTwo;
