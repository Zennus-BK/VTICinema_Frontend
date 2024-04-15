import React from "react";
import "../styles/filmsystem.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Biến trạng thái cho việc tìm kiếm
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedReleaseDate, setSelectedReleaseDate] = useState("");

  const [showPopup, setShowPopup] = useState(false); // State để kiểm soát việc hiển thị popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  //const [showFailurePopup, setShowFailurePopup] = useState(false);

  // create film
  const [newFilm, setNewFilm] = useState({
    name: "",
    description: "",
    releaseDate: "",
    actor: "",
    director: "",
    runtime: "",
    age: "",
    image: "",
    countryName: "",
    genreName: "",
  });

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/film/all/get-all?page=${currentPage}`
        );
        setFilms(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };

    fetchFilms();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Trích xuất các giá trị countryName, genreName, releaseDate từ dữ liệu API
  const countryNames = films.map((film) => film.countryName);
  const genreNames = films.map((film) => film.genreName);
  const releaseDates = films.map((film) => film.releaseDate);

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
    setIsSearching(true); // Khi bắt đầu tìm kiếm, đặt biến trạng thái tìm kiếm thành true
  };

  // Danh sách phim sẽ được lọc dựa trên trạng thái tìm kiếm
  // const filteredFilms = isSearching
  //   ? films.filter((film) =>
  //       film.name.toLowerCase().includes(searchKeyword.toLowerCase())
  //     )
  //   : films;

  //tìm kiếm theo dropdown

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setIsSearching(true);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setIsSearching(true);
  };

  const handleReleaseDateChange = (date) => {
    setSelectedReleaseDate(date);
    setIsSearching(true);
  };

  const clearFilters = () => {
    setSelectedCountry("");
    setSelectedGenre("");
    setSelectedReleaseDate("");
    setIsSearching(false);
  };

  const filteredFilms = films.filter((film) => {
    if (
      (selectedCountry &&
        film.countryName.toLowerCase() !== selectedCountry.toLowerCase()) ||
      (selectedGenre &&
        film.genreName.toLowerCase() !== selectedGenre.toLowerCase()) ||
      (selectedReleaseDate &&
        film.releaseDate.toLowerCase() !== selectedReleaseDate.toLowerCase())
    ) {
      return false;
    }
    if (isSearching) {
      return film.name.toLowerCase().includes(searchKeyword.toLowerCase());
    }
    return true;
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewFilm({ ...newFilm, [name]: value });
  };
  // Hàm gửi yêu cầu tạo phim đến backend
  const createFilm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/film/admin/create",
        newFilm
      );
      // Nếu tạo phim thành công, hiển thị thông báo và đóng popup
      setShowSuccessPopup(true);
      setShowPopup(false);
      // Cập nhật danh sách phim
      fetchFilms();
    } catch (error) {
      // Nếu có lỗi khi tạo phim, hiển thị thông báo lỗi
      //setShowFailurePopup(true);
      console.error("Error creating film:", error);
    }
  };
  // Hàm xử lý sự kiện thay đổi giá trị trong input

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const isAdmin = true;
  return (
    <div className="fiml-body">
      <div className="film-content container d-flex justify-content-center">
        <div className="bg-white mt-3 pt-4">
          {isAdmin ? (
            <button className="create-button " onClick={togglePopup}>
              <i className="fas fa-plus"></i>
            </button>
          ) : null}
          <Modal
            show={showSuccessPopup}
            onHide={() => setShowSuccessPopup(false)}
          >
            <Modal.Header closeButton>{/* Empty header */}</Modal.Header>
            <Modal.Body className="text-center">
              <FontAwesomeIcon
                icon={faCheck}
                style={{
                  color: "green",
                  marginRight: "0.5rem",
                  fontSize: "2em",
                }}
              />
              <h3 className="success">Create Successfully</h3>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowSuccessPopup(false)}
              >
                OK
              </Button>
            </Modal.Footer>
          </Modal>
          {/* popup tạo phim thất bại */}
          {/* <Modal
          show={showFailurePopup}
          onHide={() => setShowFailurePopup(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thất bại!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Đã xảy ra lỗi khi tạo phim. Vui lòng thử lại sau.
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowFailurePopup(false)}
            >
              Đóng
            </Button>
          </Modal.Footer>
        </Modal> */}
          {/* Hiển thị popup khi state showPopup là true */}
          <Modal show={showPopup} onHide={togglePopup} className="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title>Create Phim</Modal.Title>
            </Modal.Header>
            <div class="modal-body">
              <div class="col-md-12">
                <div class="form-group d-flex align-items-center">
                  <label for="filmName" class="mr-4">
                    Tên phim:
                  </label>
                  <input
                    type="text"
                    id="filmName"
                    class="form-control flex-grow-1 flex-shrink-1"
                    name="name"
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="filmIntroduction" class="mr-2">
                    Giới thiệu phim:
                  </label>
                  <textarea
                    id="filmIntroduction"
                    class="form-control flex-grow-1 flex-shrink-1"
                    name="description"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="director" class="mr-2">
                    Đạo diễn:
                  </label>
                  <input
                    type="text"
                    id="director"
                    class="form-control flex-grow-1 flex-shrink-1"
                    name="director"
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="actors" class="mr-2">
                    Diễn viên:
                  </label>
                  <input
                    type="text"
                    id="actors"
                    class="form-control flex-grow-1 flex-shrink-1"
                    name="actor"
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="genre" class="mr-2">
                    Thể loại:
                  </label>
                  <input
                    type="text"
                    id="genre"
                    class="form-control flex-grow-1 flex-shrink-1"
                    name="genreName"
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="country" class="mr-2">
                    Quốc gia:
                  </label>
                  <input
                    type="text"
                    id="country"
                    class="form-control flex-grow-1 flex-shrink-1"
                    name="countryName"
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="duration" class="mr-2">
                    Thời lượng:
                  </label>
                  <input
                    type="text"
                    id="duration"
                    class="form-control flex-grow-1 flex-shrink-1"
                    name="runtime"
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="releaseDate" class="mr-2">
                    Ngày khởi chiếu:
                  </label>
                  <input
                    type="date"
                    id="releaseDate"
                    class="form-control flex-grow-1 flex-shrink-1"
                    name="releaseDate"
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="images" class="mr-2">
                    Images:
                  </label>
                  <input
                    type="text"
                    id="images"
                    class="form-control flex-grow-1 flex-shrink-1"
                    name="image"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <Modal.Footer>
              <Button variant="primary" onClick={createFilm}>
                Create
              </Button>
              <Button variant="secondary" onClick={togglePopup}>
                Cancle
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="">
            <h2 className=" text-center ">
              <a
                href=""
                title="Phim đang chiếu"
                className="mr-4 text-decoration-none"
              >
                Đang chiếu
              </a>
              <a
                href=""
                title="Phim sắp chiếu"
                className="text-muted ml-4 text-decoration-none"
              >
                Phim sắp chiếu
              </a>
              <a
                href=""
                title="Suất chiếu sớm"
                className="text-muted ml-4 text-decoration-none"
              >
                Suất chiếu sớm
              </a>
            </h2>
          </div>
          <div className="dropdown-input">
            {/* Dropdown cho Quốc gia */}
            <div className="dropdown">
              <button className="dropdown-toggle" id="dropdown-country">
                {selectedCountry || "Quốc gia"}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdown-country">
                {countryNames.map((country, index) => (
                  <a
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleCountryChange(country)}
                  >
                    {country}
                  </a>
                ))}
              </div>
            </div>

            {/* Dropdown cho Thể loại */}
            <div className="dropdown">
              <button className="dropdown-toggle" id="dropdown-genre">
                {selectedGenre || "Thể loại"}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdown-genre">
                {genreNames.map((genre, index) => (
                  <a
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleGenreChange(genre)}
                  >
                    {genre}
                  </a>
                ))}
              </div>
            </div>

            {/* Dropdown cho Ngày chiếu */}
            <div className="dropdown">
              <button className="dropdown-toggle" id="dropdown-release-date">
                {selectedReleaseDate || "Ngày chiếu"}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdown-release-date"
              >
                {releaseDates.map((date, index) => (
                  <a
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleReleaseDateChange(date)}
                  >
                    {date}
                  </a>
                ))}
              </div>
            </div>
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm phim"
                value={searchKeyword}
                onChange={handleSearch}
              />
              <button className="search-button" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          <div className="film-list">
            <div className="row">
              {filteredFilms.map((film) => (
                <div key={film.id} className="col-md-3 mb-4">
                  <Link to={`/film/all/${film.id}`} className="card-link">
                    <div className="card h-100 ">
                      <img
                        src={film.image}
                        className="card-img-top"
                        alt={film.name}
                        height="250px"
                      />
                      <div className="card-body">
                        <h5 className="card-title mb-0">{film.name}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <nav>
              <ul className="pagination justify-content-end">
                <li
                  className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
                >
                  <button className="page-link" onClick={handlePrevPage}>
                    Previous
                  </button>
                </li>
                <li
                  className={`page-item ${
                    currentPage === totalPages - 1 ? "disabled" : ""
                  }`}
                >
                  <button className="page-link" onClick={handleNextPage}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
