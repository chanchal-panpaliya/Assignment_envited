import { useReducer ,useEffect } from "react";
import SocialContext from "./SocialContext";
import ToastReducer from './Toast/ToastReducer';
import FilterReducer from "./Filter/Filter";


const SocialState =({ children })=>{
   const [toast,toastdispatch] = useReducer(ToastReducer,{showToast:false , toastList : []})
   const [filter,filterdispatch] = useReducer(FilterReducer,{ PostcategoryType:"ALL",sortBy:"",searchType:"People"})
   //delete toast
   const deleteToast = (id) =>{
    toastdispatch({type:'REMOVE_TOAST',payload:id})  
   }

    return(
        <SocialContext.Provider value={{
            toastList : toast.toastList,
            toast,toastdispatch,
            filter,filterdispatch,
            //fun
            deleteToast
        }}>
            { children }
        </SocialContext.Provider>
    )

}

export default SocialState;