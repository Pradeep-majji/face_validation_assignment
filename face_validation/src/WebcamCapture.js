import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import './App.css'

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [isDetected, setIsDetected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };
    loadModels();
  }, []);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const img = new Image();
    img.src = imageSrc;
    img.onload = async () => {
      const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
      if (detections) {
        setIsDetected(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setIsDetected(false);
        alert('Please ensure you are sitting properly in front of the webcam.');
      }
    };
  };  

  return (
    <div className="webcam-capture">
      <center>
      <h1>Facial Validation</h1>
      <p>Please ensure you're sitting properly in front of the webcam.</p>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
        videoConstraints={{ facingMode: 'user' }}
      />
      <br/>
      <button onClick={capture}>Capture</button>
      {isDetected ? (
        <p>Validation successful. Redirecting...</p>
      ) : null}
      </center>
    </div>
  );
}

export default WebcamCapture;
