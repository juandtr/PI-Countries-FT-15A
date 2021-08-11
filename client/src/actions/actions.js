import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const SET_ORDER = "SET_ORDER";
export const SET_ASC_DES = "SET_ASC_DES";

export function getCountries(name, continent, activity) {
  let route = "countries?";
  if (name) {
    route += `name=${name}&`;
  }
  if (continent) {
    route += `continent=${continent}&`;
  }
  return async function (dispatch) {
    let result = await axios.get(route);
    dispatch({
      type: GET_COUNTRIES,
      payload: !result.data
        ? []
        : activity
        ? result.data.filter((el) =>
            el.activities.find((el) => el.name === activity)
          )
        : result.data,
    });
  };
}

export function getActivities() {
  return async function (dispatch) {
    let result = await axios.get("activities");
    dispatch({ type: GET_ACTIVITIES, payload: result.data });
  };
}

export function getCountryDetail(id) {
  return async function (dispatch) {
    let result = await axios.get(`countries/${id}`);
    dispatch({ type: GET_COUNTRY_DETAIL, payload: result.data });
  };
}

export function setOrder(ord) {
  return function (dispatch) {
    dispatch({ type: SET_ORDER, payload: ord });
  };
}

export function setAscDes(type) {
  return function (dispatch) {
    dispatch({ type: SET_ASC_DES, payload: type });
  };
}

export function addActivity(name, difficulty, duration, season, countries) {
  axios.post("activities", {
    name,
    difficulty,
    duration,
    season,
    countries,
  });
}

export function updateActivity(name, difficulty, duration, season, countries) {
  axios.put("activities", {
    name,
    difficulty,
    duration,
    season,
    countries,
  });
}
