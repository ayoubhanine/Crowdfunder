import Project from "../models/Project.js";

//  CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const { title, description, capital, maxInvestmentPercent } = req.body;

    const project = await Project.create({
      title,
      description,
      capital,
      maxInvestmentPercent,
      owner: req.user._id,
      currentAmount: 0,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  GET MY PROJECTS
export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  UPDATE PROJECT
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Vérifier owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Interdire modification si fermé
    if (project.status === "closed") {
      return res.status(400).json({ message: "Project is closed" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  CLOSE PROJECT
export const closeProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    project.status = "closed";
    await project.save();

    res.json({ message: "Project closed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};