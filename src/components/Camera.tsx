"use client"

import React, { useEffect } from 'react'
import Webcam from "react-webcam";
import { useCamera } from '@/hooks/useCamera';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const INTERVAL = 5000;

export const Camera = () => {
  const { webcamRef, capture, stopCamera, imageUrls } = useCamera()

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
      const shouldSendImage = !!imageUrls.length && imageUrls.length % 10 === 0
      if (shouldSendImage) {
        // 送信
      }
    }, INTERVAL)
    return () => {
      clearInterval(interval)
      stopCamera()
    }
  }, [])

  return (
    <div>
      <Webcam
        audio={false}
        screenshotFormat='image/jpeg'
        videoConstraints={videoConstraints}
        ref={webcamRef}
        className='absolute top-0 light-0 invisible'
      />
    </div>
  );
}

