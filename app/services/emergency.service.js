import { emergencyModel } from "../models/emergency/emergency-model.js";

const createEmergency = async (params) => {
  try {
    const rows = await emergencyModel.createEmergency(params);

    return {
      status: 200,
      data: {
        emergency: {
          emergencyId: rows.insertId,
          ...rows[0],
        },
        message: "Emergency created!",
      },
    };
  } catch (e) {
    return { status: 500, error: "there was a problem" };
  }
};


export const emergencyService = {
  createEmergency: createEmergency,
};
