import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ onPageChange }) => {
  return (
    <ReactPaginate
      className={styles.root}
      nextLabel=">"
      breakLabel="..."
      previousLabel="<"
      onPageChange={e => onPageChange(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={10}
      renderOnZeroPageCount={true}
    />
  );
};

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
