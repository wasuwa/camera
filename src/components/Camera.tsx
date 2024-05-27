"use client"

import React, { useEffect } from 'react'
import Image from 'next/image';
import Webcam from "react-webcam";
import { useCamera } from '@/hooks/useCamera';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const INTERVAL = 500;

export const Camera = () => {
  const { webcamRef, capture, imageUrls } = useCamera()

  useEffect(() => {
    const interval = setInterval(() => {
      capture()
    }, INTERVAL)
    return () => {
      clearInterval(interval)
    }
  })

  return (
    <div>
      <Webcam
        audio={false}
        screenshotFormat='image/jpeg'
        videoConstraints={videoConstraints}
        ref={webcamRef}
        className='opacity-0'
      />
      {imageUrls.map((imageUrl) => {
        return <Image key={imageUrl.key} src={imageUrl.url} width={100} height={100} alt="画像" />
      })}
    </div>
  );
}

