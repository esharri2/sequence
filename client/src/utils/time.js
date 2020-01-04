const checkIfTimestamp = input => {
  if (input.length <= 10) {
    return false;
  }
  return true;
};

export const convertToYYYYMMDD = dateString => {
  if (!checkIfTimestamp(dateString)) {
    return dateString;
  }
  const zeroPad = number => ("0" + number).slice(-2);

  const rawDate = new Date(dateString);

  //Note - getMonth returns 0 indexed value, hence +1
  const year = rawDate.getFullYear(),
    month = zeroPad(rawDate.getMonth() + 1),
    day = zeroPad(rawDate.getDate());
  const convertedValue = `${year}-${month}-${day}`;

  return convertedValue;
};

const defaultDateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric"
};

export const convertToReadableDate = dateString => {
  // TODO maybe get local?
  return new Date(dateString).toLocaleDateString(undefined, defaultDateOptions);
};

// Convert to unix time to get user's exact local time
export const convertToLocalTimestamp = dateString => {
  const unixTimeStamp = new Date(dateString).getTime();
  const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
  const localISOTime = new Date(unixTimeStamp + timeZoneOffset)
    .toISOString()
    .slice(0, -1);

  return localISOTime;
};
