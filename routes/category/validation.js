const yup = require('yup');

const categoriesSchema = yup.object({
  body: yup.object({
    name: yup.string().max(50).required(),
    isDeleted: yup.bool(),
    description: yup.string().max(500),
  }),
});

const categoriesSchemaPatch = yup.object({
  body: yup.object({
    name: yup.string().max(50),
    isDeleted: yup.bool(),
    description: yup.string().max(500),
  }),
});


module.exports = {
  categoriesSchema,
  categoriesSchemaPatch,
}