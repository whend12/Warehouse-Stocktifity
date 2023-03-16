import inboundHistory from '../model/inboundHistoryModel.js'
import PendingProduct from "../model/pendingProduct.js";

export const getInBoundHistory = async (req,res) => {
    try {
        // Get all confirmed pending products
        const confirmedPendingProducts = await PendingProduct.find({ confirmed: true });
    
        // Create an array to store the outbound history
        const outboundHistory = [];
    
        // Iterate through each confirmed pending product
        for (const product of confirmedPendingProducts) {
          // Find the corresponding product in the products collection
          const existingProduct = await Product.findOne({
            name: product.name,
            sku: product.sku,
            supplier: product.supplier,
          });
    
          // If the product exists, add the outbound record to the outbound history array
          if (existingProduct) {
            outboundHistory.push({
              name: existingProduct.name,
              sku: existingProduct.sku,
              supplier: existingProduct.supplier,
              quantity: product.quantity,
              timestamp: product.confirmedAt,
            });
          }
        }
    
        // Send the outbound history to the client
        res.send(outboundHistory);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
}