const { Category } = require("../../models");

// mongoose.connect('mongodb://localhost:27017/node-32-database');
const { fuzzySearch } = require("../../utils/index");

/* GET home page. */
const getAll = async (req, res, next) => {
  try {
    const payload = await Category.find({
      isDeleted: false,
    });

    res.send(200, {
      payload,
      message: "Lấy Thành công",
    });
  } catch (error) {
    res.send(400, {
      message: "Lấy Thất bại",
      errors: err,
    });
  }
};

//post data
async function create(req, res, next) {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({
      name,
      description,
    });

    const result = await newCategory.save();

    return res.send(200, {
      message: "Tạo Thành công",
      payload: result,
    });
  } catch (err) {
    return res.send(400, {
      message: "Thất bại",
      errors: err,
    });
  }
}

// Get one by id
const getDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Category.findOne({
      _id: id,
      isDeleted: false,
    });
    if (result) {
      return res.send(200, {
        payload: result,
        message: "Xem chi tiết thành công",
      });
    }
    return res.send(400, { message: "Không tìm thấy" });
  } catch (error) {
    res.send(400, { message: "Bad request" });
  }
};

//search
async function search(req, res, next) {
  try {
    const { name } = req.query;
    const conditionFind = { isDeleted: false };

    if (name) {
      conditionFind.name = fuzzySearch(name);
    }
    const payload = await Category.find(conditionFind);

    res.send(200, {
      message: "Lấy Thành công",
      payload,
    });
  } catch (error) {
    res.send(400, {
      message: "Lấy Thất bại",
      errors: err,
    });
  }
}

//update
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = await Category.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { ...req.body },
      { new: true }
    );

    if (payload) {
      return res.send(200, {
        payload,
        message: "Cập nhật thành công!",
      });
    }

    return res.send(404, { message: "Không tìm thấy" });
  } catch (error) {
    res.send(400, {
      error,
      message: "Cập nhập không thành công",
    });
  }
};

//delete
const deleteFunc = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const payload = await Category.findByIdAndUpdate(
    //   id,
    //   // {$set:{isDeleted : true}},
    //   { isDeleted : true },
    //   { new: true },
    // );
    const payload = await Category.findOneAndUpdate(
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

module.exports = {
  getAll,
  create,
  getDetail,
  search,
  update,
  deleteFunc,
};
