
import { useState } from 'react';
import './Tooltip.css';

const Tooltip =({children,content})=>{
    const [isactive,setactive]=useState(false)

    const showtooltip=()=>{
        setactive(true)   
    }
    
    const hidetooltip=()=>{
        setactive(false)
    }

return(
    <div className='tooltip-container' onMouseEnter={showtooltip} onMouseLeave={hidetooltip}>
       {children}
       {
        isactive ? 
           <span className='tooltip-box'>
               {content}
           </span>
           :null
       }
        
    </div>
  )
}
export default Tooltip;