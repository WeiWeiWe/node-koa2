/**
 * @description 個人主頁 test
 */

const server = require('../server')
const { COOKIE, USER_NAME } = require('../testUserInfo')

test('個人主頁，加載第一頁數據，應該成功', async () => {
  const res = await server
    .get(`/api/profile/loadMore/${USER_NAME}/0`)
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)

  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})