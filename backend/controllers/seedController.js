import Product from '../models/Product.js';
import data from '../data.js';
import User from '../models/User.js';
const seedData = async (req,res) => {
    try {
        await Product.deleteMany({});
        const createdProducts = await Product.insertMany(data.products);
        await User.deleteMany({});
        const createdUsers = await User.insertMany(data.users);
        res.send({ createdProducts, createdUsers });
    } catch (err) {
        console.log(`Failed to update users/products: ${err.message}`);
    }
}
export default seedData;