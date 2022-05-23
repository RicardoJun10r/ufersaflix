import React from 'react';
import CarouselContainer from '../../components/CarouselContainer';
import NavbarUser from '../../components/NavbarUser';

function Series() {
    return(
        <div style={{ backgroundColor: "#393939", color: "white" }}>
            <NavbarUser />
            <br />
            <h2 style={{ color: "white" }}>Séries: </h2>
            <br />
            <CarouselContainer />
        </div>
    )
}
export default Series;