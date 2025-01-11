import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  
  const token = localStorage.getItem('Token') || null;
  useEffect(() => {
   
    if (token == null) {
      navigate("/login")
    } 
  }, [token,navigate]);



  
  if (token == null) {
    return null; // Không render gì
}
    

 return element
};

export default PrivateRoute;
