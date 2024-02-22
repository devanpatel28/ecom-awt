const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  changeStatus,
  searchByKeyword,
};
async function getAll() {
  return await db.Product.findAll(
    {
      include:[
        {
          model : db.Category,
        }
    ]
    }
  );
}
async function getById(id, callback) {
  getProduct(id)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}
async function update(id, params) {
  const Product = await getProduct(id);
  const nameChanged = params.product_name && params.product_name !== Product.product_name;
  if (
    nameChanged &&
    (await db.Product.findOne({ where: { product_name: params.product_name } }))
  ) {
    return "Product with name " + params.product_name + " is already exists";
  }
  Object.assign(Product, params);
  await Product.save();
  return Product;
}
async function create(params) {
  if (await db.Product.findOne({ where: { product_name: params.product_name } })) {
    return "Product " + params.product_name + " is already exists";
  }
  const Product = new db.Product(params);
  await Product.save();
  return Product;
}
async function changeStatus(id) {
  const Product = await getProduct(id);
  //    const ret_msg = '';
  if (Product.product_status) {
    Product.product_status = false;
    // ret_msg = 'Camp Inactivated';
    console.log("from true");
  } else {
    Product.product_status = true;
    console.log("from false");
    // ret_msg = 'Camp Activated';
  }
  await Product.save();
  return Product;
}
async function searchByKeyword(searchKeyword) {
  const Product = await db.Product.findAll({
    where: { product_name: { [Op.like]: "%" + searchKeyword + "%" } },
  });

  if (!Product || Product == []) return "no Product found";
  return Product;
}
async function getProduct(id) {
  const Product = await db.Product.findByPk(id);
  if (!Product) return "Product not found";
  return Product;
}
async function del(did){
  return await db.Product.destroy({
    where:{
      id:did
    }
  });
}