import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuCheck } from "react-icons/lu";
import { BiRadioCircle } from "react-icons/bi";

import './styles/home.css';

const LoggedInHome = ({ user }) => {
    const [interactions, setInteractions] = useState([]);
    const [taskStatus, setTaskStatus] = useState({});
    const [popularPets, setPopularPets] = useState([]);
    const [loadingPopularPets, setLoadingPopularPets] = useState(false);
    const [errorPopularPets, setErrorPopularPets] = useState(null);
    const [loadingTasks, setLoadingTasks] = useState(false);
    const [errorTasks, setErrorTasks] = useState(null);

    useEffect(() => {
        if (user) {
            // Fetch User Interactions
            const getInteractions = async () => {
                setLoadingTasks(true);
                setErrorTasks(null);

                const BASE_URL = import.meta.env.VITE_BACKEND_URL;
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`${BASE_URL}/users/interactions`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setInteractions(data);
                    // Filter and set daily tasks
                    const tasksFromToday = data.filter(interaction => {
                        const today = new Date().toISOString().split('T')[0];
                        const interactionDate = new Date(interaction.timestamp).toISOString().split('T')[0];
                        return interactionDate === today;
                    });

                    const taskTypes = ['feed', 'play', 'pet'];
                    const updatedStatus = {};

                    taskTypes.forEach(taskType => {
                        const taskCompleted = tasksFromToday.some(task => task.interaction_type === taskType);
                        updatedStatus[taskType] = taskCompleted;
                    });

                    setTaskStatus(updatedStatus);
                } catch (error) {
                    setErrorTasks(error.message);
                } finally {
                    setLoadingTasks(false);
                }
            };

            // Fetch Popular Pets
            const listPopularPets = async () => {
                setLoadingPopularPets(true);
                setErrorPopularPets(null);

                const BASE_URL = import.meta.env.VITE_BACKEND_URL;
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`${BASE_URL}/pets/list/popular`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    const topThree = data.slice(0, 3);
                    setPopularPets(topThree);
                } catch (error) {
                    setErrorPopularPets(error.message);
                } finally {
                    setLoadingPopularPets(false);
                }
            };

            getInteractions();
            listPopularPets();
        }
    }, [user]);

    return (
        <div className='home-container'>
            <div className='home-white-background'>
                <div className="header">
                    <h2>Welcome back, {user?.username}!</h2>
                </div>
            </div>

            {/* Daily Tasks Section */}
            <div className="home-white-background logged-in">
                <div className="daily-tasks">
                    <h4>Daily Tasks</h4>
                    {loadingTasks ? (
                        <p>Loading tasks...</p>
                    ) : errorTasks ? (
                        <p>Error loading tasks: {errorTasks}</p>
                    ) : (
                        <ul>
                            <li className={taskStatus.feed ? 'complete' : 'incomplete'}>
                                {taskStatus.feed ? (
                                    <LuCheck className='check-icon' />
                                ) : (
                                    <BiRadioCircle className='circle-icon' />
                                )}
                                <span className='daily-task'> Feed a pet</span>
                            </li>
                            <li className={taskStatus.play ? 'complete' : 'incomplete'}>
                                {taskStatus.play ? (
                                    <LuCheck className='check-icon' />
                                ) : (
                                    <BiRadioCircle className='circle-icon' />
                                )}
                                <span className='daily-task'> Play with a pet</span>
                            </li>
                            <li className={taskStatus.pet ? 'complete' : 'incomplete'}>
                                {taskStatus.pet ? (
                                    <LuCheck className='check-icon' />
                                ) : (
                                    <BiRadioCircle className='circle-icon' />
                                )}
                                <span className='daily-task'> Pet another user's pet</span>
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            {/* Popularity Leaderboard Section */}
            <div className="home-white-background logged-in">
                <div className="popularity-leaderboard">
                    <h4>Popularity Leaderboard</h4>
                    {loadingPopularPets ? (
                        <p>Loading popular pets...</p>
                    ) : errorPopularPets ? (
                        <p>Error loading popular pets: {errorPopularPets}</p>
                    ) : (
                        <ol className='popular-pets'>
                            {popularPets.map((pet) => (
                                <li key={pet.id} className='popular-pet'>
                                    <Link to={`/pets/${pet.id}`}>{pet.name}</Link> - {pet.p}
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoggedInHome;
