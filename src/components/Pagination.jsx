import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  const renderPrevButton = () => {
    if (currentPage === 1) {
      return (
        <li className="page-item disabled">
          <button
            disabled
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Prev
          </button>
        </li>
      );
    } else
      return (
        <li className="page-item ">
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Prev
          </button>
        </li>
      );
  };

  const renderNextButton = () => {
    if (currentPage === pages.length) {
      return (
        <li className="page-item disabled">
          <button
            disabled
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      );
    } else
      return (
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      );
  };

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        {renderPrevButton()}
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button onClick={() => onPageChange(page)} className="page-link">
              {page}
            </button>
          </li>
        ))}
        {renderNextButton()}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
