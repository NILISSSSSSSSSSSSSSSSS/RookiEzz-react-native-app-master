import React, {Component} from 'react'
import { Text, View } from 'react-native';
import RNFS from 'react-native-fs'
import Button from './Button'
import { showToast } from '../Tools/utils'
interface Props {
  mnemonic: string
}

export default class ExportMnemonic extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  import () {
    const path = RNFS.DocumentDirectoryPath
    RNFS.readDir(path)
    .then(ReadDirItem => {console.log(ReadDirItem)})
    .catch(err => console.log(err.message))
  }
  export () {
    const firstWord = this.props.mnemonic.split(' ')[0]
    const path = RNFS.DocumentDirectoryPath + `/${firstWord}-${Date.parse(new Date())}.json`
    console.log(path);
    RNFS.writeFile(path, `{mnemonic: ${this.props.mnemonic}}`, 'utf8')
    .then(() => showToast('保存成功'))
    .catch(err => showToast(`保存失败${err.message}`))
  }
  render () {
    return (
      <Button pressFun={this.export.bind(this)} type="light">导出助记词</Button>
    )
  }
}