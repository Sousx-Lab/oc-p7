import {useState, useEffect} from 'react';
import { getUser } from '../services/Api/security/authenticator';

export function loadUser (initialValue = null){
    const [isLoading, setIsLoading] =  useState(true)
    const [user, setUser] = useState(initialValue);
    
    useEffect(() => {
      (async() => {
        await getUser()
        .then(data => {
          setUser(data);
          setIsLoading(!isLoading);
        });
      })();
    },[]);
    
    return [
        user,
        setUser,
        isLoading
    ]
}