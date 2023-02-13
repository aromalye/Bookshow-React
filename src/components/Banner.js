import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';



const Banner = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return(
        <div className='m-5'>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://assets-in.bmscdn.com/promotions/cms/creatives/1674125715750_vinweb.jpg"
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://assets-in.bmscdn.com/promotions/cms/creatives/1670502578966_web.jpg"
                    alt="Second slide"
                    />                 
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://assets-in.bmscdn.com/promotions/cms/creatives/1672137034486_ritvizweb.jpg"
                    alt="Third slide"
                    />
                </Carousel.Item>
                </Carousel>
        </div>
    )
}
export default Banner;