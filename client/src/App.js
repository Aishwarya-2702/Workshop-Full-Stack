import { BrowserRouter, Route, Routes } from "react-router-dom";
import Workshop from "./Workshop";
import React from "react";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Workshop/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
