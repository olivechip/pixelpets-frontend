import { useState } from "react";
import { Link } from "react-router-dom";

const Github = ()=> {
    const [ check, setCheck ] = useState(true)

    return (
        <div className="github">
            { check ? (
                <button onClick={() => setCheck(false)}>Check Out My Work!</button>
            ) : (
                <>
                    <Link to="https://github.com/olivechip/pixelpets-frontend" target="_blank" rel="noopener noreferrer">Front End</Link><br />
                    <Link to="https://github.com/olivechip/pixelpets-backend" target="_blank" rel="noopener noreferrer">Back End</Link>
                </>
                )
            }
            
      </div>
    )
}

export default Github;