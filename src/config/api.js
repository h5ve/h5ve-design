import request from "../utils/request";

// 查询素材列表
export function getMaterialList(query) {
  return request({
    url: '/api/material/list',
    method: 'get',
    params: query
  })
}

// 查询分组下拉树结构
export function groupTree(query) {
  return request({
    url: '/api/group/groupTree',
    method: 'get',
    params: query
  })
}
