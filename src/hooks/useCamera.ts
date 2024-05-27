import React, { useState } from 'react'
import Webcam from "react-webcam";
import { v4 as uuidv4 } from 'uuid';

type Image = {
  key: string
  url: string
}

export const useCamera = () => {
  const [imageUrls, setImageUrls] = useState<Array<Image>>([])
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
    setImageUrls([...imageUrls, {key: uuidv4(), url}])
  }
  return { webcamRef, capture, imageUrls }
}

