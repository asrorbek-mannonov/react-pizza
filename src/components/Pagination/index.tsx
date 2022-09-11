import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

interface IProps {
  onPageChange: (val: number) => void;
}

function Pagination({ onPageChange }: IProps) {
  return (
    <ReactPaginate
      className={styles.root}
      nextLabel=">"
      breakLabel="..."
      previousLabel="<"
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={10}
    />
  );
}

export default Pagination;
