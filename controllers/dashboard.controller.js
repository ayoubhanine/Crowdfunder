import Project from "../models/Project.js";

export const getDashboardData = async (req, res) => {
  try {

    // récupérer seulement les projets du owner connecté
    const projects = await Project.find({
      owner: req.user._id
    }).populate("owner", "name email");

    // statistiques
    const totalProjects = projects.length;

    const openProjectsCount = projects.filter(
      p => p.status === "open"
    ).length;

    const closedProjectsCount = projects.filter(
      p => p.status === "closed"
    ).length;

    const totalCapitalRaised = projects.reduce(
      (sum, p) => sum + p.currentAmount,
      0
    );

    // format des projets
    const recentProjects = projects.map(project => {

      const progressPercent =
        project.capital > 0
          ? Math.min(
              Math.round(
                (project.currentAmount / project.capital) * 100
              ),
              100
            )
          : 0;

      return {
        _id: project._id,
        title: project.title,
        status: project.status,
        capital: project.capital,
        currentAmount: project.currentAmount,
        progress: progressPercent,
        owner: project.owner
      };
    });

    return res.status(200).json({
      kpis: {
        totalProjects,
        openProjects: openProjectsCount,
        closedProjects: closedProjectsCount,
        totalRaised: totalCapitalRaised
      },
      projects: recentProjects
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erreur lors de la récupération des données du dashboard",
      error: error.message
    });
  }
};