import { requestClient } from '#/api/request';

/**
 * 获取部门列表数据
 */
async function getDeptList() {
  return requestClient.get(
    '/system/dept/list',
  );
}

/**
 * 创建部门
 * @param data 部门数据
 */
async function createDept(
  data,
) {
  return requestClient.post('/system/dept', data);
}

/**
 * 更新部门
 *
 * @param id 部门 ID
 * @param data 部门数据
 */
async function updateDept(
  id,
  data,
) {
  return requestClient.put(`/system/dept/${id}`, data);
}

/**
 * 删除部门
 * @param id 部门 ID
 */
async function deleteDept(id) {
  return requestClient.delete(`/system/dept/${id}`);
}

export { createDept, deleteDept, getDeptList, updateDept };
