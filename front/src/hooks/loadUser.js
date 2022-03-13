import {useState, useEffect} from 'react';
import { getUser } from '../services/Api/security/Authenticator';

export const loadUser = (initialValue = null) => {
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