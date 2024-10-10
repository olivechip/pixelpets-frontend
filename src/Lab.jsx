import { Link } from 'react-router-dom';

const Lab = () => {
    return (
        <div>
            <div className="header">
                <h1>The Pixel Lab</h1>
            </div>
            
            <div>
                <p>Welcome to the Pixel Lab, the birthplace of all Pixelpets!<br />
                    Here, you can create your wildest digital pet dreams or, if necessary, delete your beloved creations.
                </p>
                <img src="/images/tools/pixel_lab.png" style={{ width: '500px', height: '500px' }} alt="pixel_lab" />
            </div>

            <div>
                <Link to="/lab/create">Create</Link>
                <br />
                <Link to="/lab/delete">Delete</Link> 
            </div>
        </div>
    );
};

export default Lab;