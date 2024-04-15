import React from "react";
import "../styles/showtime.css";

const Showtime = () => {
    const movies = [
        {
            id: 1,
            title: "Avengers: Endgame",
            image:
                "https://ss-images.saostar.vn/wp700/2019/04/02/4887547/avengers-endgame-dolby-1165441.jpeg",
            schedule: ["9:00AM", "12:00PM", "3:00PM", "6:00PM", "9:00PM"],
        },
        {
            id: 2,
            title: "Bridget Jones's Diary",
            image:
                "https://www.miramax.com/assets/bridget_jones_diary_scrubbed_150413.jpg",
            schedule: ["10:00AM", "1:00PM", "4:00PM", "7:00PM", "10:00PM"],
        },
        {
            id: 3,
            title: "Insidious",
            image:
                "https://musicart.xboxlive.com/7/4eac5000-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080",
            schedule: ["11:00AM", "2:00PM", "5:00PM", "8:00PM"],
        },
        {
            id: 4,
            title: "Titanic",
            image:
                "https://upload.wikimedia.org/wikipedia/vi/a/ab/Titanic_3D_poster_Vietnam.jpg",
            schedule: ["12:00AM", "12:30PM", "5:00PM", "8:00PM"],
        },
        {
            id: 5,
            title: "Your Name",
            image:
                "https://m.media-amazon.com/images/M/MV5BNGYyNmI3M2YtNzYzZS00OTViLTkxYjAtZDIyZmE1Y2U1ZmQ2XkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg",
            schedule: ["11:00AM", "2:00PM", "5:00PM", "8:00PM"],
        },
        {
            id: 6,
            title: "PK",
            image:
                "https://m.media-amazon.com/images/M/MV5BMTg5NzIzMzEyOF5BMl5BanBnXkFtZTgwMjgzMTg0MzE@._V1_FMjpg_UX1000_.jpg",
            schedule: ["12:00AM", "12:30PM", "5:00PM", "8:00PM"],
        },
    ];

    return (
        <>
            <div className="main-content">
                <div className="bg-dark tix-bg">
                    <div className="text-center">
                        <h1 className="mb-3 text-white-1">Lịch chiếu</h1>
                        <h4 className="mb-3 text-white-2">
                            Tìm lịch chiếu phim / rạp nhanh nhất với chỉ 1 bước!
                        </h4>
                    </div>
                </div>
            </div>
            <div className="showtime-container">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie">
                        <h2>{movie.title}</h2>
                        <div className="movie-item">
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="movie-image"
                            />

                            <ul className="schedule">
                                {movie.schedule.map((time) => (
                                    <li key={time}>{time}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            <div className="col-md-6">
                <div id="showtimes"></div>
            </div>
        </>
    );
};

export default Showtime;
