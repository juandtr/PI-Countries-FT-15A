import React, { useEffect, useState } from "react";
import { getActivities, getCountries } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Countries from "./Countries/Countries";
import Pagination from "./Pagination/Pagination";
import LoadingCountries from "./LoadingHome/LoadingHome";
import SearchForm from "./SearchForm/SearchForm";
import ScrollToTop from "./ScrollToTop/ScrollToTop";
import LoadingDetail from "../detail/LoadingDetail/LoadingDetail";

export function Home() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const order = useSelector((state) => state.ord);
  const asc = useSelector((state) => state.asc);

  const [loading, setLoading] = useState(true);
  // Paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(12);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries =
    countries.length > 0
      ? sorted(countries).slice(indexOfFirstCountry, indexOfLastCountry)
      : [];

  useEffect(async () => {
    await dispatch(getCountries());
    dispatch(getActivities());
    setLoading(false);
  }, []);

  function sorted(array) {
    if (order) {
      let ord = order.toLowerCase();
      return array.sort(function (a, b) {
        if (a[ord] > b[ord]) {
          return asc ? 1 : -1;
        }
        if (a[ord] < b[ord]) {
          return asc ? -1 : 1;
        }
        return 0;
      });
    }
    return array;
  }

  function renderPage(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <StyledHome>
      <SearchForm />
      {loading ? (
        <div className="loaders">
          <LoadingDetail />
          <LoadingCountries countriesPerPage={countriesPerPage} />
        </div>
      ) : (
        <div className="resultsContainer">
          <Countries countries={currentCountries} />
          <ScrollToTop />
          <Pagination
            countriesPerPage={countriesPerPage}
            totalCountries={countries.length}
            paginate={renderPage}
          />
        </div>
      )}
    </StyledHome>
  );
}
export default Home;
