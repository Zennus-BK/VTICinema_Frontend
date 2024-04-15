import React, { useEffect, useState } from "react";
import HeaderMenu from "../component/headerMenu";
import screen from "../assets/bg-screen.png"
import "../styles/bookticket.css"
import { useParams } from "react-router-dom";
import showtimeApi from "../axios/showtimeService";
import seatApi from "../axios/seatService";

const BookTicket = () => {
    const [filmName, setFilmName] = useState();
    const [theaterName, setTheaterName] = useState();
    const [timeShow, setTimeShow] = useState();
    const [seat, setSeat] = useState([]);
    const [cinemaRoomId, setCinemaRoomId] = useState([]);
    const [seatRowA, setSeatRowA] = useState([]);
    const { showtimeId } = useParams();


    const getShowtime = async () => {
        try {
            const res = await showtimeApi.getById(showtimeId);
            setFilmName(res.data.film.name)
            setTheaterName(res.data.cinemaRoom.theater.name)
            setTimeShow(res.data.timeShow)
            setCinemaRoomId(res.data.cinemaRoom.cinemaRoomId)
            setSeat(res.data.cinemaRoom.seat)
        } catch (error) {

        }

    }
    const getSeat = async () => {
        const seatsearch = {
            cinemaRoomCinemaRoomID: cinemaRoomId,
            row: "A"
        }
        const resSeatRowA = await seatApi.getByRow(seatsearch);
        seatRowA(resSeatRowA.data)
        console.log(seatRowA)
    }
    useEffect(() => {
        getShowtime();
        getSeat();
    }, []);
    return (
        <>
            <div className="bookticket-container">
                <div>
                    <img src={screen} />
                    <div className="movie-detail"><MovieDetai filmName={filmName} theater={theaterName} timeShow={timeShow} /></div>
                    <div className={"seat-row"}>{seat.map((Object) => { Object.row == "B" ? <div key={Object.id}><SeatCard row={Object.row} column={Object.column} /></div> : null })}</div>
                    <div className={"seat-row"}>{seat.map((Object) => <div key={Object.id}>{Object.row == "B" && <SeatCard row={Object.row} column={Object.column} />}</div>)}</div>
                </div>

            </div>
        </>
    )
};

const MovieDetai = (props) => {

    return (
        <>
            <div>Phim: {props.filmName}</div>
            <div>Rạp: {props.theater}</div>
            <div>Giờ chiếu: {props.timeShow}</div>
        </>
    )

}
const SeatCard = (props) => {
    return (
        <><div>{props.row}{props.column}</div></>
    )
}
export default BookTicket;