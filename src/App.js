// // App.js
// import React, { useState } from 'react';
// import HealthQuerySection from './HealthQuerySection';
// import PharmacyLocatorSection from './PharmacyLocatorSection';

// function App() {
//   const [healthResult, setHealthResult] = useState(null);
//   const [pharmacyResult, setPharmacyResult] = useState(null);

//   return (
//     <div>
//       <header>
//         <h1>Health Assistant</h1>
//       </header>

//       <main>
//         <HealthQuerySection setHealthResult={setHealthResult} />
//         {healthResult && <div>{healthResult}</div>}

//         <PharmacyLocatorSection setPharmacyResult={setPharmacyResult} />
//         {pharmacyResult && <div>{pharmacyResult}</div>}
//       </main>
//     </div>
//   );
// }

// export default App;

// App.js
import React from 'react';
import ChatbotInterface from './ChatbotInterface';

const App = () => {
  return (
    <div>
      {/* <header>
        <h1>Simple Chatbot Interface</h1>
      </header> */}
      <main>
        <ChatbotInterface />
      </main>
    </div>
  );
};

export default App;
