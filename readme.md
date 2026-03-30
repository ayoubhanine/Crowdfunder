crowdfunding-api/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Investment.js
│   │   └── Wallet.js
│   │
│   ├── controllers/
│   │   ├── auth/
│   │   │   ├── register.controller.js
│   │   │   └── login.controller.js
│   │   │
│   │   ├── project/
│   │   │   ├── createProject.controller.js
│   │   │   ├── updateProject.controller.js
│   │   │   ├── deleteProject.controller.js
│   │   │   ├── getMyProjects.controller.js
│   │   │   └── closeProject.controller.js
│   │   │
│   │   ├── investment/
│   │   │   ├── invest.controller.js
│   │   │   ├── getMyInvestments.controller.js
│   │   │   └── getProjectInvestors.controller.js
│   │   │
│   │   ├── wallet/
│   │   │   ├── fundWallet.controller.js
│   │   │   └── getWallet.controller.js
│   │   │
│   │   └── admin/
│   │       ├── getAllUsers.controller.js
│   │       ├── getInvestorPortfolio.controller.js
│   │       └── getOwnerPortfolio.controller.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   ├── investment.routes.js
│   │   ├── wallet.routes.js
│   │   └── admin.routes.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   │
│   ├── services/
│   │   ├── project.service.js
│   │   ├── investment.service.js
│   │   └── wallet.service.js
│   │
│   ├── utils/
│   │   ├── calculatePercentage.js
│   │   └── checkProjectStatus.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── project.validator.js
│   │   └── investment.validator.js
│   │
│   └── app.js
│
├── server.js
├── .env
├── package.json
└── README.md