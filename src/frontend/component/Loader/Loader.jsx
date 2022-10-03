import "./Loader.css";
import loader from '../../img/loader.gif';

const Loader = () =>{
  return(
      <div className="Loader">
          <div> <img className="loader-img" src={loader} alt="loader"/> </div> 
      </div>
  )
}

export default Loader;