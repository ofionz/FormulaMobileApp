export function getDepartmentsList(state) {
  return state.departmentsList;
}
export function getFlatDepartmentsList(state) {
  return  state.departmentsList.map(el => el.departments).flat()
}
