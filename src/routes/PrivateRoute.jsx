import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../App';

const PrivateRoute = () => {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <>
    <h1 style={{paddingTop: "100px"}}>Prive Route Template</h1>
    {isAuthenticated ? <Outlet /> : <Navigate to="/"/>} 
    {/* If not authenticated, redirect to login page
    
      Else render children of the Private Route (based on url, eg:"/team" => <Team>) mentioned in App.jsx
    */}
    
    </>
  )
}

export default PrivateRoute