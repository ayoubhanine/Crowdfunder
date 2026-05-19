
import Project from "../models/Project.js"
export const checkstatus=(req,res,next)=>{
    const project=req.params.id

    if (project.status === "closed") {
      return res.status(400).json({ message: "le projet est fermé" });
    }
    next()
}