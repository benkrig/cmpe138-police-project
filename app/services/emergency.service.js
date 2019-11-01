import { emergencyModel } from "../models/emergency/emergency-model.js";

const createEmergency = async (params) => await emergencyModel.createEmergency(params);


export const emergencyService = {
  createEmergency: createEmergency,
};
