export const getDAOStackAccounts = async () => {
  const accounts = await fetch('https://daostack-alchemy.herokuapp.com/api/accounts')
  const filterAccounts = await accounts.json()
  return filterAccounts
}
