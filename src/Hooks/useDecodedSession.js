import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"; 

const useDecodedSession = () => {
  const session = JSON.parse(localStorage.getItem("auth")); 
  const  [decodedSession, setDecodedSession] = useState(null)

  useEffect(() => {
    if (session) {
      const decodedSession = jwt_decode(session)
      console.log(decodedSession)
      setDecodedSession(decodedSession)
    }
  }, [session]);
  return decodedSession;
};

export default useDecodedSession;
