import React from 'react';
import styles from './Search.module.scss';
import SearchContext from '../../context/SearchContext';
import { MdClear } from 'react-icons/md';

const Search = props => {
  const { searchValue, setSearchValue } =
    React.useContext(SearchContext);
  
  const inputRef = React.useRef(null);
  const handleInputClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 489.713 489.713"
        style={{ enableBackground: 'new 0 0 489.713 489.713' }}
        xmlSpace="preserve"
      >
        <g>
          <path
            d="M483.4,454.444l-121.3-121.4c28.7-35.2,46-80,46-128.9c0-112.5-91.5-204.1-204.1-204.1S0,91.644,0,204.144
		s91.5,204,204.1,204c48.8,0,93.7-17.3,128.9-46l121.3,121.3c8.3,8.3,20.9,8.3,29.2,0S491.8,462.744,483.4,454.444z M40.7,204.144
		c0-90.1,73.2-163.3,163.3-163.3s163.4,73.3,163.4,163.4s-73.3,163.4-163.4,163.4S40.7,294.244,40.7,204.144z"
          />
        </g>
      </svg>
      <input
        ref={inputRef}
        {...props}
        placeholder="Поиск ..."
        className={styles.input}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <MdClear
          onClick={handleInputClear}
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '10px',
            color: 'rgba(0, 0, 0, 0.7)',
            cursor: 'pointer'
          }}
        />
      )}
    </div>
  );
};

export default Search;
