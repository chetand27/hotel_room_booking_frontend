import './CommonStyle.css';
import { useState, useEffect } from 'react';
import Filters from './Filters/Index'

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [currentValue, setCurrentValue] = useState(null);

  const fetchHotels = () => {
    fetch('http://localhost:3001/api/v1/hotels')
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setHotels(data);
      })
      .catch((err) => {
          console.log(err.message);
      });
  }

  useEffect(() => {
    fetchHotels();
  }, []);

  const onLocationChange = (el) => {
    setCurrentValue(el);

    fetch(`http://localhost:3001/api/v1/hotels/search?hotel[location]=${el.value}`)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setHotels(data);
      })
      .catch((err) => {
          console.log(err.message);
      });
  }

  const onClickBookRoomBtn = (hotel_id) => {
    window.location.href += `hotels/${hotel_id}/bookings/new`
  }

  return (
    <div className="container">
      <Filters
        currentValue={currentValue}
        onLocationChange={onLocationChange}
      />

      {hotels.length === 0 && (
        <div className="no_data">
          Currently, there are no hotels for this location.
        </div>
      )}

      {hotels.map((hotel) => {
        return (
          <div key={hotel.id} className="hotel_card">
            <a href="#">
              <h3 className="hotel_name">Hotel Details</h3>
              <h4>
                <span>Name: <small>{hotel.name}</small></span><br/>
                <span>Email: <small>{hotel.email}</small></span><br/>
                <span>Phone Number: <small>{hotel.phone_number}</small></span><br/>
                <span>Stars: <small>{`${hotel.stars}*`}</small></span><br/>
                <span>Location: <small>{hotel.location}</small></span>
              </h4>
            </a>

            <a
              className="btn btn-primary"
              href="#"
              onClick={() => onClickBookRoomBtn(hotel.id)}>
                Book Rooms
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
