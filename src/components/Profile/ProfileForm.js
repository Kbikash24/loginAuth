import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../store/Auth-Context';
import {useHistory} from "react-router-dom"
const ProfileForm = () => {
  const newPasswordInputRef=useRef()
  const AuthCtx=useContext(AuthContext)
  const history=useHistory()
  const submitHandler=(event)=>{
    event.preventDefault()
    const eneteredPassword=newPasswordInputRef.current.value;
    //add validation
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyCF_6Se4K8su8XTvm_WAL7etYtBWD35ywY",{
      method:'POST',
      body:JSON.stringify({
        idToken:AuthCtx.token,
        password:eneteredPassword,
        returnSecureToken:false

      }),
      headers:{
'Content-Type':'application/json'
      }
    }).then(response=>{
      //always succeed
      history.replace("/")
    })
  }
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button onClick={submitHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
