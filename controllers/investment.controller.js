import { protect } from "../middlewares/auth.middleware.js";
import Investment from "../models/Investment.js";
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
//Voir MES investissements
export const getMyInvestements=async (req,res)=>{
  try{
    const investements=await Investement.find({
      investor:req.user._id,
       }).populate("project","title capital");
       const results=investements.map((inv)=>{
        const percentage=((inv.amount/inv.project.capital)*100).toFixed(2)
    
       return{
        project:inv.project.title,
        amount:inv.amount,
        percentage:percentage + "%",
       };
      });
      res.json(results)
  }
  catch(error){
    res.status(500).json({message:error.message})

  }
};
//Voir investisseurs d’un projet
export const getProjectInvestors=async(req,res)=>{
  try{  
      const {id}=req.params;
      const investements=await Investement.find({project:id})
      .populate("investor","name")
      .populate("project","capital title")

      const results=investements.map((inv)=>{
        const percentage=((inv.amount/inv.project.capital)*100).toFixed(2);
        return{
          investor:inv.investor.name,
          amount:inv.amount,
          percentage:percentage + "%",
          
        };
        

      });
      res.json(results)

  }
  catch(error){
      res.status(500).json({message:error.message})
  }
};
//Portfolio utilisateur
export const getUserPortfolio = async (req, res) => {
  try {
    const investments = await Investment.find({
      investor: req.user._id,
    }).populate("project");

    let totalInvested = 0;

    const projects = investments.map((inv) => {
      totalInvested += inv.amount;

      const percentage = ((inv.amount / inv.project.capital) * 100).toFixed(2);

      return {
        project: inv.project.title,
        amount: inv.amount,
        percentage: percentage + "%",
      };
    });

    res.json({
      totalInvested,
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};