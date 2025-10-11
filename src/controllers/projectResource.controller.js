import * as service from "../services/projectResource.service.js";

/* ===========================================================
   🔗 Link resource to project
   =========================================================== */
export const link = async (req, res) => {
  try {
    const record = await service.linkResource(req.body);
    res.status(201).json({
      message: "✅ Resource linked to project successfully",
      record,
    });
  } catch (err) {
    const status =
      err.message.includes("already linked") ? 409 : 500; // Conflict if already exists
    res.status(status).json({ error: err.message });
  }
};

/* ===========================================================
   📚 Get all resources of a project
   =========================================================== */
export const getByProject = async (req, res) => {
  try {
    const result = await service.getResourcesByProject(req.params.project_id);
    res.status(200).json(result);
  } catch (err) {
    const code = err.message.includes("not found") ? 404 : 500;
    res.status(code).json({ error: err.message });
  }
};

/* ===========================================================
   📂 Get all projects linked to a resource
   =========================================================== */
export const getByResource = async (req, res) => {
  try {
    const result = await service.getProjectsByResource(req.params.resource_id);
    res.status(200).json(result);
  } catch (err) {
    const code = err.message.includes("not found") ? 404 : 500;
    res.status(code).json({ error: err.message });
  }
};

/* ===========================================================
   ❌ Unlink resource from project
   =========================================================== */
export const unlink = async (req, res) => {
  try {
    const { project_id, resource_id } = req.params;
    await service.unlinkResource(project_id, resource_id);
    res.status(204).send();
  } catch (err) {
    const code = err.message.includes("not linked") ? 404 : 500;
    res.status(code).json({ error: err.message });
  }
};
