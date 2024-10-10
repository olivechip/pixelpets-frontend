import { Link } from 'react-router-dom';

const Pound = () => {
    return (
        <div>
            <div className="header">
                <h1>The Pixel Pound</h1>
            </div>
            
            <div>
                <p>Welcome to the Pixel Pound! This is where kind-hearted souls can find the perfect Pixelpet for themselves.<br />
                    Or, you know, where less-dedicated pet owners can conveniently "rehome" their virtual companions when the novelty wears off.
                </p>
                <img src={"/images/tools/pixel_pound.png"} style={{ width: '500px', height: '500px' }} alt="pixel_pound" />
            </div>

            <div>
                <Link to="/pound/adopt">Adopt</Link>
                <br />
                <Link to="/pound/abandon">Abandon</Link>
            </div>
        </div>
    )
}

export default Pound;