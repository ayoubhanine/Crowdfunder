## 📐 Diagrammes UML

### Diagramme de classes
![Class Diagram](diagrammmes/ClassDiagram.png)

### Diagramme de séquence
![Sequence Diagram](diagrammmes/SequenceDiagramm.png)

### Diagramme de cas d'utilisation
![Use Case](diagrammmes/useCasediagram.png)

## 📁 Project Structure

```
crowdfunding-api/
│
├── src/
│   ├── config/                # Configuration files (DB, environment variables)
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── models/                # Mongoose models (database schemas)
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Investment.js
│   │   └── Wallet.js
│   │
│   ├── controllers/           # Business logic (controllers)
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
│   ├── routes/                # API routes
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   ├── investment.routes.js
│   │   ├── wallet.routes.js
│   │   └── admin.routes.js
│   │
│   ├── middlewares/           # Custom middlewares
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   │
│   ├── services/              # Business logic layer (services)
│   │   ├── project.service.js
│   │   ├── investment.service.js
│   │   └── wallet.service.js
│   │
│   ├── utils/                 # Helper functions
│   │   ├── calculatePercentage.js
│   │   └── checkProjectStatus.js
│   │
│   ├── validators/            # Request validation schemas
│   │   ├── auth.validator.js
│   │   ├── project.validator.js
│   │   └── investment.validator.js
│   │
│   └── app.js                 # Express app setup
│
├── server.js                  # Entry point of the application
├── .env                       # Environment variables
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```
# 📘 Crowdfunding API Documentation

## 📘 API Documentation avec Swagger

Ce projet utilise **Swagger (OpenAPI)** pour documenter et tester les endpoints de l’API de crowdfunding.

---

### 🚀 Accéder à la documentation

Une fois le serveur démarré, la documentation Swagger est disponible à l’adresse suivante :

```
http://localhost:3000/api-docs
```

Swagger UI permet de :
- Visualiser toutes les routes de l’API
- Tester les requêtes directement depuis le navigateur
- Voir les schémas des données (request/response)

---

### ⚙️ Configuration de Swagger

Swagger est configuré avec :

- `swagger-jsdoc` → Génération automatique de la documentation
- `swagger-ui-express` → Interface utilisateur interactive

Exemple de configuration :

```js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crowdfunding API",
      version: "1.0.0",
      description: "API de gestion de financement participatif",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
```

---

### 🔐 Exemple : Route Login

```js
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login réussi
 *       400:
 *         description: Erreur de validation
 */
```

---

### 🧪 Tester une requête dans Swagger

1. Ouvrir Swagger UI (`/api-docs`)
2. Choisir une route (ex: `/api/auth/login`)
3. Cliquer sur **"Try it out"**
4. Remplir les données JSON
5. Cliquer sur **"Execute"**

---

### 📌 Bonnes pratiques

- Toujours utiliser le chemin complet (ex: `/api/auth/login`)
- Documenter toutes les routes (Auth, Projects, Investments…)
- Ajouter des exemples pour faciliter les tests
- Regrouper les routes avec des `tags`

---

### 🛠️ Technologies utilisées

- Node.js
- Express.js
- Swagger (OpenAPI 3)
- swagger-jsdoc
- swagger-ui-express

---

## ✅ Résultat

Grâce à Swagger, ton API est :
- Facile à comprendre 📖
- Facile à tester 🧪
- Professionnelle 🚀
