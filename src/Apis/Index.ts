import fetchApi from '../Tools/fetchApi'

export const postFetch = async (url: string, body: object, addOn: any) => {
  let returnData = await fetchApi(url, {
    method: 'POST',
    body: JSON.stringify(body)
  }, addOn)
  return Promise.resolve(returnData)
}