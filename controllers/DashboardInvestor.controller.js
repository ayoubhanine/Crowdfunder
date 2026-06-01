import Investement from "../models/Investment.js";
import User from "../models/User.js";


export const getInvestorDashboard = async (req, res) => {
  try {
    const investments = await Investement.find({
      investor: req.user._id,
    }).populate("project");

    // Total investi
    const totalInvested = investments.reduce(
      (sum, inv) => sum + inv.amount,
      0
    );

    // Nombre de projets financés (sans doublons)
    const financedProjects = new Set(
      investments.map((inv) => inv.project._id.toString())
    );

    const projectsCount = financedProjects.size;

    // Solde disponible
    const balance = req.user.balance || 0;

    // Valeur globale du portefeuille
    const portfolioValue = balance + totalInvested;

    // Liste des participations
    const portfolio = investments.map((inv) => ({
      _id: inv._id,
      amount: inv.amount,
      project: {
        _id: inv.project._id,
        title: inv.project.title,
        status: inv.project.status,
      },
      investedAt: inv.createdAt,
    }));

    res.status(200).json({
      kpis: {
        balance,
        totalInvested,
        projectsCount,
        portfolioValue,
      },
      portfolio,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors du chargement du dashboard investisseur",
      error: error.message,
    });
  }
};