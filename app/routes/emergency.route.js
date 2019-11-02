import { emergencyService } from "../services/emergency.service";

// Middleware

const init = (router) => {
  router.route("/emergency")
      .post(createEmergency);
};

// TODO
const createEmergency = async (req, res) => {
  // validate req
  const data = await emergencyService.createEmergency(req.body);
  res.status(200).send(data);
};

export const EmergencyRoute = {
  init: init,
};


