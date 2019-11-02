import { emergencyModel } from "../models/emergency/emergency-model.js";

const createEmergency = async (params) => {
  try {
    return await emergencyModel.createEmergency(params);
  } catch (e) {
    return { status: 500, error: "there was a problem" };
  }
};


export const emergencyService = {
  createEmergency: createEmergency,
};
