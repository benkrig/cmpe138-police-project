// SJSU CMPE 138Fall2019 TEAM13import { ApiConfig } from "./config/api-config";

import { emergencyService } from "../services/emergency.service";

const init = router => {
  router.route("/emergency").post(createEmergency);

  router.route("/emergency").get(getEmergencies);
  router.route("/emergency-detail").get(getEmergency);

  router.route("/emergency-search").get(searchEmergency);

  router.route("/emergency-assign-lead").post(assignLead);
  router.route("/emergency-assign-responder").post(assignResponder);

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

const getEmergencies = async (req, res) => {
  const params = {
    eid: req.query.eid
  };
  const { data, status } = await emergencyService.getEmergencies(params);
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
  const { data, status } = await emergencyService.assignLead(params);
  res.status(status).send(data);
};

const assignResponder = async (req, res) => {
  const params = {
    responder: req.body.responder,
    emergencyId: req.body.emergencyId
  };
  const { data, status } = await emergencyService.assignResponder(params);
  res.status(status).send(data);
};

const searchEmergency = async (req, res) => {
  const params = {
    desired_search: req.query.desired_search,
    eid: req.query.eid
  };
  const { data, status } = await emergencyService.searchEmergency(params);
  res.status(status).send(data);
};

const getEmergency = async (req, res) => {
  const params = {
    eid: req.query.eid
  };
  const { data, status } = await emergencyService.getEmergency(params);
  res.status(status).send(data);
};

export const EmergencyRoute = {
  init: init
};
