import React, { useState } from 'react';
import sendUpdate from '../util/nats_util';

function ButtonGroup() {
  const subject = 'comm.gui.control';
  const token = process.env.REACT_APP_TOKEN;
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = async (variableName) => {

    const newActiveButton = variableName;
    if (newActiveButton !== activeButton) {
      setActiveButton(newActiveButton);

      const buttonState = {
        trig1: 0,
        trig1ResultAck: 0,
        trig1Reset: 0,
        trig1Debug: 0
      };
      buttonState[newActiveButton] = 1;

      await sendUpdate(subject, token, buttonState);
    }
  };

  return (
    <div>
      <h2>Command Center</h2>
      <button onClick={() => handleButtonClick('trig1')}>Trigger</button>
      <button onClick={() => handleButtonClick('trig1ResultAck')}>ResultAck</button>
      <button onClick={() => handleButtonClick('trig1Reset')}>Reset</button>
      <button onClick={() => handleButtonClick('trig1Debug')}>Debug</button>
    </div>
  );
};

export default ButtonGroup;
