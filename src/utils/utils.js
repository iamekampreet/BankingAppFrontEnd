export const getAccountLabel = (account) => {
  return account === 0
    ? `SAVING`
    : account === 1
    ? `CHECKING`
    : `Unknown Account Label`;
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
