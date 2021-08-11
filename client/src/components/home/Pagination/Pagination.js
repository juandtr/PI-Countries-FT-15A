import React from "react";


function Pagination({ countriesPerPage, totalCountries, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    i < 10 ? pageNumbers.push("0" + i) : pageNumbers.push(i);
  }

  return (
    <StyledNav>
      {pageNumbers &&
        pageNumbers.map((el) => {
          return <button onClick={() => paginate(el)}>{el}</button>;
        })}
    </StyledNav>
  );
}

export default Pagination;
