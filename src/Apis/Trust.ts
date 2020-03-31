import {postFetch} from './Index'
import {Pager, defaultPager, Addon, defaultAddon} from './ApiTypes'

interface HttpResData {
  success: boolean
  data?: object
  message?: object
}


let returnData
returnData as HttpResData

//  /trust/list 获得信任广场列表
export const Api_TrustList = async (pager: Pager = defaultPager ,addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/trust/list', {
    ...pager
  }, addOn)
  return Promise.resolve(returnData)
}

//  /trust/publish 信任广场发布招募
export const Api_TrustPublish = async (params: {needPerson: number, days: number}, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/trust/publish', {
    ...params
  }, addOn)
  return Promise.resolve(returnData)
}
