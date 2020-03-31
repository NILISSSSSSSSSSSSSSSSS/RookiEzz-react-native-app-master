import {postFetch} from './Index'
import {Pager, defaultPager, Addon, defaultAddon} from './ApiTypes'

interface HttpResData {
  success: boolean
  data?: object
  message?: object
}


let returnData
returnData as HttpResData

//  /blind/info 获取盲拍信息
export const Api_BlindInfo = async (addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/blind/info', {
  }, addOn)
  return Promise.resolve(returnData)
}

//  /blind/history 盲拍历史
export const Api_BlindHistory = async (pager: Pager = defaultPager, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/blind/history', {
    ...pager
  }, addOn)
  return Promise.resolve(returnData)
}

//  /blind/pay 竞拍/修改竞拍
export const Api_BlindPay = async (params, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/blind/pay', {
    ...params
  }, addOn)
  return Promise.resolve(returnData)
}
