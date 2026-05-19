import Project from "../models/Project.js";

export const getDashboardData = async (req, res) => {
  try {
    // 1. Récupérer TOUS les projets de la base de données
    const projects = await Project.find().populate("owner", "name email");

    // 2. Calculer les statistiques globales pour les KPIs du haut
    const totalProjects = projects.length;
    const openProjectsCount = projects.filter(p => p.status === "open").length;
    const closedProjectsCount = projects.filter(p => p.status === "closed").length;

    // Calcul de la somme totale récoltée sur la plateforme (ex: le 420k€ du design)
    const totalCapitalRaised = projects.reduce((sum, p) => sum + p.currentAmount, 0);

    // 3. Formater la liste des projets récents avec le calcul du pourcentage de progression
    const recentProjects = projects.map(project => {
      // Calcul du pourcentage : (Montant Actuel / Capital Cible) * 100
      const progressPercent = project.capital > 0 
        ? Math.min(Math.round((project.currentAmount / project.capital) * 100), 100)
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

    // 4. Renvoyer la réponse structurée au Frontend
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