const FilterReducer=(state,action)=>{

    switch(action.type){  
        case "POST_CATEGORY_TYPE" :{
            return{...state,PostcategoryType:action.payload}
        }

        case "SORTBy":{
            return{...state,sortBy:action.payload}
        }
        
        case "SEARCH_CATEGORY":{
            return{...state,searchType:action.payload}
        }
        
        default :
        return state
    }
}

export default FilterReducer;