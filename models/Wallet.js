import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  history: [
    {
      type: {
        type: String,
        enum: ['Dépôt', 'Investissement', 'Retrait'],
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Wallet = mongoose.model('Wallet', WalletSchema);
export default Wallet;