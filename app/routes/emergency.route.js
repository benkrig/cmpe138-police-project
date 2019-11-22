import { emergencyService } from "../services/emergency.service";

const init = router => {
  router.route("/emergency").post(createEmergency);

  router.route("/emergency").get(getEmergencies);

  router.route("/emergency-resolve").post(resolveEmergency);

  router.route("/emergency").put(updateEmergency);
};

const createEmergency = async (req, res) => {
  const params = {
    status: req.body.status,
    leadResponder: req.body.leadResponder,
    zipCode: req.body.zipCode,
    startedAt: req.body.startedAt
  };

  const { data, status } = await emergencyService.createEmergency(params);
  res.status(status).send(data);
};

const updateEmergency = async (req, res) => {
  const params = {
    emergencyId: req.body.emergencyId,
    leadResponder: req.body.leadResponder,
    zipCode: req.body.zipCode
  };

  const { data, status } = await emergencyService.updateEmergency(params);
  res.status(status).send(data);
};

const getEmergencies = async (_, res) => {
  const { data, status } = await emergencyService.getEmergencies();
  res.status(status).send(data);
};

const resolveEmergency = async (req, res) => {
  const params = {
    emergency_id: req.body.emergencyId
  };
  const { data, status } = await emergencyService.resolveEmergency(params);
  res.status(status).send(data);
};

export const EmergencyRoute = {
  init: init
};
