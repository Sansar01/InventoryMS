import { createContext, useState } from "react";

export const Context = createContext(
  {
    type:'',
    setType:''
  }
);

export const ContextProvider = (props) => {

 const[user,setUserId]= useState('');
 const[userName,setUserName]=useState('')

 const[type,setType]=useState(['products','supplier','challan','inventory'])

  return (
    <Context.Provider value={{user,setUserId,userName,setUserName,type,setType }}>
      {props.children}
    </Context.Provider>
  )
};
