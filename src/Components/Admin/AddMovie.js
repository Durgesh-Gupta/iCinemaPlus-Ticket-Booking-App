import React,{useState,useContext} from 'react'
import MovieContext from "../../State/MovieContext"

const AddMovie = () => {
    const context = useContext(MovieContext);
    const {addMovie} = context;

    const [Movie, setMovie] = useState({title:"",description:"",status:"",release_date:"",genre:""})

    const onChange = (e)=>{
        setMovie({...Movie, [e.target.name]: e.target.value})
    }
        const handleClick=(e)=>{
            e.preventDefault()
            addMovie(Movie.title,Movie.description,Movie.release_date,Movie.status,Movie.genre)
            setMovie({title:"",description:"",status:"",release_date:"",genre:""})
        }
    return (
        <div className="container my-3">
        <h2>Add Movies</h2>
        <form className="my-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={Movie.title} onChange={onChange} minLength={3} required /> 
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name="description" value={Movie.description} onChange={onChange} minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="release_date" className="form-label">release_date</label>
                <input type="text" className="form-control" id="release_date" name="release_date" value={Movie.release_date} onChange={onChange} minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="genre" className="form-label">genre</label>
                <input type="text" className="form-control" id="genre" name="genre" value={Movie.genre} onChange={onChange} minLength={3} required />
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">status</label>
                <select className="form-control" id="status" name="status"  required >
      <option onChange={onChange} value={Movie.status}>Coming Soon</option>
      <option onChange={onChange} value={Movie.status}>Current</option>
      
    </select>
               
            </div>
           
            <button disabled={Movie.title.length<2 || Movie.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add movie</button>
        </form>
    </div>
    )
}

export default AddMovie
