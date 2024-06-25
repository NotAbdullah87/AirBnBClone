import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserDashboard from './userDashboard';
import Step1 from './components/airbnbYourHome/step1';
import MyListings from './components/myListings';
import ListingDetailPage from './components/ListingDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path : '/dashboard',
    element : <UserDashboard />
  },{
    path : '/list/step1',
    element : <Step1 />
  },
  {
    path : '/myListings',
    element : <MyListings />
  },
  {
    path : "/listing/:id" ,
    element : <ListingDetailPage /> 
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
