const yup = require('yup');

const suppliersSchema = yup.object().shape({
  body: yup.object({
    name: yup.string()
      .max(50, "Quá dài")
      .required("Không được bỏ trống"),

    email: yup.string()
      .email()
      .max(50, "Quá dài")
      .required("Không được bỏ trống"),

    phoneNumber: yup.string()
      .max(50, "Tên quá dài")
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại sai rồi')
      .required("Không được bỏ trống"),

    address: yup.string()
      .max(50, "Quá dài")
      .required("Không được bỏ trống"),
  }),
});

const suppliersSchemaPatch = yup.object().shape({
  body: yup.object({
    name: yup.string()
      .max(50, "Quá dài"),

    email: yup.string()
      .email()
      .max(50, "Quá dài"),

    phoneNumber: yup.string()
      .max(50, "Tên quá dài")
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Số điện thoại sai rồi'),

    address: yup.string()
      .max(50, "Quá dài"),
  }),
});

module.exports = {
  suppliersSchema,
  suppliersSchemaPatch,
}