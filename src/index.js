import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import { createRoot } from "react-dom/client";

import FileUpload from "./App";
const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(<Router />);
// root.render(<FileUpload />);
