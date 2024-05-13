import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socket";

// Component for WebSocket communication
export default function DisplayImageCall() {
  // State to hold the current input message
  const [imageUrl, setImageUrl] = useState("");
  const socket = useContext(SocketContext);
  const logo = require('../images/RiVision Logo.png')

  const displayImage = (data) => {
    try {
      const blob = new Blob([data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
      localStorage.setItem("displayedImage", url); // Save image URL in localStorage
    } catch (error) {
      console.error("Error processing image data:", error);
      // Clear imageData if invalid image data received
      setImageUrl("");
    }
  };

  const onImageError = (e) => {
    e.target.src = logo
  }

  // Effect hook to handle WebSocket events
  useEffect(() => {
    // Check localStorage for previously displayed image URL on component mount
    const savedImageUrl = localStorage.getItem("displayedImage");
    if (savedImageUrl) {
      setImageUrl(savedImageUrl);
    }

    // Listening for 'display' event from the WebSocket server
    socket.on("display", displayImage);
    // Cleaning up event listener when component unmounts
    return () => {
      // Removing the 'data' event listener
      socket.off("display", () => {
        console.log("display event was removed");
      });

    };
  // Dependency array including socket and messages to ensure proper cleanup
  }, [socket]);

  // Rendering the component JSX
  return (
    <div>
      <h2>Display Image</h2>
      <img src={imageUrl ? imageUrl : logo} alt="Received" style={{ maxWidth: '100%' }} onError={onImageError} />
    </div>
  );
};