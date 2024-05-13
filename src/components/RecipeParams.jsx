import { useContext, useEffect, useState } from 'react';
import { SocketContext } from "../context/socket";
import sendUpdate from '../util/nats_util';

// Function to render boolean values as 'True' or 'False', and other values as strings
function renderValue(value) {
  if (typeof value === 'boolean') {
    return value ? 'True' : 'False';
  } else {
    return value.toString();
  }
}

export default function RecipeParams() {
  const subject = 'vision.gui.parameters';
  const token = process.env.REACT_APP_TOKEN;
  const [tableData, setTableData] = useState({});
  const socket = useContext(SocketContext);

  const handleCellEdit = (key, value) => {
    let updatedValue;

    // Check if value is a boolean (true or false)
    if (value === 'true' || value === 'false') {
      updatedValue = value === 'true';
      console.log('boolean guard triggered')
    } else {
      // Attempt to parse value as number (int or float)
      const numberValue = Number(value);
      if (!isNaN(numberValue)) {
        updatedValue = numberValue;
      } else {
        // Otherwise, treat value as string
        updatedValue = value;
      }
    }
    // Update the table data state
    const updatedData = { ...tableData, [key]: updatedValue };
    setTableData(updatedData);
  };

  const handleButtonClick = async () => {
    await sendUpdate(subject, token, tableData);
  }

  useEffect(() => {
    socket.on('recipe-params', (data) => {
      setTableData(data);
    });
    return () => {
      socket.off('recipe-params');
    };
  }, [socket]);

  return (
    <div>
      <h2>Recipe Params</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(tableData).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                <input
                  type={typeof value}
                  value={renderValue(value)}
                  onChange={(e) => handleCellEdit(key, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleButtonClick}>Submit Changes</button>
    </div>
  );
};