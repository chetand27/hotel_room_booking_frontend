import './CommonStyle.css';
import { useState, useEffect } from 'react';

const Header = () => {
  const [user, setUser] = useState([])

  const fetchUser = () => {
    fetch('http://localhost:3001/api/v1/users')
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => {
          console.log(err.message);
      });
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <header className="sticky_header">
        <a href="#" className="navbar_brand">HotelRoomBookingSystem</a>
        <ul className="navbar-list">
          <li>
            <a href="/">Home</a>
          </li>                  
          <li>
            <a href="/bookings">Bookings</a>
          </li>
          <li>
            <a href="#">{`${user.first_name} ${user.last_name}`}</a>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
