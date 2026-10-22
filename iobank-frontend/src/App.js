import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Redirect from "./pages/Redirect"; 
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import RegistrationSuccessful from "./pages/RegistrationSuccessful";
import {Provider} from "react-redux";
import { store } from "./app/store";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {

  const routes = createBrowserRouter([
    {
      path: "/",
      element:<Redirect />,
    },
    {
      path: "/login",
      element:<Login />,
    },
    {
      path: "/dashboard/*",
      element:<ProtectedRoute><Dashboard /></ProtectedRoute>,
    },
    {
      path: "/register",
      element:<Register />,
    },
    {
      path: "/successful",
      element:<RegistrationSuccessful />,
    },
 ])
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  )
}

export default App;