import { Link } from 'react-router-dom';

const Lab = () => {
    return (
        <div>
            <h1>The Pixel Lab</h1>
            <p>Welcome to the Pixel Lab, the birthplace of all Pixelpets!</p>
            <p>
                Here, you can generate your wildest digital pet dreams or, 
                if necessary, delete your beloved creations.
            </p>
            <div>
                <Link to="/lab/generate">Generate</Link>
                <br />
                <Link to="/lab/delete">Delete</Link> 
            </div>
        </div>
    );
};

export default Lab;