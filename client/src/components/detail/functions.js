export function formatPopulation(number) {
  if (number >= 1000000) {
    return Math.round(number / 10000) / 100 + "M habitants";
  } else if (number >= 1000) {
    return Math.round(number / 10) / 100 + "K habitants";
  } else {
    return number + " habitants";
  }
}

export function formatArea(number) {
  if (number >= 1000000) {
    return Math.round(number / 10000) / 100 + " millon km²";
  } else if (number >= 1000) {
    return Math.round(number) / 1000 + " km²";
  } else if (!number) {
    return "Not specified";
  } else {
    return Math.round(number) + " km²";
  }
}
