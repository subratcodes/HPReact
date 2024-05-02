import OnlineStatusHook from 'components/Utils/OnlineStatusHook';


import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';



export default function OnlineAlert(){

    const isOnline=OnlineStatusHook();
    let ref=useRef();

    console.log(isOnline,'---------');

    useEffect(()=>{

      ref=setInterval(()=>{
        console.log(isOnline);
      },2000)

      return ()=>{
        clearInterval(ref);
      }

    },[])


    return <Alert status='error'>
    <AlertIcon />
    <AlertTitle>You are ${isOnline?'Online':'Offline'}!</AlertTitle>
    <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
  </Alert>

}