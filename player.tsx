import React, { FC } from "react";
import { View, Text } from "react-native";
import { useState } from "react";
import Video from "react-native-video";

export interface props {
  videoResizeMode?: "stretch" | "contain" | "cover" | "none" | undefined; // via Image#resizeMode
  videoPause?: boolean | undefined;
  videoControl?: boolean | undefined;
  videoUrl?: string | undefined;
  videoWidth?: number;
  videoHeight?: number;
  thumbnailImage?: string;
  muteVolumn?: boolean | undefined;
}

const Test = (props: props) => {
  const {
    videoPause,
    videoControl,
    videoResizeMode,
    videoUrl,
    videoWidth,
    videoHeight,
    muteVolumn,
  } = props;
  const [pause, setpause] = React.useState(videoPause);
  const [showContarol, setShowControl] = useState(videoControl);
  const [resizeMode, setResizeMode] = useState(videoResizeMode);
  const [url, setUrl] = useState(videoUrl);
  const [width, setWidth] = useState(videoWidth);
  const [height, setHeight] = useState(videoHeight);
  const [volumn, setVolumn] = useState(muteVolumn);

  return (
    <View>
      <Video
        source={{ uri: url }}
        style={{ width: width, height: height }}
        controls={false}
      />
    </View>
  );
};

export default Test;
