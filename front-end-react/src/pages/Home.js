import "./Home.css";
import { useEffect, useState } from 'react';
import { getmovies } from "../data/Data_repository";
const Home = () => {
    const [movie, setMovie] = useState([])
    useEffect(() => {
        fetchMovie()
    }, [])

    const fetchMovie = async () => {
        const movie = await getmovies();
        setMovie(movie)

    }

    return (
        <div className="Main-container">
            <div className="Introduction">
                <h2>About Loop Web:</h2>
     
                <p>
                    Welcome to Loop Web, a cinematic paradise that transports you to
                    otherworldly realms through the magic of storytelling. Step into a
                    realm where imagination knows no bounds, and your senses are treated
                    to an unparalleled movie-watching experience.
                </p>
                <p>
                    Our cinema is a haven for cinephiles and casual moviegoers alike,
                    designed with state-of-the-art technology and an ambiance that
                    enhances the magic of the silver screen. From the moment you enter,
                    you'll be enveloped in an atmosphere that blends comfort and luxury,
                    making every visit a memorable event.
                </p>
                <p>
                    The theater boasts a collection of auditoriums that cater to every
                    cinematic desire. Whether you're seeking the latest Hollywood
                    blockbusters, indie gems, timeless classics, or captivating
                    documentaries, we have screens specially curated to fulfill your
                    cinematic appetite. Each auditorium is equipped with cutting-edge
                    projection and sound systems, ensuring that every frame and whisper is
                    presented with impeccable clarity and depth.
                </p>
                <p>
                    (Description from chatGPT)
                </p>
            </div>
            <div className="Coming-films">
                <h2>Upcoming Movies:</h2>
                <div className="Films">
                    {movie && movie.map((mo) => {
                        const moName = mo[Object.keys(mo)[0]]
                        const moURL = mo[Object.keys(mo)[1]]
                        const data = mo[Object.keys(mo)[2]]
                        return (
                            <div key={moName} className="Film">
                                <h3>Coming date: {data}</h3>
                                <img src={moURL} alt={moName} width="300px" height="300px"></img>
                                <h3>{moName}</h3>
                            </div>
                        )
                    })}
                </div>
            </div >
        </div>
    );
};
export default Home;
