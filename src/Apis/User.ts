import {postFetch} from './Index'
import {Pager, defaultPager, Addon, defaultAddon} from './ApiTypes'

interface HttpResData {
  success: boolean
  data?: object
  message?: object
}

type AwardType = 'LUCK20' | 'TOP10' | 'GP' | 'TOP_VOCK'

let returnData
returnData as HttpResData

//  /user/signup 用户注册
export const Api_SignUp = async (password: string, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/signup', {
    password
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/login 用户登录
export const Api_Login = async (mnemonic: string, password: string, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/login', {
    password,
    mnemonic
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/edit_nickname 编辑用户昵称
export const Api_EditNickName = async (nickname: string, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/edit_nickname', {
    nickname
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/asset 资产
export const Api_Asset = async (currencies: Array<string>, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/asset', {
    currencies
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/address 获取币种地址
export const Api_Address = async (currency:string, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/address', {
    currency
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/account_records 获取流水账
export const Api_Records = async (currency: string, pager: Pager = defaultPager , addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/account_records', {
    currency,
    ...pager
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/getvid 获得vid
export const Api_GetVid = async (parentVid:string, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/getvid', {
    parentVid
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/myvid 我的VID
export const Api_MyVid = async (addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/myvid', {
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/subscription 用户认购基金
export const Api_Subscription = async (amount:string, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/subscription', {
    amount
  }, addOn)
  return Promise.resolve(returnData)
}

// ------------------

//  /user/redeem_notice 用户赎回基金提示
export const Api_RedeemNotice = async (addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/redeem_notice', {
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/redeem 用户赎回基金
export const Api_Redeem = async (addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/redeem', {
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/vid_statis vid统计面板
export const Api_VidStatis = async (addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/vid_statis', {
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/invite_list 邀请收益列表
export const Api_InviteList = async (pager: Pager = defaultPager, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/invite_list', {
    ...pager
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/invite_list voc投资收益列表
export const Api_InvestList = async (pager: Pager = defaultPager, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/invest_list', {
    ...pager
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/net 用户网络
export const Api_TrustNet = async (addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/net', {
  }, addOn)
  return Promise.resolve(returnData)
}

//  GP奖励
export const Api_AwardList_Gp = async (page: Pager = defaultPager, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/award_list', {
    ...page,
    type: 'GP'
  }, addOn)
  return Promise.resolve(returnData)
}

//  VOCK奖励
export const Api_AwardList_Vock = async (page: Pager = defaultPager, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/award_list', {
    ...page,
    type: 'TOP_VOCK'
  }, addOn)
  return Promise.resolve(returnData)
}
//  /user/award_list LUCK或TOP奖品列表
export const Api_AwardList = async (type: AwardType, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/award_list', {
    type
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/luck_statis LUCK的统计面板
export const Api_LuckStatis = async (addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/luck_statis', {
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/top_statis TOP的统计面板
export const Api_TopStatis = async (addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/top_statis', {
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/gp_statis GP的统计面板
export const Api_GpStatis = async (addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/gp_statis', {
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/my_award 我的LUCK或TOP奖品列表
export const Api_MyAward = async (type: AwardType, pager: Pager = defaultPager, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/my_award', {
    type,
    ...pager
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/receive_award 领取奖励
export const Api_ReceiveAward = async (type: 'VID_AWARD' | 'LUCK' | 'TOP' | 'GP', addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/receive_award', {
    type,
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/resonance_info 沉淀页面展示
export const Api_ResonanceInfo = async (addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/resonance_info', {
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/my_resonance_info 我的沉淀信息
export const Api_MyResonanceInfo = async (addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/my_resonance_info', {
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/resonance 沉淀
export const Api_Resonance = async (amount: string, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/resonance', {
    amount
  }, addOn)
  return Promise.resolve(returnData)
}

//  /user/trans 发送币给他人
export const Api_Trans = async (obj, addOn: Addon = defaultAddon) => {
  returnData = await postFetch('/user/trans', {
    ...obj
  }, addOn)
  return Promise.resolve(returnData)
}