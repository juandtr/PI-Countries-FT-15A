import React, { useEffect, useState } from "react";
import {
  getActivities,
  getCountries,
  setAscDes,
  setOrder,
} from "../../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../../img/search.png";

function SearchForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState(null); // input tipo texto
  const [continent, setContinent] = useState(null); // select
  const [order, setOrd] = useState(null); // select
  const [asc, setAsc] = useState(true); //select
  const [activity, setActivity] = useState(null); // select
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getCountries(name, continent, activity));
    dispatch(getActivities());
  }, [name, continent, activity]);
  
  useEffect(() => {
    dispatch(setOrder(order));
    dispatch(setAscDes(asc));
  }, [order, asc])

  function handleNameChange(event) {
    let name = event.target.value;
    setName(name);
  }
  function handleContinentChange(event) {
    let cont = event.target.value;
    setContinent(cont === "Continent" ? null : cont);
  }

  function handleActivityChange(event) {
    let act = event.target.value;
    setActivity(act === "Activity" ? null : act);
  }

  function handleSortChange(event) {
    let sort = event.target.value;
    setOrd(sort === "---" ? null : sort);
  }

  function handleOrdChange(event) {
    setAsc(event.target.value === "true" ? true : false);
  }

  return (
    <StyledForm onSubmit={(e) => e.preventDefault()}>
      <div className="filters">
        <span>Filters </span>
        <select onChange={(e) => handleContinentChange(e)}>
          <option>Continent</option>
          <option>Americas</option>
          <option>Europe</option>
          <option>Oceania</option>
          <option>Asia</option>
          <option>Africa</option>
        </select>
        <select onChange={(e) => handleActivityChange(e)}>
          <option>Activity</option>
          {activities
            ? activities.map((el) => {
                return <option>{el.name}</option>;
              })
            : ""}
        </select>
      </div>
      <div className="input-cont">
        <img src={Search} />
        <input
          placeholder="Search by name..."
          autoComplete="off"
          value={name}
          type="text"
          onChange={(e) => handleNameChange(e)}
        ></input>
      </div>
      <div>
        <span>Order by: </span>
        <select onChange={(e) => handleSortChange(e)}>
          <option>---</option>
          <option>Name</option>
          <option>Population</option>
          <option>Area</option>
        </select>
        <select onChange={(e) => handleOrdChange(e)}>
          <option value={true}>Asc</option>
          <option value={false}>Des</option>
        </select>
      </div>
    </StyledForm>
  );
}

export default SearchForm;
