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
var time = null;
var loader = null;

const playPause = ({ Props }) => {
  const {
    showPoster,
    thumbnail,
    pause,
    showLoader,
    showControl,
    videoForward,
    videoBackward,
    currentValue,
    endTime,
    showForwardButton,
    showBackwardButton,
  } = Props.state;

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
          source={{ uri: thumbnail }}
        >
          <TouchableOpacity
            onPress={() => {
              Props.setState({ showLoader: true });
              Props.setState(
                { pause: !Props.state.pause, showPoster: false },
                () => {
                  let check = setInterval(() => {
                    Props.setState({ showControl: false });
                    clearInterval(check);
                  }, 8000);
                }
              );
            }}
          >
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
          {Props.video === undefined && pause === true ? (
            <TouchableOpacity
              onPress={() => {
                Props.setState({ pause: !Props.state.pause }, () => {
                  let check = setInterval(() => {
                    Props.setState({ showControl: false });
                    clearInterval(check);
                  }, 8000);
                });
              }}
            >
              <AntDesign name={"play"} size={60} color={"#FFF"} />
            </TouchableOpacity>
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
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
                    onPressIn={() =>
                      Props.setState({ videoBackward: true }, () => {
                        if (currentValue > 5) {
                          Props.video.seek(currentValue - 10, 50);
                        }
                      })
                    }
                    onPressOut={() => Props.setState({ videoBackward: false })}
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
                        <AntDesign
                          name={"banckward"}
                          color={"#FFF"}
                          size={30}
                        />
                        <Text style={{ color: "#FFF", fontSize: 12 }}>
                          10 Sec
                        </Text>
                      </View>
                    )}
                  </Pressable>
                ) : (
                  <View style={{ width: "32%" }} />
                )}
                {showLoader ? (
                  <ActivityIndicator
                    size="large"
                    color="#FFF"
                    style={{
                      width: "36%",
                      height: "100%",
                      alignSelf: "center",
                      marginTop: 25,
                    }}
                  />
                ) : (
                  <Pressable
                    style={{
                      width: "36%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPressIn={() => {
                      if (time != null) {
                        Props.setState({ showControl: true });
                        clearInterval(time);
                      } else {
                        Props.setState({ showControl: true });
                      }
                    }}
                    onPressOut={() => {
                      time = setInterval(() => {
                        Props.setState({ showControl: false });
                        clearInterval(time);
                      }, 8000);
                    }}
                  >
                    {showControl && (
                      <TouchableOpacity
                        onPress={() =>
                          Props.setState({ pause: !Props.state.pause })
                        }
                      >
                        {!Props.state.pause ? (
                          <Feather
                            name={"pause-circle"}
                            color={"#FFF"}
                            size={60}
                          />
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
                    onPressIn={() =>
                      Props.setState({ videoForward: true }, () => {
                        if (endTime > currentValue + 5) {
                          Props.video.seek(currentValue + 10, 50);
                        }
                      })
                    }
                    onPressOut={() => Props.setState({ videoForward: false })}
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
                        <Text style={{ color: "#FFF", fontSize: 12 }}>
                          10 Sec
                        </Text>
                      </View>
                    )}
                  </Pressable>
                ) : (
                  <View style={{ width: "32%" }} />
                )}
              </View>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default playPause;
