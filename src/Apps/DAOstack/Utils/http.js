export const getDAOStackAccounts = async () => {
  const accounts = await fetch('https://daostack-alchemy.herokuapp.com/api/accounts');
  return await accounts.json();
};
