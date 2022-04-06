// import React from "react";
// import {
//   View,
//   Text,
//   TouchableWithoutFeedback,
//   StatusBar,
//   Platform,
//   BackHandler,
//   Dimensions,
// } from "react-native";
// import Video from "react-native-video";
// import Orientation from "react-native-orientation-locker";
// import Controls from "./control";
// import PlayPause from "./playPause";

// class VideoPlayer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pause: true,
//       showControl: true,
//       uri: props.Url,
//       videoWidth: props.VideoWidth,
//       videoHeight: props.VideoHeight,
//       thumbnail: props.Thumbnail,
//       showPoster: true,
//       muteVolumn: false,
//       fullscreenVideo: false,
//       startTime: 0,
//       endTime: 0,
//       value: 2,
//       currentValue: 0,
//       showLoader: false,
//       backWardLoader: false,
//       forwardLoader: false,
//       showFullScreenOption: props.showFullScreenOption,
//       showControls: props.showControls,
//       resizeMode: props.resizeMode === undefined ? "contain" : props.resizeMode,
//       hideVolumn: props.hideVolumn === undefined ? false : props.hideVolumn,
//       videoForward: false,
//       videoBackward: false,
//       check: false,
//       showForwardButton:
//         props.showForwardButton === undefined ? true : props.showForwardButton,
//       showBackwardButton:
//         props.showBackwardButton === undefined
//           ? true
//           : props.showBackwardButton,
//       posterResizeMode:
//         props.posterResizeMode === undefined ? "cover" : props.posterResizeMode,
//     };
//   }

//   componentDidMount() {
//     BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
//   }
//   componentWillUnmount() {
//     BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
//   }

//   onBackPress = () => {
//     let width = Dimensions.get("window").width;
//     let height = Dimensions.get("window").height;
//     if (width > height) {
//       this.setState({ fullscreenVideo: false });
//       Orientation.unlockAllOrientations();
//       Orientation.getOrientation((err, orientation) => {
//         if (orientation == "LANDSCAPE") {
//           Orientation.lockToPortrait();
//         } else if (orientation === undefined) {
//           Orientation.lockToPortrait();
//           StatusBar.setHidden(false);
//           StatusBar.setBarStyle("dark-content", true);
//         } else {
//           Orientation.lockToLandscape();
//           StatusBar.setHidden(true);
//         }
//       });
//       return true;
//     }
//   };

//   millisToMinutesAndSeconds = (secs) => {
//     var hours = Math.floor(secs / (60 * 60));
//     var divisor_for_minutes = secs % (60 * 60);
//     var minutes = Math.floor(divisor_for_minutes / 60);
//     var divisor_for_seconds = divisor_for_minutes % 60;
//     var seconds = Math.ceil(divisor_for_seconds);
//     if (hours > 0) {
//       return hours + ":" + minutes + ":" + seconds;
//     } else {
//       return minutes + ":" + seconds;
//     }
//   };

//   handleFullScreen = () => {
//     this.video.presentFullscreenPlayer();
//     const { fullscreenVideo } = this.state;
//     if (fullscreenVideo) {
//       Orientation.unlockAllOrientations();
//       Orientation.getOrientation((err, orientation) => {
//         if (orientation == "LANDSCAPE") {
//           Orientation.lockToPortrait();
//         } else {
//           Orientation.lockToLandscape();
//           StatusBar.setHidden(true);
//         }
//       });
//     } else {
//       Orientation.unlockAllOrientations();
//       Orientation.getOrientation((err, orientation) => {
//         if (orientation == "LANDSCAPE") {
//           Orientation.lockToPortrait();
//         } else if (orientation === undefined) {
//           Orientation.lockToPortrait();
//           StatusBar.setHidden(false);
//           StatusBar.setBarStyle("dark-content", true);
//         } else {
//           Orientation.lockToLandscape();
//           StatusBar.setHidden(true);
//         }
//       });
//     }
//   };

