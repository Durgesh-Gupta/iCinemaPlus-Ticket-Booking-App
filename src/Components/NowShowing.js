import React from 'react'
import {Link} from "react-router-dom"


const NowShowing = () => {
    return (
        <div>
            <h1>Now Showing</h1>
            <Link className="btn btn-primary mx-2" to="/booking" role="button">Login</Link>
        </div>
    )
}

export default NowShowing
