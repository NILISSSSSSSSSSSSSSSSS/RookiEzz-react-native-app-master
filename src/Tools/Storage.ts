import AsyncStorage from "@react-native-community/async-storage"

export const _setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("TCL: _setItem -> error", error)
  }
}

export const _getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      return value
    }
   } catch (error) {
     console.log("TCL: _getItem -> error", error)
     // Error retrieving data
   }
}

export const _clear = async () => {
  return new Promise(async (resolve, reject) => {
    await AsyncStorage.clear()
    return resolve()
  })
  
}