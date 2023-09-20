const yup = require('yup');

const employeesSchema = yup.object().shape({
  body: yup.object({
    firstName: yup.string()
      .max(50, "Quá dài")
      .required("Tên không được bỏ trống"),

    lastName: yup.string()
      .max(50, "Quá dài")
      .required("Họ không được bỏ trống"),


    email: yup.string()
      .required()
      // .email()
      .test('email type', '${path} Không phải email hợp lệ', (value) => {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        return emailRegex.test(value);
    }),

    phoneNumber: yup.string()
      .required()
      .test('phoneNumber type', '${path} Không phải số điện thoại hợp lệ', (value) => {
        const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

        return phoneRegex.test(value);
      }),

    address: yup.string()
      .max(50, "Quá dài")
      .required("address Không được bỏ trống"),

    birthday: yup.date(),

    password: yup.string()
      .required()
      .min(3, 'Không được ít hơn 3 ký tự')
      .max(12, 'Không được vượt quá 12 ký tự'),
  }),
});

const employeesSchemaPatch = yup.object().shape({
  body: yup.object({
    firstName: yup.string()
      .max(50, "Quá dài"),

    lastName: yup.string()
      .max(50, "Quá dài"),


    email: yup.string()
      // .email()
      .test('email type', '${path} Không phải email hợp lệ', (value) => {
        if (!value) return true;
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        return emailRegex.test(value);
      }),

    phoneNumber: yup.string()
      .test('phoneNumber type', '${path} Không phải số điện thoại hợp lệ', (value) => {
        if (!value) return true;

        const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

        return phoneRegex.test(value);
      }),

    address: yup.string()
      .max(50, "Quá dài"),

    birthday: yup.date(),

    password: yup.string()
      .required()
      .min(3, 'Không được ít hơn 3 ký tự')
      .max(12, 'Không được vượt quá 12 ký tự'),
  }),
});

module.exports = {
  employeesSchema,
  employeesSchemaPatch,
}