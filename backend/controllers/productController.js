import Product from "../models/Product.js";

const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.send(products)
}

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({ message: 'product was not found' });
    }
}

const getProductByToken = async (req, res) => {
    const product = await Product.findOne({ token: req.params.token })
    if (product) {
        res.send(product);
    }

    else {
        res.status(404).send({ message: 'product token was not found' });
    }
}

const getProductCategories = async (req, res) => {
    const categories = await Product.find().distinct('category')
    if (categories) {
        res.send(categories);
    }
    else {
        res.status(404).send({ message: 'categories not found' });
    }
}

const getProductsByQuery = async (req, res) => {
    const PAGE_SIZE = 10
    const { query } = req
    const pageSize = query.pageSize || PAGE_SIZE 
    const page = query.page || 1
    const category = query.category || ''
    const price = query.price || ''
    const rating = query.rating || ''
    const order = query.order || ''
    const searchQuery = query.query || ''
    const queryFilter = searchQuery && searchQuery !== 'all' ? {
        title: { $regex: searchQuery, $options: 'i' }
    } : {};

    const categoryFilter = category && category !== 'all' ? {
        category
    } : {};

    const ratingFilter = rating && rating !== 'all' ? {
        'rating.rate': { $gte: Number(rating) }
    } : {};
    const priceFilter = price && price !== 'all' ? {
        price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
        }
    } : {};

    const sortOrder = order === 'lowest' ? { price: 1 } :
        order === 'highest' ? { price: -1 } :
            order === 'toprated' ? { rating: -1 } :
                order === 'newest' ? { createdAt: -1 } : { _id: -1 }

    const products = await Product.find({
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter
    }).sort(sortOrder).skip(pageSize * (page - 1)).limit(pageSize);

    const countProducts = await Product.countDocuments({
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter
    })
 
        res.send({
            products, countProducts, page, pages:Math.ceil(countProducts/pageSize)
        });
   
}




export { getProducts, getProductById, getProductByToken, getProductCategories, getProductsByQuery };