import { requestClient } from '#/api/request';

/**
 * 发起数组请求
 * @param params
 * @param type 'brackets' | 'comma' | 'indices' | 'repeat'
 * @returns {Promise<*>}
 */
async function getParamsData(
  params,
  type,
) {
  return requestClient.get('/status', {
    params,
    paramsSerializer: type,
    responseReturn: 'raw',
  });
}

export { getParamsData };
