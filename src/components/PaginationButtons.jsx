import React from 'react';

export const PaginationButtons = ({ currentPage, pages, setCurrentPage }) => {
   

    return (
        <div>
            {[...Array(pages)].map((item, i) => {
                const pageNumber = i + 1;
                const isActive = pageNumber === currentPage;

                return (
                    <button
                        key={i}
                        className={`btn btn-dark my-3 mx-1 ${isActive ? 'bg-danger' : ''}`}
                        onClick={() => {
                            setCurrentPage(pageNumber);
                        }}
                    >
                        {pageNumber}
                    </button>
                );
            })}
        </div>
    );
};
