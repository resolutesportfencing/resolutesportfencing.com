import React, { useEffect,useState } from "react";
import Router from 'next/router'
const myPage = ()=>{
    const [loaded,setLoaded] = useState(false)
    useEffect(() => {
        const {pathname} = Router
        // conditional redirect
        if(pathname == '/' ){
           location.replace("/home/")
        }else{
            setLoaded(true)
        }
      },[]);

    if(!loaded){
        return <div></div> //show nothing or a loader
    }
    return ( 
        <p>
            You will see this page only if pathname !== "/" , <br/>
        </p> 
    )
}
export default myPage