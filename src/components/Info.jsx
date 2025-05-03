import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Info.css"; 

const Info = ({ ipAddress, location, timezone, isp, latitude, longitude }) => {
  return (
    <div className="container py-4 stats-container">
      <div className="row mb-4 stats-row">
        <div className="col-md-4 stats-item">
          <strong>IP Address:</strong> <br /> {ipAddress}
        </div>
        <div className="col-md-4 stats-item">
          <strong>Location:</strong> <br /> {location}
        </div>
        <div className="col-md-4 stats-item">
          <strong>Timezone:</strong> <br /> {timezone}
        </div>
      </div>

      <div className="row mb-4 stats-row">
        <div className="col-md-4 stats-item">
          <strong>Latitude:</strong> <br /> {latitude}
        </div>
        <div className="col-md-4 stats-item">
          <strong>Longitude:</strong> <br /> {longitude}
        </div>
        <div className="col-md-4 stats-item">
          <strong>ISP:</strong> <br /> {isp}
        </div>
      </div>
    </div>
  );
};

export default Info;
