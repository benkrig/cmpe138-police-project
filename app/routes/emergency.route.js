import { emergencyService } from "../services/emergency.service";

const init = router => {
  router.route("/emergency").post(createEmergency);

  router.route("/emergency").get(getEmergencies);
  
  router.route("/emergency-search").get(searchEmergency);

  router.route("/emergency-assign-lead").post(assignLead);

  router.route("/emergency-resolve").post(resolveEmergency);
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
const assignLead = async (req, res) => {
  const params = {
    leadResponder: req.body.leadResponder,
    emergencyId: req.body.emergencyId
  };
  const {data, status} = await emergencyService.assignLead(params);
  res.status(status).send(data);
};

const searchEmergency = async (req, res) => {
    const params = {
     desired_search: req.query.desired_search
    };
  const {data, status} = await emergencyService.searchEmergency(params);
  res.status(status).send(data);
};

export const EmergencyRoute = {
  init: init
};
