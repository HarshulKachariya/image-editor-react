import React, { useRef, useState } from "react";
import "./App.css";
import * as markerjs2 from "markerjs2";
import * as cropro from "cropro";
import { AiOutlineForm } from "react-icons/ai";
import { AiOutlineRadiusBottomleft } from "react-icons/ai";

const App = () => {
  const imgRef = useRef(null);

  const [editImage, setEditImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (imgRef.current) {
          imgRef.current.src = e.target.result;
        }
      };
      setEditImage(file);
      reader.readAsDataURL(file);
    }
  };

  const showMarkerArea = () => {
    if (imgRef.current !== null) {
      const markerArea = new markerjs2.MarkerArea(imgRef.current);
      markerArea.addEventListener("render", (event) => {
        if (imgRef.current) {
          imgRef.current.src = event.dataUrl;
        }
      });
      markerArea.show();
    }
  };

  const showCropArea = () => {
    if (imgRef.current !== null) {
      const cropArea = new cropro.CropArea(imgRef.current);
      cropArea.addRenderEventListener((dataUrl) => {
        if (imgRef.current) {
          imgRef.current.src = dataUrl;
        }
      });
      cropArea.show();
    }
  };

  return (
    <div className="App px-6 justify-center items-center flex flex-col gap-5 w-screen h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Image Annotation and Cropping Demo
      </h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      <div className="relative flex flex-col gap-1">
        <div className="mb-4 absolute right-0">
          <button
            onClick={showMarkerArea}
            className="mix-blend-multiply text-2xl font-bold "
          >
            <AiOutlineForm />
          </button>
          <button
            onClick={showCropArea}
            className="mix-blend-multiply text-2xl font-bold "
          >
            <AiOutlineRadiusBottomleft />
          </button>
        </div>
        <img
          ref={imgRef}
          src={editImage}
          alt="sample"
          className="w-96 h-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default App;
