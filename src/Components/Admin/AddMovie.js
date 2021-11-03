import React, { useState, useContext } from "react";
import MovieContext from "../../State/MovieContext";

const AddMovie = () => {
  const context = useContext(MovieContext);
  const { addMovie } = context;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");
  const [release_date, setRelease] = useState("");
  
  const onChangeFile = (e) => {
    setImage(e.target.files[0] );
  };
  const handleClick = (e) => {
    e.preventDefault();
    const formData =new FormData()

    formData.append("title",title)
    formData.append("description",description)
    formData.append("image", image)
    formData.append("release_date", release_date)
    formData.append("genre", genre)
    console.log()
    addMovie(formData);
    // setMovie({title:"",description:"",status:"",release_date:"",genre:""})
  };
  return (
    <div className="container my-3">
      <h2>Add Movies</h2>
      <form className="my-3" encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload Poster
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            // value={image}
            onChange={onChangeFile}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="release_date" className="form-label">
            release_date
          </label>
          <input
            type="Date"
            className="form-control"
            id="release_date"
            name="release_date"
            value={release_date}
            onChange={(e)=>setRelease(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            genre
          </label>
          <input
            type="text"
            className="form-control"
            id="genre"
            name="genre"
            value={genre}
            onChange={(e)=>setGenre(e.target.value)}
            required
          />
        </div>
        <button
          // disabled={etitle.length < 2 || edescription.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
