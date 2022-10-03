//react
import { useEffect, useState } from 'react';
//css
import './Slider.css';
//component
import BtnSlider from './btnSlider';
import { useSelector ,useDispatch } from "react-redux";
import { AddUserStory } from "../../redux/action/authSlice";

const Slider =({type,data,modalClose,stateChanger}) =>{
    const dispatch = useDispatch();
    const [sliderindex,setSliderindex] = useState(1);
    const { token , user } = useSelector((store) => store.authentication);


    useEffect(() => {
       let interval = setTimeout(() => {
            nextslider();
        }, 113000);
        return () => {
            clearTimeout(interval);
        };
      }, [sliderindex])

    const nextslider =()=>{
       if(sliderindex!==data.Stories.length){
        setSliderindex(sliderindex+1)
       }else if(sliderindex===data.Stories.length){
        type!=="preview" && modalClose()
        setSliderindex(1)
       }
    }

    const prevslider =()=>{
        if(sliderindex!==1){
            setSliderindex(sliderindex-1)
           }else if(sliderindex===1){
            setSliderindex(data.Stories.length)
           }
    }

    const moveDot = index => {
        setSliderindex(index)
    }

    const removeUserStory =(item)=>{
        let Filterstory = data.Stories.filter((temp)=>temp._id!==item._id)
        stateChanger(Filterstory)
    }

    return(
        <div className='container-slider'>
             {
                 data.Stories.length>0 && data.Stories.map((item,index)=>{
                     return(
                         <div key={item._id} 
                         className={sliderindex === index + 1 ? "slide active-anim" : "slide"}
                         >
                            { type==="preview" ? 
                                 <button className={"btn-slide prev"}> 
                                 <div className='header-more-container'>
                                     <i className="fa-solid fa-ellipsis-vertical"></i> 
                                     <div className="dropdown-more-content">
                                         <button className='dropdown-option-button' 
                                           onClick={()=>removeUserStory(item)}> remove </button>
                                     </div>
                                 </div>
                              </button>
                             : null}
                             <img src={item.url} />
                         </div>
                     )
                })
             }
             <BtnSlider moveslider={nextslider} direction={"next"} />
             { type==="preview" ? <BtnSlider moveslider={prevslider} direction={"prev"} /> : null}
             
             <div className="container-dots">
                {data.Stories.map((item, index) => (
                    <div 
                    key={index}
                    onClick={() => moveDot(index + 1)}
                    className={sliderindex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default Slider;