//   showPlay = () => {
//     this.setState({ showControl: true }, () => {
//       let check = setInterval(() => {
//         this.setState({ showControl: false });
//         clearInterval(check);
//       }, 10000);
//     });
//   };

//   render() {
//     const {
//       pause,
//       videoWidth,
//       videoHeight,
//       thumbnail,
//       muteVolumn,
//       fullscreenVideo,
//       showControls,
//       resizeMode,
//       posterResizeMode,
//     } = this.state;

//     return (
//       <View
//         style={{
//           width:
//             Platform.OS === "android"
//               ? fullscreenVideo
//                 ? "100%"
//                 : parseInt(videoWidth)
//               : parseInt(videoWidth),
//           height:
//             Platform.OS === "android"
//               ? fullscreenVideo
//                 ? "100%"
//                 : parseInt(videoHeight)
//               : parseInt(videoHeight),
//           backgroundColor: "#000",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {this.state.showPoster === false && (
//           <Video
//             ref={(ref) => {
//               this.video = ref;
//             }}
//             resizeMode={resizeMode}
//             fullscreen={fullscreenVideo}
//             muted={muteVolumn}
//             source={{ uri: this.state.uri }}
//             style={{
//               width:
//                 Platform.OS === "android"
//                   ? fullscreenVideo
//                     ? "100%"
//                     : parseInt(videoWidth)
//                   : parseInt(videoWidth),
//               height:
//                 Platform.OS === "android"
//                   ? fullscreenVideo
//                     ? "100%"
//                     : parseInt(videoHeight)
//                   : parseInt(videoHeight),
//             }}
//             controls={false}
//             playWhenInactive={false}
//             paused={this.state.pause}
//             poster={thumbnail}
//             posterResizeMode={posterResizeMode}
//             playInBackground={false}
//             onLoad={(data) => {
//               this.setState({ endTime: parseInt(data.duration) });
//               let check = setInterval(() => {
//                 this.setState({ showControl: false });
//                 this.setState({ showLoader: false });
//                 clearInterval(check);
//               }, 8000);
//             }}
//             onProgress={(data) => {
//               this.setState({ currentValue: data.currentTime });
//             }}
//             onBuffer={(isbuffer) => {
//               if (isbuffer.isBuffering) {
//                 this.setState({ showLoader: true });
//               } else {
//                 this.setState({
//                   showLoader: false,
//                   forwardLoader: false,
//                   backWardLoader: false,
//                 });
//               }
//             }}
//             onLoadStart={() => {
//               this.setState({ showLoader: true });
//             }}
//             onReadyForDisplay={() => {
//               this.setState({ showLoader: false });
//             }}
//           />
//         )}
//         <PlayPause Props={this} />
//         {showControls && <Controls Props={this} />}
//       </View>
//     );
//   }
// }

// export default VideoPlayer;

import React from "react";
import {
  View,
  Platform,
  StatusBar,
  BackHandler,
  Dimensions,
} from "react-native";
import { useState } from "react";
import Video from "react-native-video";
import PlayPause from "./playpauseTwo";
import ProgressBar from "./controlTwo";
import Orientation from "react-native-orientation-locker";

export interface props {
  videoResizeMode?: "stretch" | "contain" | "cover" | "none" | undefined; // via Image#resizeMode
  videoPause?: boolean | undefined;
  videoControl?: boolean | undefined;
  videoUrl?: string | undefined;
  videoWidth?: number;
  videoHeight?: number;
  thumbnailImage?: string;
  posterResizeMode?: "stretch" | "contain" | "cover" | "none" | undefined; // via Image#resizeMode
  showVideoBackwardButton?: boolean;
  showVideoForwardButton?: boolean;
  fullScreenOption?: boolean;
  hideVolumn?: boolean;
}

var time: any = null;

