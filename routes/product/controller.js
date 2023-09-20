const { Product,Supplier,Category } = require("../../models");
const { fuzzySearch, toObjectId } = require("../../utils/index");

/* GET home page. */
const getAll = async (req, res, next) => {
  try {
    let results = await Product.find({
      isDeleted: false,
    })
      .populate('category')
      .populate('supplier')
      // .lean();

    return res.send({ code: 200, payload: results });
  } catch (err) {
    return res.send(404, {
      message: "Không tìm thấy",
      err,
    });
  }
};

//getlist
const getList = async (req, res, next) => { // NOTE
  try {
    const { page, pageSize } = req.query;
    const limit = pageSize || 10;
    const skip = limit * (page - 1) || 0;

    const conditionFind = { isDeleted: false };

    let results = await Product.find(conditionFind)
      .populate('category')
      .populate('supplier')
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments(conditionFind)

    return res.send({ code: 200, payload: results, total });
  } catch (err) {
    return res.send(404, {
      message: "Không tìm thấy",
      err,
    });
  }
};

//post data
async function create(req, res, next) {
  try {
    const { name, price, discount, stock, description, supplierId, categoryId } = req.body;

    // const existSupplier = await Supplier.find({
    //   _id: supplierId,
    //   isDeleted: false,
    // });
    // const existCategory = await Category.find({
    //   _id: categoryId,
    //   isDeleted: false,` 
    // });
    const getSupplier = Supplier.findOne({
      _id: supplierId,
      isDeleted: false,
    });
    const getCategory =  Category.findOne({
      _id: categoryId,
      isDeleted: false,
    });

    const [existSupplier, existCategory] = await Promise.all([getSupplier, getCategory]);

    const error = [];
    if (!existSupplier) error.push("Nhà cung cấp không khả dụng");
    if (!existCategory) error.push("Danh mục không khả dụng");

    if (error.length > 0 ) {
      return res.send(400, {
        error,
        message: "Không khả dụng"
      });
    }

    // if (!existSupplier && !existCategory) {
    //   return res.send(400, {
    //     message: "Nhà cung cấp & Danh mục không khả dụng",
    //   });
    // }
    // if (!existSupplier) {
    //   return res.send(400, {
    //     message: "Nhà cung cấp không khả dụng",
    //   });
    // }
    // if (!existCategory) {
    //   return res.send(400, {
    //     message: "Danh mục không khả dụng",
    //   });
    // }

    const newProduct = new Product({
      name, price, discount, stock, description, supplierId, categoryId
    });

    let result = await newProduct.save();

    return res.send(200, {
      message: "Thành công",
      payload: result,
    });
  } catch (error) {
    console.log('««««« error »»»»»', error);
    return res.send(404, {
      message: "Có lỗi",
      error,
    });
  }
}

// Get one by id
const getDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    let result = await Product.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate('category')
      .populate('supplier');

    if (result) {
      return res.send({ code: 200, payload: result });
    }

    return res.status(404).send({ code: 404, message: 'Không tìm thấy' });
  } catch (err) {
    res.status(404).json({
      message: 'Get detail fail!!',
      payload: err,
    });
  }
};

//search
async function search(req, res, next) {
  try {
    const { name, categoryId, priceStart, priceEnd, supplierId, limit, skip } = req.query;
    const conditionFind = { isDeleted: false };

    if (name) conditionFind.name = fuzzySearch(name);

    if (categoryId) {
      conditionFind.categoryId = categoryId;
    };

    if (supplierId) {
      conditionFind.supplierId = supplierId;
    };

    if (priceStart && priceEnd) { // 20 - 50
      const compareStart = { $lte: ['$price', priceEnd] }; // '$field'
      const compareEnd = { $gte: ['$price', priceStart] };
      conditionFind.$expr = { $and: [compareStart, compareEnd] };
    } else if (priceStart) {
      conditionFind.price = { $gte: parseFloat(priceStart) };
    } else if (priceEnd) {
      conditionFind.price = { $lte: parseFloat(priceEnd) };
    }

    const result = await Product.find(conditionFind)
      .populate('category')
      .populate('supplier');

    res.send(200, {
      message: "Thành công",
      payload: result,
    });
  } catch (error) {
    return res.send(404, {
      message: "Không tìm thấy",
    })
  }
}

//update
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, discount, stock, description, supplierId, categoryId } = req.body;

    // Check if the product exists and is not deleted
    const product = await Product.findOne({ _id: id, isDeleted: false });

    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    const error = [];

    // Check if the supplier exists and is not deleted
    if (product.supplierId.toString() !== supplierId.toString()) {
      const supplier = await Supplier.findOne({ _id: supplierId, isDeleted: false });

      if (!supplier) error.push("Nhà cung cấp không khả dụng");
    }

    // Check if the category exists and is not deleted
    if (product.categoryId.toString() !== categoryId) {
      const category = await Category.findOne({ _id: categoryId, isDeleted: false });

    if (!category)  error.push("Danh mục không khả dụng");
    };

    if (error.length > 0 ) {
      return res.send(400, {
        error,
        message: "Không khả dụng"
      });
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, discount, stock, description, supplierId, categoryId },
      { new: true }
    );

    if (updatedProduct) {
      return res.status(200).json({
        message: "Update successful",
        payload: updatedProduct,
      });
    }

    return res.status(400).json({ message: "Update failed" });
  } catch (error) {
    console.log('««««« error »»»»»', error);
    return res.send(404, {
      message: "Có lỗi",
      error,
    });
  }
};

//delete
const deleteFunc = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const payload = await Product.findByIdAndUpdate(
    //   id,
    //   // {$set:{isDeleted : true}},
    //   { isDeleted : true },
    //   { new: true },
    // );
    const payload = await Product.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      { isDeleted: true },
      { new: true }
    );

    if (payload) {
      return res.send(200, {
        payload,
        message: "Xóa thành công",
      });
    }
    return res.send(200, {
      message: "Không tìm thấy danh mục",
    });
  } catch (error) {
    res.send(400, {
      error,
      message: "Xóa không thành công",
    });
  }
};

const softDelete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );

    if (result) {
      return res.send(200, {
        message: "Xóa thành công",
        payload: result,
      });
    }

    return res.send(400, {
      message: "Thất bại",
    });
  } catch (error) {
    return res.send(404, {
      message: "Không tìm thấy",
      error,
    });
  }
};

module.exports = {
  getAll,
  create,
  getDetail,
  search,
  update,
  deleteFunc,
  getList,
  softDelete,
};
