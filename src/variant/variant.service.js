const { escapeId } = require("mysql2");
const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  searchByKeyword,
};
async function getAll() {
  return await db.Variant.findAll(
    {
      include:[
        {
          model : db.Product
        }
    ]
    }
  );
}
async function getById(id, callback) {
  getVariant(id)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}
async function update(id, params) {
  const Variant = await getVariant(id);
  const nameChanged = params.barcode && params.barcode !== Variant.barcode;
  if (
    nameChanged &&
    (await db.Variant.findOne({ where: { barcode: params.barcode } }))
  ) {
    return "Varient with barcode " + params.barcode + " is already exists";
  }
  Object.assign(Variant, params);
  await Variant.save();
  return Variant;
}
async function create(params) {
  if (await db.Variant.findOne({ where: { barcode: params.barcode } })) {
    return "Varient " + params.barcode + " is already exists";
  }
  const Variant = new db.Variant(params);
  await Variant.save();
  return Variant;
} 
async function searchByKeyword(searchKeyword) {
  const Variant = await db.Variant.findAll({
    where: { barcode: { [Op.like]: "%" + searchKeyword + "%" } },
  });

  if (!Variant || Variant == []) return "no variant found";
  return Variant;
}
async function getVariant(id) {
  const Variant = await db.Variant.findByPk(id);
  if (!Variant) return "Variant not found";
  return Variant;
}
async function del(did){
  return await db.Variant.destroy({
    where:{
      id:did
    }
  });
}