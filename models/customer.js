const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const customerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Tên không được bỏ trống'],
      maxLength: [50, 'Tên nhà cung cấp không được vượt quá 100 ký tự'],
    },

    lastName: {
      type: String,
      required: [true, 'Họ không được bỏ trống'],
      maxLength: [50, 'Họ nhà cung cấp không được vượt quá 100 ký tự'],
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
      maxLength: [50, 'Số điện thoại không được vượt quá 50 ký tự'],
      validate: {
        validator: function (value) {
          const phoneRegex =/(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
          return phoneRegex.test(value);
        },
        message: `{VALUE} is not a valid phone!`,
        // message: (props) => `{props.value} is not a valid email!`,
      },
    },

    address: {
      type: String,
      maxLength: [500, 'Địa chỉ không được vượt quá 500 ký tự'],
      unique: [true, 'Địa chỉ không được trùng'],
    },

    birthday: { type: Date },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minLength: [3, 'Không được ít hơn 3 ký tự'],
      maxLength: [12, 'Không được vượt quá 12 ký tự'],
    },

  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Customer = model('customers', customerSchema);
module.exports = Customer;