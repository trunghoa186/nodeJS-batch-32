const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: [100, 'Tên nhà cung cấp không được vượt quá 100 ký tự'],
    },
    email: {
      type: String,
      validate: {
        validator: function (value) {
          const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(value);
        },
        message: `{VALUE} không phải là email hợp lệ!`,
      },
      required: [true, 'Email không được bỏ trống'],
      unique: [true, 'Email không được trùng'],
    },
    phoneNumber: {
      type: String,
      unique: [true, 'Điện thoại không được trùng'],
    },
    address: {
      type: String,
      maxLength: [500, 'Địa chỉ không được vượt quá 500 ký tự'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Supplier = model('suppliers', supplierSchema);
module.exports = Supplier;