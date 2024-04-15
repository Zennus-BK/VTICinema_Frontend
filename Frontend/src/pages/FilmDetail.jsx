import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams từ react-router-dom
import {
  faThumbsUp,
  faCalendarAlt,
  faClock,
  faUser,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/filmdetail.css";
import { Modal, Button, Form, Alert } from "react-bootstrap"; // Import Form từ react-bootstrap
const FilmDetail = () => {
  const { id } = useParams(); // Trích xuất id từ đường dẫn URL bằng useParams
  const [film, setFilm] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [updatedFilm, setUpdatedFilm] = useState({
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
    const fetchFilm = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/film/all/${id}`
        ); // Sử dụng id trích xuất từ useParams
        setFilm(response.data);
      } catch (error) {
        console.error("Error fetching film:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/review/all/get-all"
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchFilm();
    fetchReviews();
  }, [id]); // Đặt id vào mảng phụ thuộc của useEffect

  const handleCloseModal = () => setShowModal(false);
  const handleCloseConfirmModal = () => setShowConfirmModal(false);

  const handleOpenModal = (film) => {
    setUpdatedFilm(film);
    setShowModal(true);
  };
  const handleDeleteFilm = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/film/admin/${id}`);
      alert("Xóa phim thành công");
      // Đẩy về trang chủ sau khi xóa phim thành công
    } catch (error) {
      console.error("Error deleting film:", error);
      // alert("Xóa phim thất bại");
    } finally {
      // Ẩn popup xác nhận sau khi hoàn thành hoặc xảy ra lỗi
      setShowConfirmModal(false);
    }
  };

  const handleUpdateFilm = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/film/admin/${id}`,
        updatedFilm
      );
      handleCloseModal();
      const response = await axios.get(
        `http://localhost:8080/api/v1/film/all/${id}`
      );
      setFilm(response.data);
      alert("Cập nhật phim thành công");
    } catch (error) {
      console.error("Error updating film:", error);
      alert("Cập nhật phim thất bại");
    }
  };

  if (!film) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-content">
      <div className="bg-dark border-bottom text-white featured-movie">
        <div className="container pt-3 pb-3">
          <div className="">
            <img
              src={film.image}
              alt={film.name}
              className="img-fluid full-width"
            />
          </div>
          <div className="col-md-6">
            <h2 className="name-text">{film.name}</h2>
            <div className="button-item">
              <button type="button" className="btn btn-light  ">
                <FontAwesomeIcon icon={faHeart} />
                Thích
              </button>
              <button type="button" className="btn btn-light ">
                <FontAwesomeIcon icon={faStar} />
                Đánh giá
              </button>
              <button type="button" className="btn  btn-outline-light">
                Trailer
              </button>
              <button type="button" className="btn btn-danger btn-ticket">
                Mua vé
              </button>
            </div>
            <p className="film-content">{film.description}</p>
            <div className="row mb-3 ">
              <div className="col text-center text-sm-left text-white">
                <strong>
                  <i className="fas fa-thumbs-up "></i>
                  <span className="d-none d-sm-inline-block ">Hài lòng</span>
                </strong>
                <br />
                <span className="d-none d-sm-inline-block ">89%</span>
              </div>

              <div className="col text-center text-sm-left text-white">
                <strong>
                  <i className="fas fa-calendar "></i>
                  <span className="d-none d-sm-inline-block ">Khởi chiếu</span>
                </strong>
                <br />
                <span>{film.releaseDate}</span>
              </div>

              <div className="col text-center text-sm-left text-white">
                <strong>
                  <i className="fas fa-clock"></i>
                  <span className="d-none d-sm-inline-block">Thời lượng</span>
                </strong>
                <br />
                <span>{film.runtime} phút</span>
              </div>

              <div className="col text-center text-sm-left text-white">
                <strong>
                  <i className="fas fa-user-check"></i>
                  <span className="d-none d-sm-inline-block">
                    Giới hạn tuổi
                  </span>
                </strong>
                <br />
                <span>{film.age}</span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <p>
              <strong className="label">Diễn viên:</strong> {film.actor}
            </p>
            <p>
              <strong className="label">Đạo diễn:</strong> {film.director}
            </p>
            <div
              className="btn-group"
              role="group"
              aria-label="Film management"
            >
              <button
                type="button"
                className="btn btn-secondary btn-update"
                onClick={() => handleOpenModal(film)}
              >
                Cập nhật phim
              </button>

              <Modal
                show={showModal}
                onHide={handleCloseModal}
                className="custom-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Cập nhật phim</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group controlId="formFilmName">
                      <Form.Label>Tên phim</Form.Label>
                      <Form.Control
                        type="text"
                        value={updatedFilm.name}
                        onChange={(e) =>
                          setUpdatedFilm({
                            ...updatedFilm,
                            name: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formFilmDescription">
                      <Form.Label>Mô tả</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={updatedFilm.description}
                        onChange={(e) =>
                          setUpdatedFilm({
                            ...updatedFilm,
                            description: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formFilmActor">
                      <Form.Label>Diễn viên</Form.Label>
                      <Form.Control
                        type="text"
                        value={updatedFilm.actor}
                        onChange={(e) =>
                          setUpdatedFilm({
                            ...updatedFilm,
                            actor: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formFilmDirector">
                      <Form.Label>Đạo diễn</Form.Label>
                      <Form.Control
                        type="text"
                        value={updatedFilm.director}
                        onChange={(e) =>
                          setUpdatedFilm({
                            ...updatedFilm,
                            director: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formFilmImage">
                      <Form.Label>Link ảnh</Form.Label>
                      <Form.Control
                        type="text"
                        value={updatedFilm.image}
                        onChange={(e) =>
                          setUpdatedFilm({
                            ...updatedFilm,
                            image: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formFilmReleaseDate">
                      <Form.Label>Ngày khởi chiếu</Form.Label>
                      <Form.Control
                        type="date"
                        value={updatedFilm.releaseDate}
                        onChange={(e) =>
                          setUpdatedFilm({
                            ...updatedFilm,
                            releaseDate: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formFilmDuration">
                      <Form.Label>Thời lượng</Form.Label>
                      <Form.Control
                        type="text"
                        value={updatedFilm.runtime}
                        onChange={(e) =>
                          setUpdatedFilm({
                            ...updatedFilm,
                            runtime: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formFilmAgeLimit">
                      <Form.Label>Giới hạn tuổi</Form.Label>
                      <Form.Control
                        type="text"
                        value={updatedFilm.age}
                        onChange={(e) =>
                          setUpdatedFilm({
                            ...updatedFilm,
                            age: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formFilmCountry">
                      <Form.Label>Quốc gia</Form.Label>
                      <Form.Control
                        type="text"
                        value={updatedFilm.countryName}
                        onChange={(e) =>
                          setUpdatedFilm({
                            ...updatedFilm,
                            countryName: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formFilmGenre">
                      <Form.Label>Thể loại</Form.Label>
                      <Form.Control
                        type="text"
                        value={updatedFilm.genreName}
                        onChange={(e) =>
                          setUpdatedFilm({
                            ...updatedFilm,
                            genreName: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Đóng
                  </Button>
                  <Button variant="primary" onClick={handleUpdateFilm}>
                    Cập nhật
                  </Button>
                </Modal.Footer>
              </Modal>
              <button
                type="button"
                className="btn btn-secondary btn-delete"
                onClick={() => setShowConfirmModal(true)}
              >
                Xóa phim
              </button>
              <Modal
                show={showConfirmModal}
                onHide={handleCloseConfirmModal}
                className="custom-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Xác nhận xóa phim</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Bạn có chắc chắn muốn xóa phim "{film.name}" không?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseConfirmModal}>
                    Hủy
                  </Button>
                  <Button variant="danger" onClick={handleDeleteFilm}>
                    Xác nhận
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <ul className="horizontal-list">
              <li>
                <a href="">Thông tin phim</a>
              </li>
              <li>
                <a href="#lich-chieu">Lịch chiếu</a>
              </li>
              <li>
                <a href="#danh-gia">Đánh giá</a>
              </li>
              <li>
                <a href="#tin-tuc">Tin tức</a>
              </li>
              <li>
                <a href="#mua-ve">Mua vé</a>
              </li>
            </ul>
            <div className="review-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <FontAwesomeIcon icon={faUser} className="user-icon" />
                    <span className="user-name">{review.accountFullName}</span>
                  </div>
                  <p className="review-content">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetail;
