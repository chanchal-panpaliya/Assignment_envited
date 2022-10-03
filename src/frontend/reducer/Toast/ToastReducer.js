
const ToastReducer=(state,action)=>{
    let toastProperties = null;
    switch(action.type){
        case "SUCCESS" : {          
                toastProperties = {
                    id:Math.random(),
                    title: 'SUCCESS',
                    description: action.payload,
                    backgroundColor: '#5cb85c'
                }    
                return {...state,toastList : [...state.toastList , toastProperties ]}
        }
        
        case "DANGER" :{
            toastProperties = {
                id:Math.random(),
                title: 'DANGER',
                description: action.payload,
                backgroundColor: '#d9534f'
            } 
            return {...state,toastList : [...state.toastList , toastProperties ]}
        }
       
        case "INFO" : {
            toastProperties = {
                id:Math.random(),
                title: 'INFO',
                description: action.payload,
                backgroundColor: '#5bc0de'
            } 
            return {...state,toastList : [...state.toastList , toastProperties ]}
        }
      
        case "WARNING" : {
            toastProperties = {
                id:Math.random(),
                title: 'WARNING',
                description: action.payload,
                backgroundColor: '#f0ad4e'
            }
            return {...state,toastList : [...state.toastList , toastProperties ]}
        }
       
        case 'REMOVE_TOAST' : {
            return{...state,toastList : state.toastList.filter(item=>item.id!==action.payload)}  
        }

        default:
            toastProperties = [];
    }
 
}

export default ToastReducer;