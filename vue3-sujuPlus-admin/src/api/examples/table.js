import { requestClient } from '#/api/request';


/**
 * 获取示例表格数据
 */
async function getExampleTableApi(params) {
  return requestClient.get('/table/list', { params });
}

export { getExampleTableApi };