const App = (props: props) => {
  const {
    videoPause,
    videoControl,
    videoResizeMode,
    videoUrl,
    videoWidth,
    videoHeight,
    posterResizeMode,
    thumbnailImage,
    showVideoBackwardButton,
    showVideoForwardButton,
    fullScreenOption,
    hideVolumn,
  } = props;

  const player = React.useRef();

  const [pause, setpause] = React.useState(true);
  const [showContarol, setShowControl] = useState(videoControl);
  const [resizeMode, setResizeMode] = useState(videoResizeMode);
  const [url, setUrl] = useState(videoUrl);
  const [width, setWidth] = useState(videoWidth);
  const [height, setHeight] = useState(videoHeight);
  const [mute, setMute] = useState(false);
  const [poster, setPoster] = useState(thumbnailImage);
  const [posterResize, setPosterResize] = useState(posterResizeMode);
  const [showPoster, setShowPoster] = useState<boolean>(true);
  const [loader, setLoader] = useState<boolean>(false);
  const [control, setControl] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  React.useEffect(() => {
    const handleValidateClose = () => {
      if (Dimensions.get("screen").width > Dimensions.get("screen").height) {
        setFullScreen(false);
        Orientation.lockToPortrait();
        return true;
      } else {
        return false;
      }
    };

    const handler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleValidateClose
    );

    return () => handler.remove();
  }, []);

  const play = () => {
    setpause(!pause);
    setShowPoster(false);
  };

  const handleFullScreen = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
      setFullScreen(false);
    } else {
      Orientation.lockToLandscape();
      setFullScreen(true);
    }
  };

  return (
    <View
      style={{
        width:
          Platform.OS === "android" ? (fullScreen ? "100%" : width) : width,
        height:
          Platform.OS === "android" ? (fullScreen ? "100%" : height) : height,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!showPoster && (
        <Video
          ref={(ref) => (player.current = ref)}
          source={{ uri: url }}
          style={{
            width:
              Platform.OS === "android" ? (fullScreen ? "100%" : width) : width,
            height:
              Platform.OS === "android"
                ? fullScreen
                  ? "100%"
                  : height
                : height,
          }}
          controls={false}
          poster={poster}
          posterResizeMode={posterResize}
          resizeMode={resizeMode}
          onVideoLoadStart={() => setLoader(true)}
          onReadyForDisplay={() => setLoader(false)}
          onLoadStart={() => setLoader(true)}
          paused={pause}
          onLoad={(data) => setEndTime(data.duration)}
          onProgress={(data) => setCurrentValue(data.currentTime)}
          muted={mute}
          fullscreen={fullScreen}
          onFullscreenPlayerDidDismiss={() => setFullScreen(false)}
        />
      )}

      <PlayPause
        showPoster={showPoster}
        thumbnail={poster}
        onPlay={() => play()}
        showBackwardButton={showVideoBackwardButton}
        showForwardButton={showVideoForwardButton}
        showLoader={loader}
        onShowControlIn={() => {
          if (time != null) {
            setControl(true);
            clearInterval(time);
          } else {
            setControl(true);
          }
        }}
        onShowControlOut={() => {
          time = setInterval(() => {
            setControl(false);
            clearInterval(time);
          }, 8000);
        }}
        showControl={control}
        pause={pause}
        clickFarward={() => {
          if (endTime > currentValue + 5) {
            player.current.seek(currentValue + 10, 50);
          }
        }}
        clickBackward={() => {
          if (currentValue > 5) {
            player.current.seek(currentValue - 10, 50);
          }
        }}
      />
      {control && (
        <ProgressBar
          showControl={control}
          endTime={endTime}
          showFullScreenOption={fullScreenOption}
          currentValue={currentValue}
          onVolumn={() => setMute(!mute)}
          muteVolumn={mute}
          hideVolumn={hideVolumn}
          onValueChange={(data) => {
            setCurrentValue(data);
            player.current.seek(data, 50);
          }}
          onFullScreen={() => {
            if (Platform.OS === "ios") {
              setFullScreen(!fullScreen);
            } else {
              handleFullScreen();
            }
          }}
        />
      )}
    </View>
  );
};

export default App;
