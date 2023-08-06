import { useState } from "react";
import {useCookies} from 'react-cookie';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState(null)
  const [cookies, setCookie] = useCookies(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)

  console.log("cookies", cookies)

  const viewLogin = (status) =>{
      setError(null)
      setIsLogin(status)
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    if(!isLogin && password !==  confirmPassword){
      setError("Passwords do not match!")
      return
    }

    try {
      const resp =  await fetch(`http://localhost:8000/${endpoint}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})
      }) 

      const data = await resp.json()
      
      if(data.detail){
        setError(data.detail)
      }else{
        setCookie('Email', data.email)
        setCookie('AuthToken', data.token)

        window.location.reload()
      }

      
    } 
    catch (err) {
      console.error(err)
    }
  }


    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h2>{isLogin ? "Please Login" : "Please Sign Up"}</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            {!isLogin && <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>}
            <input type="submit" onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')} className="create"/>
            {error && <p>{error}</p>}
          </form>

          <div className="auth-options">
            <button 
            onClick={() => viewLogin(false)}
            style={{backgroundColor : !isLogin ? 'rgb(255,255,255)' : 'rgb(188, 188, 188)'}}>
              Sign Up
              </button>
            <button 
            onClick={() => viewLogin(true)}
            style={{backgroundColor : isLogin ? 'rgb(255,255,255)' : 'rgb(188, 188, 188)'}}>
              Login
              </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Auth;
  