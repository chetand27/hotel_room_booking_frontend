import './CommonStyle.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const RoomBookingForm = () => {
  const { hotel_id } = useParams();
  const [roomOptions, setRoomOptions] = useState([]);
  const [formDetails, setFormDetails] = useState({
    room_ids: [],
    booked_from: moment().format('YYYY-MM-DD'),
    booked_upto: moment().format('YYYY-MM-DD'),
    error: {}
  })
  const { 
    room_ids,
    booked_from,
    booked_upto,
    error
  } = formDetails;
  const navigate = useNavigate();

  const fetchRoomOptions = () => {
    fetch(`http://localhost:3001/api/v1/hotels/${hotel_id}/rooms`)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setRoomOptions(data);
      })
      .catch((err) => {
          console.log(err.message);
      });
  }

  useEffect(() => {
    fetchRoomOptions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormDetails = { ...formDetails }
    newFormDetails['room_ids'] = formDetails['room_ids'].map((obj) => obj.value);
    addBookings(newFormDetails);
  }

  const addBookings = async (params) => {
    await fetch(`http://localhost:3001/api/v1/hotels/${hotel_id}/bookings`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if (data.length > 0) {
        navigate('/bookings')
      } else {
        updateFormDetails('error', data)
      }
    })
    .catch((err) => {
      updateFormDetails('error', err)
    });
  };

  const updateFormDetails = (key, value) => {
    const newFormDetails = { ...formDetails }
    newFormDetails[key] = value
    setFormDetails(newFormDetails)
  }

  return (
    <div className="container">
      <h3>Create Rooms Booking</h3>

      {error.message && <span className="error">{`Errors: ${error.message}`}</span>}

      <form className="create_booking_form"
            onSubmit={(e) => handleSubmit(e)}>
        <label>
          Select Rooms:
        </label>
        <div className="rooms_dropdown">
          <Select
            value={room_ids}
            options={roomOptions}
            isMulti
            onChange={(value) => updateFormDetails('room_ids', value)}
          />
        </div>
        <div className="form_group mr-30">
          <label>
            Check In:
          </label>
          <div className="rooms_datepicker1">
            <DatePicker
              selected={booked_from}
              onChange={(value) => updateFormDetails('booked_from', value)}
            />
          </div>
        </div>
        <div className="form_group">
          <label>
            Check Out:
          </label>
          <div className="rooms_datepicker2">
            <DatePicker
              selected={booked_upto}
              onChange={(value) => updateFormDetails('booked_upto', value)}
            />
          </div>
        </div>
        <input className="btn btn-primary submit_bookings" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default RoomBookingForm;
