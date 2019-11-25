import { emergencyNoteService } from "../services/emergency-note.service";
import { authenticate } from "../middleware/auth-mw";

const init = router => {
  // Post
  router
    .route("/emergency-note")
    .post(authenticate(["CALL_OPERATOR", "POLICE_OFFICER"]), createEmergencyNote);

  // Get
  router
    .route("/emergency-note")
    .get(authenticate(["CALL_OPERATOR", "POLICE_OFFICER"]), getEmergencyNotes);
};

const createEmergencyNote = async (req, res) => {
  const params = {
    eid: req.body.eid,
    note: req.body.note,
    employeeId: req.employee.e_id
  };

  const { data, status } = await emergencyNoteService.createEmergencyNote(
    params
  );
  res.status(status).send(data);
};

const getEmergencyNotes = async (req, res) => {
  // emergency-note?eid=11
  if (!req.query.eid) {
    return res.status(400).send({
      data: {},
      error: "specify an eid"
    });
  }

  const params = {
    eid: req.query.eid
  };
  const { data, status } = await emergencyNoteService.getNotesForEmergency(
    params
  );
  res.status(status).send(data);
};

export const EmergencyNoteRoute = {
  init: init
};
