import { Link } from 'react-router-dom';

const Pound = () => {
    return (
        <div>
            <h1>The Pixel Pound</h1>
            <div>
                <p>Welcome to the Pixel Pound! This is where kind-hearted souls can find the perfect Pixelpet for themselves.</p>
                <p>Or, you know, where less-dedicated pet owners can conveniently "rehome" their virtual companions when the novelty wears off.</p>
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