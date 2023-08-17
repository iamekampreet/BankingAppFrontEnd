export const getAccountLabel = (account) => {
  return account === 0
    ? `CHECKING`
    : account === 1
    ? `SAVING`
    : `Unknown Account Label`;
};

export const getCardLabel = (card) => {
  return card === 0 ? "DEBIT" : card === 1 ? "CREDIT" : "Unknown Card Label";
};

export const getFrequencyLabel = (frequency) => {
  return frequency === 0
    ? `Once`
    : frequency === 1
    ? `Weekly`
    : frequency === 2
    ? `Monthly`
    : `Unknown Frequency`;
};

export const saveUserAndTokenToStorage = ({ user, token }) => {
  console.log("Saving token to storage = ", token);
  sessionStorage.setItem("user", JSON.stringify(user));
  sessionStorage.setItem("token", token);
};

export const getUserAndTokenFromStorage = () => {
  console.log("Fetching user info form storage");
  return {
    user: JSON.parse(sessionStorage.getItem("user")),
    token: sessionStorage.getItem("token"),
  };
};

export const updateUserInStorage = (user) => {
  console.log("Updating user in Storage", user.accounts);
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const clearUserAndTokenFromStorage = () => {
  sessionStorage.clear();
};
