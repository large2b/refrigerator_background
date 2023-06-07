const getters = {
  token: state => state.administer.token,
  roles: state => state.administer.roles,
  contentCategories: state => state.content.categories,
  contents: state => state.content.contents,
  recipes: state => state.recipe.recipes,
  recipeCategories: state => state.recipe.recipeCategories,
}
export default getters