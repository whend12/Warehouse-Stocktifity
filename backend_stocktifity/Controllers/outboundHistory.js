import outboundHistory from '../model/outboundHistoryModel.js'

export const getOutBoundHistory = async (req, res) => {
  try {
    const OutboundHistory = await outboundHistory.find().populate('product.supplierId', 'name');
    res.status(200).json(OutboundHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
