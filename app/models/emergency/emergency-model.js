import { createEmergency } from "./query";
import { db } from "../../../config/database";

export const emergencyModel = {
  createEmergency: async (params) => {
    try {
      const { status, leadResponder, zipCode } = params;
      console.log(createEmergency(status, leadResponder, zipCode));

      return await db.query(createEmergency(status, leadResponder, zipCode));
    } catch (e) {
      console.log(e.toString());
      throw e;
    }
  },
  getEmergencyCaseInProcessNum: async => {
    try{
      return await db.query(getEmergencyCaseInProcessNum());
    }catch(e){
      console.log(e.toString());
      throw e;
    }
  },
  getEmergencyCaseCompletedNum: async =>{
    try{
      return await db.query(getEmergencyCaseCompletedNum());
    }catch(e){
      console.log(e.toString());
      throw e;
    }
  },
};
