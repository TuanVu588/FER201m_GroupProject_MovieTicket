import { useLocation, useNavigate } from 'react-router-dom';
import Banner from '@/components/Banner';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ListMovie() {
  const [movieDatas, setMovieDatas] = useState([]);
  const navigator = useNavigate();
  const location = useLocation();
  const handleMovieDetail = (id) => {
    navigator(`/movie/${id}`);
  };

  const handleEditMovieDetail = (id) => {
    navigator(`/admin/edit-movie/${id}`);
  };

  const handleAddNewMovie = () => {
    navigator('/admin/add-movie');
  };

  useEffect(() => {
    axios
      .get('http://localhost:9999/movies')
      .then((response) => {
        setMovieDatas(response.data);
      })
      .catch((error) => {
        alert('Error submitting data', error);
      });
  }, []);

  const MovieItem = movieDatas?.map((movie, index) => (
    <div
      className='mb-4 d-flex justify-content-center'
      style={{ width: '20%', textAlign: 'center' }}
      key={index}
    >
      <div className='card' style={{ width: '18rem' }}>
        <img
          className='card-img-top'
          src='https://s3-alpha-sig.figma.com/img/02b6/6392/92966dcb4fe595c235bb46b6fff6c95f?Expires=1698624000&Signature=ZzfiaqWo8ry846EAFrK2EXMpvviXUuoGcbrAiszacBjlRAMtV3TjBI1QBCLLgSHtz88Sy7DeST5rjYlY9p0a4avkvoHwqujLWJVTiYAB-c2H2LKMAw1QYx6TWPx57zfyL2-XM8X6mkLH1fyn9fA~lh1xWzNv5bj0wxuPmyQuyVIQ7~n3RZg6OKxHixmks3-W9LQ4qyfF991owOPQgopW4jays74JHyFbbtnWvUXBoZr~~-d8bxbPHEP9CKymFZ79sFIDJaBHrg1~Emsl0HfzyFYUVJtsL0iSm9F-M-7H2WU0AownUYO-JKz2DQiLgRpZQbVOqvhUd8MYWR4JmUmVbQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
          alt='banner movie'
        />
        <div className='card-body'>
          <h5 className='card-title'>{movie.title}</h5>
          <p className='card-text'>Thể loại: {movie.type}</p>
          <p className='card-text'>Thời gian: {movie.time} phút</p>

          {location?.pathname.includes('/admin/') ? (
            <button
              className='btn btn-info'
              onClick={() => handleEditMovieDetail(movie.id)}
            >
              Chỉnh sửa thông tin
            </button>
          ) : (
            <button
              className='btn btn-info'
              onClick={() => handleMovieDetail(movie.id)}
            >
              Xem thông tin
            </button>
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <Banner title={'List Movies'} />
      <div className='pl-5 pr-5 pt-4 pb-4'>
        {location?.pathname.includes('/admin/') && (
          <div className='d-flex align-items-center flex-wrap justify-content-end'>
            <button
              className='btn btn-info mb-4'
              style={{ marginRight: '2%' }}
              onClick={handleAddNewMovie}
            >
              Add new movie
            </button>
          </div>
        )}
        <div className='d-flex align-items-center flex-wrap'>{MovieItem}</div>
      </div>
    </>
  );
}

export default ListMovie;
