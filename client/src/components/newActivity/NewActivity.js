import React, { useEffect, useState } from "react";
import {
  getCountries,
  addActivity,
  getActivities,
  updateActivity,
} from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";

import Back from "../../img/leftArrow.png";
import Edit from "../../img/edit.png";
import Add from "../../img/add.png";
import ActivityEdit from "../detail/Activity/Activity";

function NewActivity() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  const [name, setName] = useState();
  const [difficulty, setDifficulty] = useState();
  const [duration, setDuration] = useState();
  const [season, setSeason] = useState();
  const [countriesActivities, setCountriesActivies] = useState([]);
  const [country, setCountry] = useState();

  // Edit
  const [addEdit, setAddEdit] = useState("none");
  const [activityEdit, setActivityEdit] = useState(null);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, []);

  // Add

  function handleCountry(event) {
    setCountry(countries.find((el) => el.name === event.target.value));
  }

  function handleCountryAdd(e) {
    e.preventDefault();
    if (country) {
      setCountriesActivies([...countriesActivities, country]);
    }
    setCountry();
    let input = document.getElementById("dataInput");
    input.value = "";
  }

  function handleName(event) {
    let provName = event.target.value;
    setName(provName);
  }
  function handleDuration(event) {
    setDuration(event.target.value);
  }
  function handleDifficulty(event) {
    let dif = event.target.value;
    setDifficulty(dif === "Difficulty" ? null : dif);
  }
  function handleSeason(event) {
    let seas = event.target.value;
    setSeason(seas === "Season" ? null : seas);
  }

  function removeCountry(country) {
    setCountriesActivies(countriesActivities.filter((el) => el !== country));
  }

  function handleSubmit(event) {
    if (!activityEdit) {
      if (activities.find((el) => el.name === name)) {
        event.preventDefault();
        return alert("An activity with that name already exists");
      }
      if (
        name &&
        countriesActivities.length > 0 &&
        difficulty &&
        duration &&
        season
      ) {
        addActivity(
          name,
          difficulty,
          duration,
          season,
          countriesActivities.map((el) => el.id)
        );
        alert("Tourism activity added succesfully!");
      } else {
        event.preventDefault();
        alert("You are missing something...");
      }
    } else {
      if (
        name &&
        countriesActivities.length > 0 &&
        difficulty &&
        duration &&
        season
      ) {
        updateActivity(
          name,
          difficulty,
          duration,
          season,
          countriesActivities.map((el) => el.id)
        );
        alert("Tourism activity modified succesfully!");
      } else {
        event.preventDefault();
        alert("You should complete everything...");
      }
    }
  }

  // Edit

  function handleActivityEdit(event) {
    let actEdit = event.target.value;
    setActivityEdit(
      actEdit === "null" ? null : activities.find((el) => el.name === actEdit)
    );
    setName(actEdit === "null" ? null : actEdit);
    setCountriesActivies(
      countries.filter((el) => el.activities.find((el) => el.name === actEdit))
    );
  }

  function handleBack() {
    setName();
    setDifficulty();
    setDuration();
    setSeason();
    setCountriesActivies([]);
    setAddEdit("none");
    setCountry();
    setActivityEdit();
  }

  return (
    <StyledForm>
      {addEdit === "none" ? (
        <div>
          <h1>Do you want to add or modify a tourism activity?</h1>
          <div className="addEditCnt">
            <img
              src={Add}
              height="50"
              width="50"
              onClick={() => setAddEdit("add")}
            />
            <img
              src={Edit}
              height="50"
              width="50"
              onClick={() => setAddEdit("edit")}
            />
          </div>
        </div>
      ) : addEdit === "add" ? (
        <div>
          <img
            src={Back}
            onClick={(e) => handleBack()}
            height="30"
            width="30"
            className="backImage"
          />
          <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Add activity</h1>
            <input
              type="text"
              placeholder="Name of the activity..."
              onChange={(e) => handleName(e)}
            />
            <div>
              <label>
                <input
                  type="number"
                  placeholder="Duration..."
                  onChange={(e) => handleDuration(e)}
                />
                <span className="minutes"> Minutes</span>
              </label>
              <br />
              <select onChange={(e) => handleDifficulty(e)}>
                <option>Difficulty</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <select onChange={(e) => handleSeason(e)}>
                <option>Season</option>
                <option>Summer</option>
                <option>Winter</option>
                <option>Spring</option>
                <option>Autumn</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                list="data"
                id="dataInput"
                placeholder="Select country..."
                onChange={(e) => handleCountry(e)}
              />
              <datalist id="data">
                {countries &&
                  countries
                    .filter((el) => !countriesActivities.includes(el))
                    .sort((a, b) => {
                      if (a.name > b.name) {
                        return 1;
                      }
                      if (a.name < b.name) {
                        return -1;
                      }
                      return 0;
                    })
                    .map((country) => {
                      return <option key={country.id} value={country.name} />;
                    })}
              </datalist>
              <button className="add" onClick={(e) => handleCountryAdd(e)}>
                +
              </button>
            </div>
            <br />
            <div className="countriesCnt">
              {countriesActivities &&
                countriesActivities
                  .sort((a, b) => {
                    if (a.name > b.name) {
                      return 1;
                    }
                    if (a.name < b.name) {
                      return -1;
                    }
                    return 0;
                  })
                  .map((el) => {
                    return (
                      <div className="countryDiv">
                        <span>{el.name} |</span>
                        <button
                          type="button"
                          className="removeBtn"
                          onClick={() => removeCountry(el)}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
            </div>
            <button className="submitBtn" type="submit">
              Add Activity
            </button>
          </form>
        </div>
      ) : (
        //edit
        <div>
          <img
            src={Back}
            onClick={(e) => handleBack()}
            height="30"
            width="30"
            className="backImage"
          />
          <div className="cardContainer">
            <form onSubmit={(e) => handleSubmit(e)}>
              <h1>Modify Activity</h1>
              <br />
              <select onChange={(e) => handleActivityEdit(e)}>
                <option value={null}>Select activity...</option>
                {activities &&
                  activities.map((el) => {
                    return <option key={el.id}>{el.name}</option>;
                  })}
              </select>
              <div>
                <label>
                  <input
                    type="number"
                    placeholder="Duration..."
                    onChange={(e) => handleDuration(e)}
                  />
                  <span className="minutes"> Minutes </span>
                </label>
                <br />

                <select onChange={(e) => handleDifficulty(e)}>
                  <option>Difficulty</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <select onChange={(e) => handleSeason(e)}>
                  <option>Season</option>
                  <option>Summer</option>
                  <option>Winter</option>
                  <option>Spring</option>
                  <option>Autumn</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  list="data"
                  id="dataInput"
                  placeholder="Select country..."
                  onChange={(e) => handleCountry(e)}
                />
                <datalist id="data">
                  {countries &&
                    countries
                      .filter((el) => !countriesActivities.includes(el))
                      .sort((a, b) => {
                        if (a.name > b.name) {
                          return 1;
                        }
                        if (a.name < b.name) {
                          return -1;
                        }
                        return 0;
                      })
                      .map((country) => {
                        return <option key={country.id} value={country.name} />;
                      })}
                </datalist>
                <button className="add" onClick={(e) => handleCountryAdd(e)}>
                  +
                </button>
              </div>
              <br />
              <div className="countriesCnt">
                {countriesActivities &&
                  countriesActivities
                    .sort((a, b) => {
                      if (a.name > b.name) {
                        return 1;
                      }
                      if (a.name < b.name) {
                        return -1;
                      }
                      return 0;
                    })
                    .map((el) => {
                      return (
                        <div className="countryDiv">
                          <span>{el.name} |</span>
                          <button
                            type="button"
                            className="removeBtn"
                            onClick={() => removeCountry(el)}
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
              </div>
              <button className="submitBtn" type="submit">
                Edit Activity
              </button>
            </form>
            {activityEdit ? (
              <ActivityEdit
                name={activityEdit.name}
                duration={activityEdit.duration}
                season={activityEdit.season}
                difficulty={activityEdit.difficulty}
                edit={true}
              />
            ) : null}
          </div>
        </div>
      )}
    </StyledForm>
  );
}

export default NewActivity;
