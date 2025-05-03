import React from "react";
import IPAddress from "./IPAddress";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <div className="App container py-4">
      <h2 className="text-center mb-4">IP Address Tracker</h2>
      <IPAddress />
    </div>
  );
};

export default App;
