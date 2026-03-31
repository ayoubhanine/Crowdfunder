import { body } from "express-validator";

export const registerValidation=[
    body("name").notEmpty().withMessage("name is required"),
    body("email").isEmail().withMessage("valid email is required"),
    body("password").isLength({min:6}).withMessage("password must be at least 6 chars"),
    body("role").optional().isIn(["investor","owner","admin"]).withMessage("invalid role"),
];
export const loginValidation=[
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("password is required"),
]