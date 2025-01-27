export const addCountryCode = (phoneNumber) => {
  if (!phoneNumber) {
    return "";
  }
  return phoneNumber.slice(0, 2) === "+1" ? phoneNumber : `+1${phoneNumber}`;
};
