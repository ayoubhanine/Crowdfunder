import Wallet from '../models/Wallet.js';
import User from '../models/User.js'; // Importation de ton modèle User

// Récupérer le portefeuille de l'investisseur
export const getWallet = async (req, res) => {
  try {
    // 1. On récupère d'abord l'utilisateur pour avoir sa vraie balance (ex: 175 dh)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // 2. On cherche son portefeuille associé
    let wallet = await Wallet.findOne({ userId: req.user.id });

    // 3. Si le portefeuille n'existe pas encore, on le crée avec la balance de l'User
    if (!wallet) {
      wallet = await Wallet.create({
        userId: req.user.id,
        balance: user.balance, // Utilise les 175 dh de ton modèle User !
        history: user.balance > 0 ? [
          {
            type: 'Dépôt',
            amount: user.balance,
            date: new Date()
          }
        ] : []
      });
    } else {
      // 4. Si le portefeuille existait déjà mais que sa balance ne correspond pas à l'User, on synchronise
      if (wallet.balance !== user.balance && wallet.history.length === 0) {
        wallet.balance = user.balance;
        if (user.balance > 0) {
          wallet.history.push({
            type: 'Dépôt',
            amount: user.balance,
            date: new Date()
          });
        }
        await wallet.save();
      }
    }

    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
export const depositFunds = async (req, res) => {
  const amount = Number(req.body.amount);

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Montant invalide" });
  }

  try {
    // A. Trouver le portefeuille de l'utilisateur
    let wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet) {
      wallet = new Wallet({ userId: req.user.id });
    }

    // B. Mettre à jour le Wallet (Solde + Historique)
    wallet.balance += amount;
    wallet.history.unshift({
      type: 'Dépôt',
      amount: amount,
      date: new Date()
    });
    await wallet.save();

    // C. LA CLÉ DE LA SYNCHRO : Mettre à jour la balance dans le modèle USER
    // On utilise $inc pour incrémenter directement la valeur en base de données
    await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { balance: amount } },
      { new: true } // Renvoie le document mis à jour si besoin
    );

    // D. On renvoie le portefeuille mis à jour au Front-end
    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du dépôt", error: error.message });
  }
};