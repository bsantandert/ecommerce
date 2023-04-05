import { ADMIN, CUSTOMER, USER_KEY } from "../constants/users.contants";

const getCurrentUser = () => {
  return localStorage.getItem(USER_KEY)
    ? localStorage.getItem(USER_KEY)
    : CUSTOMER;
};

const setCurrentUser = (user) => {
  localStorage.setItem(USER_KEY, user);
};

const isCurrentUserAdmin = () => {
  return getCurrentUser() == ADMIN;
};

export { isCurrentUserAdmin, getCurrentUser, setCurrentUser };
