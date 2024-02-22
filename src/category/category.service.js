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
  return await db.Category.findAll();
}
async function getById(id, callback) {
  getCategory(id)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}
async function update(id, params) {
  const Category = await getCategory(id);
  const nameChanged = params.category_name && params.category_name !== Category.category_name;
  if (
    nameChanged &&
    (await db.Category.findOne({ where: { category_name: params.category_name } }))
  ) {
    return "Category with name " + params.category_name + " is already exists";
  }
  Object.assign(Category, params);
  await Category.save();
  return Category;
}
async function create(params) {
  if (await db.Category.findOne({ where: { category_name: params.category_name } })) {
    return "Category " + params.category_name + " is already exists";
  }
  const Category = new db.Category(params);
  await Category.save();
  return Category;
}
async function changeStatus(id) {
  const Category = await getCategory(id);
  //    const ret_msg = '';
  if (Category.category_status) {
    Category.category_status = false;
    // ret_msg = 'Camp Inactivated';
    console.log("from true");
  } else {
    Category.category_status = true;
    console.log("from false");
    // ret_msg = 'Camp Activated';
  }
  await Category.save();
  return Category;
}
async function searchByKeyword(searchKeyword) {
  const Category = await db.Category.findAll({
    where: { category_name: { [Op.like]: "%" + searchKeyword + "%" } },
  });

  if (!Category || Category == []) return "no Category found";
  return Category;
}
async function getCategory(id) {
  const Category = await db.Category.findByPk(id);
  if (!Category) return "Category not found";
  return Category;
}
async function del(did){
  return await db.Category.destroy({
    where:{
      id:did
    }
  });
}