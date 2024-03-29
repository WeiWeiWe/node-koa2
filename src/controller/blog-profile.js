/**
 * @description 個人主頁 controller
 */

const { getBlogListByUser } = require('../services/blog')
const { PAGE_SIZE } = require('../config/constant')
const { SuccessModel } = require('../model/ResModel')

/**
 * 獲取個人主頁文章列表
 * @param {string} userName 用戶名 
 * @param {number} pageIndex 當前頁面
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  const blogList = result.blogList

  // 拼接返回數據
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  getProfileBlogList
}