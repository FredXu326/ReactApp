import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socket";

// Function to render boolean values as 'True' or 'False', and other values as strings
function renderValue(value) {
  if (typeof value === 'boolean') {
    return value ? 'True' : 'False';
  } else {
    return value.toString();
  }
}

// Component for making HTTP calls and displaying the response data
export default function HttpCall({ dict }) {
  // State to hold the response data from the HTTP call
  const socket = useContext(SocketContext);
  const [data, setData] = useState("");

  // Effect hook to execute the HTTP call when the component mounts
  useEffect(() => {
    // Fetching data from the server
    socket.on(dict, (data) => {
      // Updating the state with the response data
      setData(data);
      console.log(dict + " updated");
    });
    // Cleaning up event listener when component unmounts
    return () => {
      // Removing the 'data' event listener
      socket.off(dict, () => {
        console.log(dict + " event was removed");
      });
    };
  // Dependency array including socket and messages to ensure proper cleanup
  }, [dict, socket]);

  // Rendering the component JSX
  return (
    <>
      <h2>{dict}</h2>
      {data ? (
        // Render key-value pairs if 'data' is not an empty string
        Object.entries(data).map(([key, value]) => (
          <h3 key={key}>
            <strong>{key}: </strong>
            {renderValue(value)}
          </h3>
        ))
      ) : (
        // Display a message if 'data' is an empty string
        <p>No data available for {dict}</p>
      )}
    </>
  );
};
