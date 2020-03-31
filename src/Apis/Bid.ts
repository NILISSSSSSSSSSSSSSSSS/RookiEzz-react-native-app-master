import {postFetch} from './Index'
import {Pager, defaultPager, Addon, defaultAddon} from './ApiTypes'

interface HttpResData {
  success: boolean
  data?: object
  message?: object
}
type Publish = {
  unitPrice: string
  title: string
  content: string
  link: string
  costAmount: string
}
type edit = {
  title: string
  content: string
  link: string
  unitPrice: string
}
let returnData
returnData as HttpResData

//  /bid/publish 发布竞价广告
export const Api_Publish = async (params: Publish, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/bid/publish', {
    ...params
  }, addOn)
  return Promise.resolve(returnData)
}

//  /bid/edit 编辑竞价广告
export const Api_Edit = async (params: edit, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/bid/edit', {
    ...params
  }, addOn)
  return Promise.resolve(returnData)
}

//  /bid/list 获得竞价广告列表
export const Api_List = async (pager: Pager = defaultPager, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/bid/list', {
    ...pager
  }, addOn)
  return Promise.resolve(returnData)
}

//  /bid/broadcast 广播竞价广告
export const Api_Broadcast = async (params: {limit: number}, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/bid/broadcast', {
    ...params
  }, addOn)
  return Promise.resolve(returnData)
}

//  /bid/detail 竞价广告详情
export const Api_Detail = async (params?: {adId?: string} , addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/bid/detail', {
    ...params
  }, addOn)
  return Promise.resolve(returnData)
}

//  /bid/read 竞价广告已读上报
export const Api_Read = async (params: {adId: string, force: boolean} , addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/bid/read', {
    ...params
  }, addOn)
  return Promise.resolve(returnData)
}

//  /bid/my_list 我的竞价广告列表
export const Api_MyList = async (pager: Pager = defaultPager, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/bid/my_list', {
    ...pager
  }, addOn)
  return Promise.resolve(returnData)
}

// /bid/charge 广告充值
export const Api_Charge = async (amount: string, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/bid/charge', {
    amount
  }, addOn)
  return Promise.resolve(returnData)
}