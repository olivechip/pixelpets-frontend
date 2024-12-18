import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { capitalizeFirstLetter } from './helpers/helpers';
import { validatePetName } from './helpers/validationUtils';

const PetCreate = () => {
    const { user } = useSelector(state => state.user);
    const [colorless, setColorless] = useState([]);
    const [selectedPetIndex, setSelectedPetIndex] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSpecies, setSelectedSpecies] = useState('');
    const [petName, setPetName] = useState('');
    const [gender, setGender] = useState('male');
    const [petNameError, setPetNameError] = useState(null);

    const navigate = useNavigate();

    const colors = ['blue', 'red', 'green', 'yellow'];
    const dynamicImagePath = `/images/pixelpets/${selectedSpecies}/happy_${gender}_${selectedColor}_${selectedSpecies}.png`;

    useEffect(() => {
        const getColorlessFilenames = async () => {
            const images = import.meta.glob(`/public/images/pixelpets/*/colorless_*.png`);
            const imagePaths = Object.keys(images);
            const imageUrls = await Promise.all(
                imagePaths.map(async (path) => {
                    const module = await images[path](); 
                    return { path, url: module.default };
                })
            );
            return imageUrls;
        };

        const selectRandomPet = (data) => {
            if (data.length > 0) {
                // Select a random index from list of colorless pets
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomPet = data[randomIndex];
                setSelectedPetIndex(randomIndex);

                // Extracts the species name from randomPet's path
                const species = randomPet.path.split("/").pop().split(".")[0].replace("colorless_", "");
                setSelectedSpecies(species);

                // Get a random color from colors array
                setSelectedColor(colors[Math.floor(Math.random() * colors.length)]);
            }
        };

        const initialize = async () => {
            try {
                const data = await getColorlessFilenames();
                setColorless(data);
                selectRandomPet(data);
            } catch (error) {
                console.error('Error fetching PNGs:', error);
            }
        };

        initialize();
    }, []);

    const getPetSpecies = (path) => {
        const fileName = path.split('/').pop();
        const speciesName = fileName.replace("colorless_", "").replace(".png", "").toUpperCase();
        return speciesName;
    };

    const handlePetClick = (index, png) => {
        setSelectedPetIndex(index); 
        setSelectedSpecies(getPetSpecies(png.path).toLowerCase());
    };

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    const handlePetCreate = async (e) => {
        e.preventDefault();
        setPetNameError(null);

        // Pet name validation
        const petNameError = validatePetName(petName);
        if (petNameError) {
            setPetNameError(petNameError);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            
            const BASE_URL = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${BASE_URL}/pets`, {
                method: 'POST',
                headers: {
                    'Content-Type':' application/json',
                    'Authorization': `Bearer ${token}`
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
                    state: { 
                        message: `You have successfully created ${newPet.name}, the ${capitalizeFirstLetter(newPet.color)} ${capitalizeFirstLetter(newPet.species)}!`,
                        pet: {
                            species: newPet.species,
                            color: newPet.color,
                            gender: newPet.gender
                        }
                    },
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
            <div className="header"> 
                <div className="button-container-left">
                    <button onClick={() => navigate(-1)}>Back</button>
                </div>
                <h1>Create a Pet</h1>
                <div className="button-container-right">
                    <button type="submit" form="petForm">Create</button>
                </div>
            </div>

            <div>
                <p>Tired of your real pet shedding all over your keyboard?  Create a Pixelpet! They're friendly, low-maintenance, and come in all shapes and sizes. <br /> 
                    Plus, they come with built-in Wi-Fi. (Okay, not really, but one can dream, right?)
                </p>
            </div>

            <div className="content">
                <form id="petForm" onSubmit={handlePetCreate}>
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
                                <img className="dynamic-image" src={dynamicImagePath} alt={`happy_${gender}_${selectedColor}_${selectedSpecies}.png`} />
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
                                    <label htmlFor='petName'><b>PIXELPET NAME</b></label><br />
                                    <input
                                        name="petName"
                                        type="text"
                                        value={petName}  
                                        onChange={(e) => {
                                            setPetName(e.target.value);
                                            setPetNameError(null);
                                        }}
                                        placeholder="name"
                                        required
                                        minLength="3"
                                        maxLength="16"
                                    />
                                    {petNameError && (
                                        <div className="error">{petNameError}</div> 
                                    )}
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
                    <div className="right-section">
                        <h3>Right Section</h3>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PetCreate;