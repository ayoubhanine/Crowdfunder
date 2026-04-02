import Investement from "../models/Investment.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

export const Investproject = async (req, res) => {
  try {
    const { amount } = req.body;
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "le projet non trouvé" });
    }
    //  Vérifier projet ouvert
    if (project.status === "closed") {
      return res.status(400).json({ message: "le projet est fermé" });
    }
    // Vérifier capital restant
    const remaining = project.capital - project.currentamount;
    if (amount > remaining) {
      return res
        .status(400)
        .json({ message: "le prix depasser le capital restant " });
    }
    //  Vérifier 50%
    const maxAllowed = project.capital * 0.5;
    if (amount > maxAllowed) {
      return res
        .status(400)
        .json({ message: "le prix est depassé le 50% de capital de projet" });
    }
    //  Vérifier balance
    const user = await User.findById(req.user._id);
    if (user.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    //  Créer investment
    const investment = await Investement.create({
      investor: user._id,
      project: project._id,
      amount,
    });

    //  Update balance
    user.balance -= amount;
    await user.save();

    //  Update project
    project.currentAmount += amount;

    //  Fermeture auto
    if (project.currentAmount >= project.capital) {
      project.status = "closed";
    }

    await project.save();

    res.status(201).json({
      message: "Investment successful",
      investment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
