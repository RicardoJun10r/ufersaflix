import React, { useState } from 'react';
import NavbarUser from '../../components/NavbarUser';
import NavBar from '../../components/NavBarComponent/NavBar';
import CarouselSlideCard from '../../components/CarouselSlideCard';
import CarouselContainer from '../../components/CarouselContainer'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useEffect } from 'react';
import { getUsers } from '../../services/api';

function Home() {


    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        (async () => {
            // const response = await getUsers();
            // setUsers(response.data);
            setLoading(false);
        })();

    }, []);

    

    if(loading){
        return <div>Carregando dados...</div>
    }

    return (
        <div style={{ backgroundColor: "#393939", color: "white" }}>
            <NavBar />
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    {/* <div className="carousel-item active">
                        <CarouselSlideCard />
                    </div>
                    <div className="carousel-item">
                        <CarouselSlideCard />
                    </div>
                    <div className="carousel-item">
                        <CarouselSlideCard />
                    </div> */}
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <br />
            <h2 style={{ color: "white" }}>Populares: </h2>
            <br />
            {/* <CarouselContainer /> */}
        </div>
    );
}

export default Home;


