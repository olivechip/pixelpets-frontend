import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PetCreate = () => {
    const { user } = useSelector(state => state.user);
    const [colorless, setColorless] = useState([]);
    const [selectedPetIndex, setSelectedPetIndex] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSpecies, setPetSpecies] = useState('');
    const [petName, setPetName] = useState('');
    const [gender, setGender] = useState('male');

    const navigate = useNavigate();

    const colors = ['blue', 'red', 'green', 'yellow'];
    const dynamicImagePath = `/src/assets/pixelpets/colored/${selectedSpecies}_${selectedColor}_${gender}.png`;

    useEffect(() => {
        const getPngFilenames = async () => {
            const images = import.meta.glob('./assets/pixelpets/colorless/*.png');
            const imagePaths = Object.keys(images);
            const imageUrls = await Promise.all(
                imagePaths.map(async (path) => {
                    const module = await images[path](); 
                    return { path, url: module.default };
                })
            );
            return imageUrls;
        };

        const fetchColorless = async () => {
            try {
                const data = await getPngFilenames();
                setColorless(data);
                
                // Randomly select a species and color on initial render
                if (data.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    const randomPet = data[randomIndex];
                    setSelectedPetIndex(randomIndex);
                    setPetSpecies(randomPet.path.split('/').pop().split('.')[0]);
                    setSelectedColor(colors[Math.floor(Math.random()*colors.length)]);
                }
            } catch (error) {
                console.error('Error fetching PNGs:', error);
            }
        };

        fetchColorless();
    }, []);

    const getPetSpecies = (path) => {
        const fileName = path.split('/').pop();
        return fileName.replace('.png', '').toUpperCase();
    };

    const handlePetClick = (index, png) => {
        setSelectedPetIndex(index); 
        setPetSpecies(getPetSpecies(png.path).toLowerCase());
    };

    const capitalizeFirstLetter = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    const handlePetCreate = async () => {
        try {
            const token = localStorage.getItem('token');
    
            const response = await fetch('/api/pets', {
                method: 'POST',
                headers: {
                    'Content-Type':' application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    owner_id: user.id,
                    name: petName,
                    species: selectedSpecies, 
                    color: selectedColor,
                    gender,
                    img_url: dynamicImagePath
                })
            });
    
            if (response.ok) {
                const newPet = await response.json();
                navigate('/lab/created', { 
                    state: { message: `You have successfully generated ${newPet.name}, the ${newPet.color} ${newPet.species}!` },
                    replace: true 
                });
            } else {
                const errorData = await response.json();
                console.error('Error creating pet:', errorData);
            }
        } catch (error) {
            console.error('Error creating pet:', error);
        }
    };

    return (
        <div className="container">
            <h1>Create a Pet</h1>
            <div className="content">
                <div className="left-section">
                    <h3>Select Species</h3>
                    <div className="scrollable-species-list">
                        <ul className="colorless-list">
                            {colorless.map((png, index) => (
                                <li 
                                    className={`colorless-pet ${selectedPetIndex === index ? 'selected' : ''}`} 
                                    key={index}
                                    onClick={() => handlePetClick(index, png)}
                                >
                                    <img className="colorless-pet-img" src={png.url} alt={`Pixel Pet ${index}`} />
                                    <p className="colorless-pet-name">{getPetSpecies(png.path)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="middle-section">
                    <div className="dynamic-container">
                        {selectedColor && (
                            <img className="dynamic-image" src={dynamicImagePath} alt={`${selectedSpecies}_${selectedColor}_${gender}.png`} />
                        )}
                    </div>
                    <div className="color-buttons">
                        {colors.map((color) => (
                            <div
                                key={color}
                                className={`color-button ${color} ${selectedColor === color ? 'active' : ''}`}
                                onClick={() => handleColorClick(color)}
                            >
                                {color.toLocaleUpperCase()}
                            </div>
                        ))}
                    </div>
                    <div className="species-container">
                        <h3>Species: {capitalizeFirstLetter(selectedSpecies)}</h3>
                        <div className="input-groups">
                            <div className="input-group">
                                <label><b>PIXELPET NAME</b></label><br />
                                <input
                                    type="text" 
                                    value={petName} 
                                    onChange={(e) => setPetName(e.target.value)}
                                    required 
                                    max={20}
                                />
                            </div>
                            <div className="gender-group">
                                <label><b>GENDER</b></label><br />
                                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-section">right Section - personality, stats? 
                    <button onClick={handlePetCreate} disabled={!selectedColor || !petName}>PetCreate</button>
                </div> 
            </div>
        </div>
    );
};

export default PetCreate;