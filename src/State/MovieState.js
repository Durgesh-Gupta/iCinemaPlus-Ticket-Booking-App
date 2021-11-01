import react,{useState} from "react";
import MovieContext from "./MovieContext";

const MovieState = (props) => {
    const movies = [
        {
          _id: "617aaa79924c8ebcd67eab4f",
          title: "Avengers",
          description: "Marvel Cinematic Universe",
          genre: "Action,comic",
          status: "Comming Soon",
          release_date: "2020-07-10T00:00:00.000Z",
          __v: 0,
          IS_DELETE: true,
        },
        {
          _id: "617bb1bccad30c852e3eba1a",
          title: "One Piece",
          description: "Pirates adventure",
          genre: "Action,comic",
          status: "Comming Soon",
          release_date: "2020-02-10T00:00:00.000Z",
          IS_DELETE: false,
          __v: 0,
        },
      ];
      const [Movies, setMovies] = useState(movies);

      //Add Movies
      const addMovie =async (title,description,genre,status,release_date)=>{
        

        setMovies(movies.concat(movies))
      }
      //Delete Movies
      const deleteMovie =(id)=>{
        const newMovie = movies.filter((movie)=>{
          return movie._id!==id
        })
        setMovies(newMovie)
      }

      //Edit Movie
      const editMovie=async (id,title,description,status,genre,release_date)=>{
        //API CALL
        const response = await
      for(let i=0;i<movies.length;i++){
        const element=movies[i]
        if(element._id===id){
          element.title=title,
          element.description=description,
          element.status=status,
          element.genre=genre,
          element.release_date=release_date
        }
      }

    }



    return (
        <MovieContext.Provider value={{Movies,setMovies,addMovie}}>
           {props.children} 
        </MovieContext.Provider>
    )
}

export default MovieState
