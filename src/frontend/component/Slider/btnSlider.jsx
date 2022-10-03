//css
import './Slider.css'

const btnSlider =({moveslider,direction}) =>{

    return(
    <button
      onClick={moveslider}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev-button"}
    > {direction === "next" ?"next":"prev"}
    </button>
    )
}

export default btnSlider;