import { emergencyModel } from "../models/emergency/emergency-model.js";

const createEmergency = async params => {
  try {
    const rows = await emergencyModel.createEmergency(params);

    return {
      status: 200,
      data: {
        emergency: {
          emergencyId: rows.insertId,
          ...rows[0]
        },
        message: "Emergency created!"
      }
    };
  } catch (e) {
    console.log("emergency.service createEmergency", e);
    return { status: 500, error: "there was a problem" };
  }
};

const getEmergencies = async () => {
  try {
    const rows = await emergencyModel.getEmergencies();

    return {
      status: 200,
      data: {
        emergencies: rows.map(row => {
          return {
            emergency_id: row.emergency_id,
            status: row.status,
            zipcode: row.zipcode,
            started_at: row.started_at,
            ended_at: row.ended_at,
            lead_responder: {
              e_id: row.lead_responder,
              fname: row.fname,
              lname: row.lname
            }
          };
        })
      }
    };
  } catch (e) {
    console.log("emergency.service getEmergencies", e);
    return { status: 500, error: e.toString() };
  }
};

const resolveEmergency = async params => {
  try {
    const res = await emergencyModel.resolveEmergency(params);
    console.log(res);
    return {
      status: 200,
      data: {
        emergency_id: params.emergency_id,
        message: "Emergency resolved!"
      }
    };
  } catch (e) {
    console.log("emergency.service resolveEmergency", e);
    return { status: 500, error: e.toString() };
  }
};
const assignLead = async (params) => {
  try {
    return await emergencyModel.assignLead(params);
  } catch (e) {
    return { status: 500, error: "there was a problem" };
  }
};
export const emergencyService = {
  createEmergency: createEmergency,
  getEmergencies: getEmergencies,
  resolveEmergency: resolveEmergency,
  assignLead: assignLead
};
