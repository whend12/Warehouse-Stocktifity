import inboundHistory from '../model/inboundHistoryModel.js'

export const getInBoundHistory = async (req, res) => {
  try {
    const inBoundHistory = await inboundHistory.find().populate('product.supplierId', 'name');
    res.status(200).json(inBoundHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
