const { Employee } = require("../../models");

// mongoose.connect('mongodb://localhost:27017/node-32-database');
const { fuzzySearch } = require("../../utils/index");

/* GET home page. */
const getAll = async (req, res, next) => {
  try {
    const result = await Employee.find({ isDeleted: false });

    res.send(200, {
      payload: result,
      message: "Thành công",
    });
  } catch (error) {
    return res.send(404, {
      message: "Không tìm thấy",
    })
  }
};

//post data
const create = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, address, birthday, password } = req.body;

    const newEmployee = new Employee({
      firstName, lastName, email, phoneNumber, address, birthday, password
    });

    let result = await newEmployee.save();

    return res.send(200, {
      message: "Thành công",
      payload: result,
    });
  } catch (error) {
    return res.send(404, {
      message: "Không tìm thấy",
      error,
    })
  }
}

// Get one by id
const getDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = await Employee.findOne({
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
    res.send(404, { message: "Bad request" });
  }
};

//search
const search = async (req, res, next) => {
  try {
    const { firstName, lastName, address, email, birthday } = req.query;
    const conditionFind = { isDeleted: false };

    if (firstName) conditionFind.firstName = fuzzySearch(firstName);
    if (lastName) conditionFind.lastName = fuzzySearch(lastName);
    if (address) conditionFind.address = fuzzySearch(address);
    if (email) conditionFind.email = fuzzySearch(email);
    if (birthday) conditionFind.birthday = fuzzySearch(birthday);

    const payload = await Employee.find(conditionFind);

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
};

//update
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = await Employee.findOneAndUpdate(
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
    const payload = await Employee.findOneAndUpdate(
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
