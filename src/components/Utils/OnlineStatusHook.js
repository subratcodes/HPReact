
import { useState } from 'react';

import { useEffect } from 'react';


function OnlineStatusHook(){

    const[status,setStatus]=useState(false);


    useEffect(() => {
        
        
        window.addEventListener('online',()=>setStatus(true));
        window.addEventListener('offline',()=>setStatus(false));
        return () => {
          window.removeEventListener('online', ()=>setStatus(false));
          window.removeEventListener('offline', ()=>setStatus(false));
        };
      }, []);


      return status;

}

export default OnlineStatusHook;
