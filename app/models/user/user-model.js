import { getUserByIdQuery } from "./query";
import { db } from "../../../config/database";
import { dbFunc } from "../../../config/db-function";

const getUserById = async (id) => {
  try {
    const { rows } = await db.query(getUserByIdQuery(id));
    return rows;
  } catch (e) {
    console.log(e.toString());
    throw e;
  } finally {
    dbFunc.connectionRelease();
  }
};

export const userModel = {
  getUserById: getUserById,
};

