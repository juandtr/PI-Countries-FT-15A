import React, { useEffect } from "react";
import { getCountryDetail, getCountries } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Activity from "./Activity/Activity";
import { formatArea, formatPopulation } from "./functions";
import Loading from "./LoadingDetail/LoadingDetail";
import Population from "../../img/population.png";
import Area from "../../img/area.png";
import Location from "../../img/location.png";
import Language from "../../img/language.png";

function Country(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const country = useSelector((state) => state.countryDetail);
  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, []);

  return (
    <StyledDiv>
      {country && country.id !== id ? (
        <Loading />
      ) : (
        <div className="detailContainer">
          <div className="country">
            <h1>
              {country.name && country.name.split("(")[0]} ({country.id})
            </h1>
            <div className="midCard">
              <div className="infoDiv">
                {country.capital ? <h2>Capital: {country.capital}</h2> : null}
                {country.continent ? (
                  <div className="iconedDiv">
                    <img src={Location} height="15" width="15" />
                    <h4>
                      {country.continent}{" "}
                      {country.subregion ? "/ " + country.subregion : ""}
                    </h4>
                  </div>
                ) : null}
                <div className="iconedDiv">
                  <img src={Language} height="15" width="15" />
                  <h4>Main language: {country.language}</h4>
                </div>
              </div>
              <div className="infoDiv">
                {country.name !== country.nativename ? (
                  <h2>Native name: {country.nativename}</h2>
                ) : (
                  <h2></h2>
                )}
                <div>
                  <div className="iconedDiv">
                    <img src={Population} height="15" width="15" />
                    <h4>Population: {formatPopulation(country.population)}</h4>
                  </div>
                </div>
                <div className="iconedDiv">
                  <img src={Area} height="15" width="15" />
                  <h4>Area: {formatArea(country.area)}</h4>
                </div>
              </div>
              <img src={country.flag} className="detailedFlag" />
            </div>
          </div>

          <div className="activitiesContainer">
            <ul className="activities">
              {country.activities && country.activities.length > 0
                ? country.activities.map((el) => (
                    <Activity
                      name={el.name}
                      duration={el.duration}
                      season={el.season}
                      difficulty={el.difficulty}
                    />
                  ))
                : null}
            </ul>
          </div>
        </div>
      )}
    </StyledDiv>
  );
}

export default Country;
