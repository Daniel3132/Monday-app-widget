import React from 'react';
import "./trafficLight.css";

const TrafficLight = ({ status }) => {
  const lightColors = [
    { color: 'green', threshold: 66.66 },
    { color: 'amber', threshold: 33.33 },
    { color: 'red', threshold: 0 },
  ];

  const getActiveLight = () => {
    return lightColors.find(light => status > light.threshold)?.color || 'red';
  };

  return (
    <div className='traffic_light'>
      {lightColors.map(light => (
        <section
          key={light.color}
          className={`light ${light.color} ${getActiveLight() === light.color ? 'active' : 'inactive'}`}
        ></section>
      ))}
    </div>
  );
};

export default TrafficLight;
