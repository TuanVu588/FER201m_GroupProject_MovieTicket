import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Banner from '@/components/Banner';
import axios from 'axios';

function AddNewMovie() {
  const { id } = useParams();
  const navigator = useNavigate();
  const [movieData, setMovieData] = useState({
    id: null,
    title: '',
    type: '',
    time: '',
    year: '',
    director: '',
    language: '',
    national: '',
    actors: '',
    original_title: '',
    time_show: [],
    chair_type: [],
    description: '',
  });

  const [timeShow, setTimeShow] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const addNewTimeShow = () => {
    const newTimeShow = new Date(timeShow).getTime(); 
    const movieDuration = parseInt(movieData.time, 10); 

    if (!isNaN(newTimeShow) && !isNaN(movieDuration)) {
      const minTime = newTimeShow - movieDuration * 60 * 1000;
      const maxTime = newTimeShow + movieDuration * 60 * 1000;

      const isTimeValid = movieData.time_show.every((showtime) => {
        const showtimeInMillis = new Date(showtime).getTime();
        return showtimeInMillis < minTime || showtimeInMillis > maxTime;
      });
      if (isTimeValid) {
        setMovieData({
          ...movieData,
          time_show: [...movieData.time_show, timeShow],
        });
        setTimeShow('');
        setShowModal(!showModal);
      } else {
        alert("Can't add new time show. It conflicts with existing showtimes.");
      }
    } else {
      alert('Invalid input for new time show or movie duration.');
    }
  };

  const handleSubmit = () => {
    if (id) {
      axios
        .put(`http://localhost:9999/movies/${id}`, movieData)
        .then((response) => {
          alert('Edit movie successfully');
          navigator('/admin/list-movies');
        })
        .catch((error) => {
          alert('Error submitting data', error);
        });
    } else {
      axios
        .post('http://localhost:9999/movies', movieData)
        .then((response) => {
          alert('Add movie successfully');
          navigator('/admin/list-movies');
        })
        .catch((error) => {
          alert('Error submitting data', error);
        });
    }
  };

  const removeShowTime = (index) => {
    let newShowTime = [...movieData?.time_show];
    newShowTime.splice(index, 1);
    setMovieData({ ...movieData, time_show: newShowTime });
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:9999/movies/${id}`)
        .then((response) => {
          setMovieData(response.data);
        })
        .catch((error) => {
          alert('Error submitting data', error);
        });
    }
  }, [id]);

  const ModalShowTime = showModal && (
    <div className='modal-overlay'>
      <div
        className='modal'
        tabIndex='-1'
        role='dialog'
        style={{ display: 'block' }}
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add Time Show</h5>
              <button type='button' className='close' onClick={handleShowModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Time show</label>
                <input
                  type='datetime-local'
                  className='form-control'
                  placeholder='Enter time'
                  value={timeShow}
                  onChange={(e) => setTimeShow(e.target.value)}
                />
                <small id='emailHelp' className='form-text text-muted'>
                  Time for movie show
                </small>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={handleShowModal}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-info'
                onClick={addNewTimeShow}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Banner title={id ? 'Edit Movie' : 'Add New Movie'} />
      {ModalShowTime}
      <div
        className='card shadow-lg border-0 rounded-lg mt-5 mb-5'
        style={{
          width: '600px',
          margin: '0 auto',
          boxShadow: '0 0px 3rem rgba(0,0,0,.175)',
        }}
      >
        <div className='card-header justify-content-center'>
          <h3 className='fw-light my-4'>{id ? 'Edit Movie' : 'Add movie'}</h3>
        </div>
        <div className='card-body'>
          <form>
            <div className='mb-3'>
              <label className='small mb-1' htmlFor='inputEmailAddress'>
                Name
              </label>
              <input
                className='form-control'
                id='inputLastName'
                type='text'
                placeholder='Enter last name'
                value={movieData?.title}
                onChange={(e) =>
                  setMovieData({ ...movieData, title: e.target.value })
                }
              />
            </div>
            <div className='mb-3'>
              <label className='small mb-1' htmlFor='inputEmailAddress'>
                Original Name
              </label>
              <input
                className='form-control'
                id='inputLastName'
                type='text'
                placeholder='Enter last name'
                value={movieData?.original_title}
                onChange={(e) =>
                  setMovieData({ ...movieData, original_title: e.target.value })
                }
              />
            </div>

            <div className='row gx-3'>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label
                    className='small mb-1'
                    htmlFor='inputFirstName'
                    value={movieData?.type}
                    onChange={(e) =>
                      setMovieData({
                        ...movieData,
                        type: e.target.value,
                      })
                    }
                  >
                    Type
                  </label>
                  <select className='custom-select'>
                    <option defaultValue>Open this select menu</option>
                    <option value='Tình cảm'>Tình cảm</option>
                    <option value='Hàng động'>Hàng động</option>
                    <option value='Khoa học viễn tưởng'>
                      Khoa học viễn tưởng
                    </option>
                  </select>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='inputLastName'>
                    Time
                  </label>
                  <input
                    className='form-control'
                    id='inputLastName'
                    type='number'
                    placeholder='Enter last name'
                    value={movieData?.time}
                    onChange={(e) =>
                      setMovieData({
                        ...movieData,
                        time: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className='mb-3'>
              <label className='small mb-1' htmlFor='inputEmailAddress'>
                Showtime
              </label>
              <div className='card'>
                <div className='card-body'>
                  {movieData?.time_show?.map((item, index) => (
                    <button
                      className={'btn btn-info m-2'}
                      key={index}
                      type='button'
                      onClick={() => removeShowTime(index)}
                    >
                      {item}
                    </button>
                  ))}
                  <button
                    type='button'
                    className={'btn btn-info m-2'}
                    onClick={() => handleShowModal('time')}
                  >
                    Add new Show time
                  </button>
                </div>
              </div>
            </div>

            <div className='mb-3'>
              <label className='small mb-1' htmlFor='inputEmailAddress'>
                Chair type
              </label>
              <div className='card'>
                <div className='card-body'>
                  <div className='row gx-3'>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='small mb-1' htmlFor='inputFirstName'>
                          Chair Type
                        </label>
                        <input
                          className='form-control'
                          id='inputLastName'
                          type='text'
                          value={'Vip'}
                          readOnly={true}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='small mb-1' htmlFor='inputLastName'>
                          Price
                        </label>
                        <input
                          className='form-control'
                          id='inputLastName'
                          type='text'
                          value={movieData?.chair_type[0]?.price}
                          onChange={(e) => {
                            let newChairType = [...movieData?.chair_type];
                            newChairType[0] = {
                              type: 'Vip',
                              price: e.target.value,
                            };
                            setMovieData({
                              ...movieData,
                              chair_type: newChairType,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row gx-3'>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='small mb-1' htmlFor='inputFirstName'>
                          Chair Type
                        </label>
                        <input
                          className='form-control'
                          id='inputLastName'
                          type='text'
                          value={'Standard'}
                          readOnly={true}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='small mb-1' htmlFor='inputLastName'>
                          Price
                        </label>
                        <input
                          className='form-control'
                          id='inputLastName'
                          type='text'
                          value={movieData?.chair_type[1]?.price}
                          onChange={(e) => {
                            let newChairType = [...movieData?.chair_type];
                            newChairType[1] = {
                              type: 'Standard',
                              price: e.target.value,
                            };
                            setMovieData({
                              ...movieData,
                              chair_type: newChairType,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row gx-3'>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='inputFirstName'>
                    Language
                  </label>
                  <select
                    className='custom-select'
                    value={movieData?.language}
                    onChange={(e) =>
                      setMovieData({
                        ...movieData,
                        language: e.target.value,
                      })
                    }
                  >
                    <option defaultValue>Open this select menu</option>
                    <option value='VietNam'>VietNam</option>
                    <option value='China'>China</option>
                    <option value='English'>English</option>
                  </select>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='inputLastName'>
                    National
                  </label>
                  <select
                    className='custom-select'
                    value={movieData?.national}
                    onChange={(e) =>
                      setMovieData({
                        ...movieData,
                        national: e.target.value,
                      })
                    }
                  >
                    <option defaultValue>Open this select menu</option>
                    <option value='VietNam'>VietNam</option>
                    <option value='China'>China</option>
                    <option value='English'>English</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='row gx-3'>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='inputFirstName'>
                    Director
                  </label>
                  <input
                    className='form-control'
                    id='inputLastName'
                    type='text'
                    placeholder='Enter director name'
                    value={movieData?.director}
                    onChange={(e) =>
                      setMovieData({
                        ...movieData,
                        director: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='inputLastName'>
                    Actor
                  </label>
                  <input
                    className='form-control'
                    id='inputLastName'
                    type='text'
                    placeholder='Enter actor name'
                    value={movieData?.actors}
                    onChange={(e) =>
                      setMovieData({
                        ...movieData,
                        actors: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className='mb-3'>
              <label className='small mb-1' htmlFor='inputEmailAddress'>
                Description
              </label>
              <textarea
                className='form-control'
                id='inputPhone'
                type='text'
                aria-describedby='emailHelp'
                placeholder='Enter address'
                value={movieData?.description}
                onChange={(e) =>
                  setMovieData({
                    ...movieData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <button
              className='btn btn-info btn-block'
              type='button'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddNewMovie;
