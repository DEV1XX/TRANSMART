
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'


// createRoot(document.getElementById('root')).render(
//   <>
//     <App />
//   </>
// );

// console.log("main.jsx is running fine!, hopefully")

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";

// const root = createRoot(document.getElementById("root"));

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );



// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";

// console.log("main.jsx is running");

// const root = createRoot(document.getElementById("root"));

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );



import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

console.log("main.jsx is running");

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found!");
} else {
  console.log("Root element found:", rootElement);

  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}


