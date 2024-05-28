import React, { useState } from 'react'
import Webcam from "react-webcam";

export const useCamera = () => {
  const [imageUrls, setImageUrls] = useState<Array<string>>([])
  const webcamRef = React.useRef<Webcam>(null);

  const capture = () => {
    const current = webcamRef.current;
    if (!current) {
      return;
    }
    const url = current.getScreenshot();
    if (!url) {
      return;
    }
    setImageUrls([...imageUrls, url])
  }

  const stopCamera = () => {
    const current = webcamRef.current;
    if (!current || !current.video) {
      return;
    }
    const stream = current.video.srcObject as MediaStream | null
    if (!stream) {
      return;
    }
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    current.video.srcObject = null;
  };

  return { webcamRef, capture, stopCamera, imageUrls }
}

