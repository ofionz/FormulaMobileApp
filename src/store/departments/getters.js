export function getDepartmentsList(state) {
  return state.cityList;
}
export function getDefaultCityDepartmentsList(state) {
  return state.branches.cityList[0].departmentsList;
}
export function getDefaultCityFlatDepartmentsList(state) {

  return  state.branches.cityList[0].departmentsList.map(el => el.departments).flat(Infinity)
}
