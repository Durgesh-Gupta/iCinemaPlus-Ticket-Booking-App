import React, { useContext, useRef, useState,useEffect } from "react";
import MovieContext from "../../State/MovieContext";


const AddShowtime = () => {
  const context = useContext(MovieContext);
  const { AllDetails, deleteShow, updateShowTime, addShowtime } = context;
  var { showtime } = context;
  const tempmov = {};
  if (AllDetails) {
    console.log("import showtime",showtime)
    AllDetails.movies.map((mov) => {
      tempmov[mov._id] = mov.title;
    });
    // console.log(tempmov);
  }
  else{
     showtime={
      id: "Loading....",
      emovie: "Loading....",
      etheater: "Loading....",
      etime: "Loading....",
    }
  }
  useEffect(() => {
    console.log(showtime)
  }, showtime)
  // const showtime = AllDetails.showtimes;
  // setshowtime(AllDetails.showtimes);

  // Update Modal
  const ref = useRef(null);
  const refClose = useRef(null);
  const [eshowtime, seteshowtime] = useState({
    id: "",
    emovie: "",
    etheater: "",
    etime: "",
  });

  const updateShow = (show) => {
    ref.current.click();
    console.log("show", show);
    console.log("movie", show.movie);
    seteshowtime({
      id: show._id,
      emovie: show.movie,
      etheater: show.theater,
      etime: show.time,
    });
  };

  const handleClick = (e) => {
    // console.log(e)
    updateShowTime({ id: eshowtime.id, time: eshowtime.etime });
    refClose.current.click();
  };

  const onChange = (e) => {
    seteshowtime({ ...eshowtime, [e.target.name]: e.target.value });
  };
  // Add Showtime
  const [newshow, setnewshow] = useState({
    movie: "",
    theater: "",
    time: "",
  });
  const onshowChange = (e) => {
    setnewshow({ ...newshow, [e.target.name]: e.target.value });
  };
  const handleshowSubmit = (e) => {
    e.preventDefault();
    console.log("new Show:",newshow)
    addShowtime(newshow);
  };

  return (
    <div>
      <form onSubmit={handleshowSubmit}>
        <div className="form-group col-6">
          <label htmlFor="name">Movie</label>
          <input
            type="text"
            required
            className="form-control"
            id="movie"
            name="movie"
            onChange={onshowChange}
            value={newshow.movie}
          />
        </div>
        <div className="form-group col-6">
          <label htmlFor="email">Theater</label>
          <input
            type="text"
            required
            className="form-control"
            id="theater"
            name="theater"
            onChange={onshowChange}
            value={newshow.theater}
          />
        </div>
        <div className="form-group col-6">
          <label htmlFor="contact">Time</label>
          <input
            type="text"
            required
            className="form-control"
            name="time"
            id="time"
            onChange={onshowChange}
            value={newshow.time}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <h1>Showtime</h1>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Movie</th>
            <th scope="col">Theater</th>
            <th scope="col">Time</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {showtime.map((st) => {
            return (
              <tr key={st._id}>
                <th scope="row">
                  <span className={`badge bg-${st.IS_DELETE ? "danger" : "success"}`}>{st.IS_DELETE ? "True" : "False"}</span>
                  </th>
                <td>{tempmov[st.movie]}</td>
                <td>{st.theater}</td>
                <td>{st.time}</td>
                <td>
                  <i
                    className="bi bi-trash mx-2"
                    onClick={() => {
                      deleteShow(st._id);
                    }}
                  ></i>
                  <i
                    className="bi bi-pencil-square mx-2"
                    onClick={() => {
                      updateShow(st);
                    }}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Update Modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Show
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Movie
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    id="emovie"
                    name="emovie"
                    value={eshowtime.emovie}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Theater
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etheater"
                    name="etheater"
                    value={eshowtime.etheater}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Time
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etime"
                    name="etime"
                    value={eshowtime.etime}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                // disabled={
                //   showtime.emovie.length < 5 || showtime.etheater.length < 5
                // }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShowtime;
