import './CommonStyle.css';

const Header = () => {
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
              <a href="#">Chetan Dhatrak</a>
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
