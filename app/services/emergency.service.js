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

const getEmergencies = async params => {
  try {
    const rows = await emergencyModel.getEmergencies(params);

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
    return { status: 500, data: {}, error: e.toString() };
  }
};
const updateEmergency = async params => {
  try {
    const rows = await emergencyModel.updateEmergency(params);

    return {
      status: 200,
      data: {
        emergency: {
          emergencyId: params.emergencyId
        },
        message: "Emergency updated!"
      }
    };
  } catch (e) {
    console.log("emergency.service createEmergency", e);
    return { status: 500, error: "there was a problem" };
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
    return { status: 500, data: {}, error: e.toString() };
  }
};

const assignLead = async params => {
  try {
    await emergencyModel.assignLead(params);

    return {
      status: 200,
      data: {
        msg: "Lead responder assigned.",
      },
    };
  } catch (e) {
    return { status: 500, error: "there was a problem" };
  }
};

const assignResponder = async params => {
  try {
    await emergencyModel.assignResponder(params);

    return {
      status: 200,
      data: {
        msg: "Responder assigned.",
      },
    };
  } catch (e) {
    return { status: 500, data: {}, error: "there was a problem" };
  }
};

const searchEmergency = async params => {
  try {
    const rows = await emergencyModel.searchEmergency(params);

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
    console.log("emergency.service searchEmergency", e);
    return { status: 500, error: e.toString() };
  }
};

const getEmergency = async params => {
  try {
    const rows = await emergencyModel.getEmergencyResponders(params);
    console.log(rows);

    const responders = rows.map(row => ({
      fname: row.fname,
      lname: row.lname,
      zipcode: row.zipcode,
      username: row.username,
      started: row.started,
      e_id: row.e_id
    }));

    return {
      status: 200,
      data: {
        emergency: { emergency_id: params.eid,
          zipcode: rows.length ? rows[0].zipcode : "",
          started_at: rows.length ? rows[0].started_at : "",
          ended_at: rows.length ? rows[0].ended_at : "",
        },
        responders
      }
    };
  } catch (e) {
    console.log("emergency.service searchEmergency", e);
    return { status: 500, error: e.toString() };
  }
};

export const emergencyService = {
  createEmergency: createEmergency,
  getEmergencies: getEmergencies,
  resolveEmergency: resolveEmergency,
  assignLead: assignLead,
  assignResponder: assignResponder,
  searchEmergency: searchEmergency,
  updateEmergency: updateEmergency,
  getEmergency: getEmergency
};
