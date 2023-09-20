
const { getQueryDateTime, fuzzySearch } = require('../../utils');
const {
  Product,
  Category,
  Supplier,
  Customer,
  Order,
} = require('../../models');

module.exports = {
  question1: async (req, res, next) => {
    try {
      const conditionFind = {
        discount: { $lte: 10 },
      };

      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Product.find(conditionFind);
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question1a: async (req, res, next) => {
    try {
      const { discount } = req.query;
      const conditionFind = {};

      if(discount) conditionFind.discount = { $lte: discount };
        
      let results = await Product.find(conditionFind)
        .populate("category")
        .populate("supplier");
      let total = await Product.countDocuments();
      
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question1b: async (req, res, next) => {
    try {
      const { discount, type } = req.query;
      const conditionFind = {};

      if(discount){
        switch (+type) {
          case 0:
            conditionFind.discount = { $eq: discount };
            break;
          case 1:
            conditionFind.discount = { $lte: discount };
            break;
          case 2:
            conditionFind.discount = { $lt: discount };
            break;
          case 3:
            conditionFind.discount = { $gte: discount };
            break;
          case 4:
            conditionFind.discount = { $gt: discount };
            break;
          default:
            conditionFind.discount = { $eq: discount };
            break;
        }
      }

      console.log('««««« conditionFind »»»»»', conditionFind);
        
      let results = await Product.find(conditionFind)
        .populate("category")
        .populate("supplier");
      let total = await Product.countDocuments();
      
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question2: async (req, res, next) => {
    try {
      const conditionFind = {
        stock: { $lte: 20 },
      };

      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Product.find(conditionFind);
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question2a: async (req, res, next) => {
    try {
      const { stock } = req.query;
      const conditionFind = {};

      if(stock) conditionFind.stock = { $lte: stock };
        
      let results = await Product.find(conditionFind)
        .populate("category")
        .populate("supplier");
      let total = await Product.countDocuments();
      
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question2b: async (req, res, next) => {
    try {
      const { stock, type } = req.query;
      const conditionFind = {};

      if(stock){
        switch (Number(type)) {
          case 0:
            conditionFind.stock = { $eq: stock };
            break;
          case 1:
            conditionFind.stock = { $lte: stock };
            break;
          case 2:
            conditionFind.stock = { $lt: stock };
            break;
          case 3:
            conditionFind.stock = { $gte: stock };
            break;
          case 4:
            conditionFind.stock = { $gt: stock };
            break;
          default:
            conditionFind.stock = { $eq: stock };
            break;
        }
      }
      console.log('««««« conditionFind »»»»»', conditionFind);
        
      let results = await Product.find(conditionFind)
        .populate("category")
        .populate("supplier");
      let total = await Product.countDocuments();
      
      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question3: async (req, res, next) => {
    try {
      
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question4: async (req, res, next) => {
    // try {
    //   const { address } = req.query;
    //   const conditionFind = {isDeleted: false};
    //   conditionFind.address = fuzzySearch(address);
    //   const payload = await Customer.find(conditionFind);
    //   if (address) {
    //     return res.send(200, {
    //       message: "Tìm Thành công",
    //       payload,
    //     });
    //   }return res.send(400, {
    //     message: "Không có địa chỉ",
    //     errors: err,
    //   });
      
    // } catch (err) {
    //   return res.status(500).json({ code: 500, error: err });
    // }

    try {
      const { address } = req.query;

      const conditionFind = {
        address: { $regex: new RegExp(`${address}`), $options: 'i' },
      };
      // const conditionFind = { address: new RegExp(`${address}`) };
      // const conditionFind = { address: {$eq: address } };

      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Customer.find(conditionFind);

      let total = await Customer.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },
};