import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App/App'
import Login from './Login/Login'
import Register from './Register/Register'
import Dashboard from './Dashboard/Dashboard'
import PrivateRoute from './_components/PrivateRoute/PrivateRoute'
import { Provider } from 'react-redux'
import { store } from './_store/store'
import { createURL, fetchWrapper } from './_helpers/fetch-wrapper'

const router = createBrowserRouter([
  {
    element: <App />,
    children:
      [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ]
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: async () => {
          return fetchWrapper.get(createURL('products'))
        }
      }
    ]
  },
])

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)