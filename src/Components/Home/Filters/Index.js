import './CommonStyle.css';
import Select from 'react-select';

const filterOptions = [
  { value: -1, label: 'All' },
  { value: 0, label: 'Pune' },
  { value: 1, label: 'Mumbai' },
  { value: 2, label: 'Nashik' },
  { value: 3, label: 'Banglore' },
  { value: 4, label: 'Hydrabad' }
];

const Filters = (props) => {
  const {
    currentValue,
    onLocationChange
  } = props;

  return (
    <div className="filter">
      <h3>Filter by Location:</h3>

      <div className="select_location">
        <Select
          value={currentValue}
          options={filterOptions}
          onChange={(e) => onLocationChange(e)}
        />
      </div>
    </div>
  );
}

export default Filters;
