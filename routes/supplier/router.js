var express = require("express");


var router = express.Router();

const {validateSchema, checkIdSchema} = require("../../utils/index");
const {
  getAll,
  create,
  search,
  getDetail,
  update,
  deleteFunc,
} = require('./controller')
const { suppliersSchema, suppliersSchemaPatch} = require('./validation');

// cách cũ
// router.get("/", getAll);
// router.post("/", create);

router.route('/')
  /* GET home page. */
 .get(getAll)
 //post data , create
 .post(validateSchema(suppliersSchema),create)

  //search
router.get("/search", search);

//cách cũ
// router.get("/:id", searchId);
// router.patch("/:id",);
// router.delete("/:id",deleteFunc);

router.route('/:id')
  // Get one by id
  .get(validateSchema(checkIdSchema),getDetail)
  //update
  .put(validateSchema(checkIdSchema), validateSchema(suppliersSchema), update)
  .patch(validateSchema(checkIdSchema), validateSchema(suppliersSchemaPatch), update)
  //delete
  .delete(validateSchema(checkIdSchema),deleteFunc)

module.exports = router;
