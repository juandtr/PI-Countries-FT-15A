import {
  GET_ACTIVITIES,
  GET_COUNTRIES,
  GET_COUNTRY_DETAIL,
  SET_ASC_DES,
  SET_ORDER,
} from "../actions/actions.js";

const initialState = {
  countries: [],
  countryDetail: {},
  activities: [],
  ord: null,
  asc: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    case GET_COUNTRY_DETAIL: {
      return {
        ...state,
        countryDetail: action.payload,
      };
    }
    case GET_ACTIVITIES: {
      return {
        ...state,
        activities: action.payload,
      };
    }
    case SET_ORDER: {
      return {
        ...state,
        ord: action.payload,
      };
    }
    case SET_ASC_DES: {
      return {
        ...state,
        asc: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
