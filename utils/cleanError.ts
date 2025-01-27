const cleanError = (err = "") => {
  return err.toString().split(":").slice(1).join(": ");
};

export default cleanError;
