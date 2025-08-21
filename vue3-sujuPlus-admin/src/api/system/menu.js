
import { requestClient } from '#/api/request';

/**
 * 获取菜单数据列表
 */
async function getMenuList() {
  return requestClient.get(
    '/system/menu/list'
  );
}

async function isMenuNameExists(
  name,
  id,
) {
  return requestClient.get('/system/menu/name-exists', {
    params: { id, name },
  });
}

async function isMenuPathExists(
  path,
  id,
) {
  return requestClient.get('/system/menu/path-exists', {
    params: { id, path },
  });
}

/**
 * 创建菜单
 * @param data 菜单数据
 */
async function createMenu(
  data,
) {
  return requestClient.post('/system/menu', data);
}

/**
 * 更新菜单
 *
 * @param id 菜单 ID
 * @param data 菜单数据
 */
async function updateMenu(
  id,
  data,
) {
  return requestClient.put(`/system/menu/${id}`, data);
}

/**
 * 删除菜单
 * @param id 菜单 ID
 */
async function deleteMenu(id) {
  return requestClient.delete(`/system/menu/${id}`);
}

export {
  createMenu,
  deleteMenu,
  getMenuList,
  isMenuNameExists,
  isMenuPathExists,
  updateMenu,
};
