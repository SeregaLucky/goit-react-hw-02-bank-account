/* eslint-disable */
export const saveLocalStorage = (key, value) => {
  try {
    localStorage.setItem(`${key}`, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

export const getLocalStorage = key => {
  try {
    const transactions = localStorage.getItem(`${key}`);

    return transactions ? JSON.parse(transactions) : null;
  } catch (err) {
    console.log(err);
  }
};
