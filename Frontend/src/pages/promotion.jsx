import React from "react";
import "../styles/promition.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const Promotion = () => {
    const promotions = [
        {
            imageUrl:
                "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/042024/Ban_moi_240x201.jpg",
            title: "Ưu đãi 1",
            date: "12/04 - 14/04/2024",
        },
        {
            imageUrl:
                "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/042024/NO-GCPM-240x201.jpg",
            title: "Ưu đãi 2",
            date: "15/4/2024",
        },
        {
            imageUrl:
                "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/042024/Banner-240-x-201.png",
            title: "Ưu đãi 3",
            date: "Thứ 4 vui vẻ",
        },
        {
            imageUrl:
                "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/042024/cgv-240-x-201.png",
            title: "Ưu đãi 4",
            date: "20/04 - 30/06/2024",
        },
        {
            imageUrl:
                "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/022024/240x201.png",
            title: "Ưu đãi 4",
            date: "15/04 - 30/4/2024",
        },
        {
            imageUrl:
                "https://iguov8nhvyobj.vcdn.cloud/media/wysiwyg/2024/022024/240x201.png",
            title: "Ưu đãi 4",
            date: "15/04 - 30/4/2024",
        },
        // Thêm các ưu đãi khác nếu cần
    ];
    return (
        <div className="promotion-content ">
            <div className="row mt-5 mb-4 justify-content-center promotion-title">
                <h2 className="text-center">
                    =========== TIN MỚI VÀ ƯU ĐÃ ===========
                </h2>
            </div>
            <div className="row justify-content-center promotion-images">
                {promotions.map((promotion, index) => (
                    <div key={index} className="col-md-3 mb-4 promotion-image">
                        <div className="card">
                            <img
                                src={promotion.imageUrl}
                                className="card-img-top"
                                alt={promotion.title}
                            />
                            <div className="card-body">
                                <p className="card-text">
                                    <FontAwesomeIcon icon={faCalendar} style={{ color: "red" }} />{" "}
                                    {promotion.date}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Promotion;
