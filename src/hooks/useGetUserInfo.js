export const useGetUserInfo = () => {
  const { email, userID, isAuth } =
    JSON.parse(localStorage.getItem("auth")) || {};
  return { email, userID, isAuth };
};
