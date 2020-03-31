import {postFetch} from './Index'
import {Pager, defaultPager, Addon, defaultAddon} from './ApiTypes'

interface HttpResData {
  success: boolean
  data?: object
  message?: object
}


let returnData
returnData as HttpResData

//  /task/award_back 奖励回收,1分钟调用1次
export const Api_AwardBack = async (addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/task/award_back', {
  }, addOn)
  return Promise.resolve(returnData)
}

//  /task/caculate_voc_award 计算voc奖励，1小时1次
export const Api_VocAward = async (time: string, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/task/caculate_voc_award', {
    time
  }, addOn)
  return Promise.resolve(returnData)
}

//  /task/caculate_eth_award 计算ETH奖励,7天1次
export const Api_EthAward = async (time: string, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/task/caculate_eth_award', {
    time
  }, addOn)
  return Promise.resolve(returnData)
}
