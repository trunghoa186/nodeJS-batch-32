var express = require("express");
const fs = require('fs')
var router = express.Router();
const yup = require('yup')

const data = require('../data/suppliers.json');

const { validateSchema, writeFileSync, generationID } = require("../utils");



/* GET home page. */
router.get("/", function (req, res, next) {
  res.send(data);
});

router.get("/search", function (req, res, next) {
  const { price } = req.query;
  const filter = data.filter((item) => item.price >= price);
  res.send(filter);
});

// Get one by id
router.get("/:id", function (req, res, next) {
  const { id } = req.params;

  let result = data.find((x) => x.id == id);

  if (result) {
    return res.send({ code: 200, payload: result });
  }

  return res.send(401, { message: "Not found" });
});

//update
const updateSuppliersSchema = yup.object({
  params: yup.object({
    id: yup.number(),
  }),
  body: yup.object({
    phone: yup.string(),
    name: yup.string(),
    email: yup.string().email().required(),
  }),
});

router.patch("/:id",validateSchema(updateSuppliersSchema), function (req, res, next) {
  const { id } = req.params;
  const patchData = req.body;

  let found = data.find((x) => x.id == id);

  if (found) {
    for (let propertyName in patchData) {
      found[propertyName] = patchData[propertyName];
    }
    res.send({ ok: true, message: "Updated" });
  }
  res.send({ ok: false, message: "Updated fail" });
});

router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  data = data.filter((x) => x.id.toString() !== id.toString());

  console.log("««««« data »»»»»", data);

  res.send({ ok: true, message: "Deleted" });
});

//post data
router.post('/', async function(req, res, next) {
  const { name, email, phone, isDeleted, address } = req.body;

  const newP = { name, email, phone, isDeleted, address, id: generationID() };
  if (data?.length > 0) {
    await writeFileSync('data/suppliers.json', [ ...data, newP]);
  } else {
    await writeFileSync('data/suppliers.json', [newP]);
  }

  res.send(200, {
    payload: newP,
    message: "Tạo thành công"
  });
});

module.exports = router;