import mondaySdk from "monday-sdk-js";
import { token } from "./token";

const monday = mondaySdk();
monday.setToken(token);

export const getUserName = () => {
  return monday.api(`query { users { id, name } }`)
    .then((res) => {
      return res.data.users[0].name;
    })
    .catch((error) => {
      console.error("Error fetching user name:", error);
      throw error;
    });
};
