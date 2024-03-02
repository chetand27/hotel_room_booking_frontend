import './CommonStyle.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const navigate = useNavigate();

  const fetchBookings = () => {
    fetch('http://localhost:3001/api/v1/bookings')
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setBookings(data);
      })
      .catch((err) => {
          console.log(err.message);
      });
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = (id) => {
    fetch(`http://localhost:3001/api/v1/bookings/${id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.status === 200) {
        setBookings(
          bookings.filter((booking) => {
            return booking.id !== id;
          })
        );
      } else {
        return;
      }
    });
  }

  const updateBookingForm = (id) => {
    navigate(`/bookings/${id}/edit`)
  }

  return (
    <div className="container">
      <h2>User Bookings List</h2>

      {bookings.length === 0 && (
        <div className="no_data">
          Currently, there are no bookings for this user.
        </div>
      )}

      {bookings.map((booking) => {
        return (
          <div key={booking.id} className="booking_card">
            <a href="#">
              <h3 className="hotel_name">Booking Details</h3>
              <h4>
                <span>Booking Date: <small>{`${booking.booked_from} to ${booking.booked_upto}`}</small></span><br/>
                <span>User Name: <small>{`${booking.user.first_name} ${booking.user.last_name}`}</small></span><br/>
                <span>Phone Number: <small>{booking.user.phone_number}</small></span><br/>
                <span>Room Number: <small>{booking.room.room_number}</small></span>
              </h4>
            </a>

            <a
              className="btn btn-primary cancel_booking_btn"
              href="#"
              onClick={() => cancelBooking(booking.id)}>
                Cancel Booking
            </a>
            <a className="btn btn-primary"
               href="#"
               onClick={() => updateBookingForm(booking.id)}>Update Booking</a>
          </div>
        );
      })}
    </div>
  );
}

export default Bookings;
