import User from "../models/User.js";
import Investment from "../models/Investment.js";
import Project from "../models/Project.js";

//  Tous les users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Tous les investisseurs
export const getInvestors = async (req, res) => {
  try {
    const investors = await User.find({ role: "investor" });
    res.json(investors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Tous les owners
export const getOwners = async (req, res) => {
  try {
    const owners = await User.find({ role: "owner" });
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Portfolio d’un utilisateur
export const getUserPortfolioByAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const investments = await Investment.find({ investor: id }).populate("project");

    let total = 0;

    const projects = investments.map((inv) => {
      total += inv.amount;

      const percentage = ((inv.amount / inv.project.capital) * 100).toFixed(2);

      return {
        project: inv.project.title,
        amount: inv.amount,
        percentage: percentage + "%",
      };
    });

    res.json({
      totalInvested: total,
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Stats globales
export const getGlobalStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalInvestments = await Investment.countDocuments();

    const totalMoney = await Investment.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      totalUsers,
      totalProjects,
      totalInvestments,
      totalMoney: totalMoney[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};