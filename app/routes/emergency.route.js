import { emergencyService } from "../services/emergency.service";

// Middleware

const init = (router) => {
  router.route("/emergency").post(createEmergency);
};

const createEmergency = async (req, res) => {
  // validate req
  const params = {
    status: req.body.status,
    leadResponder: req.body.leadResponder,
    zipCode: req.body.zipCode,
    startedAt: req.body.startedAt,
  };

  const { data, status } = await emergencyService.createEmergency(params);
  res.status(status).send(data);
};

export const EmergencyRoute = {
  init: init,
};


