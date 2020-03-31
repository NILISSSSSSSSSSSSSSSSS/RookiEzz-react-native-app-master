import React, {Component} from 'react'
import { Text, View, Picker } from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import RNFS from 'react-native-fs'
import Button from './Button'
import { showToast } from '../Tools/utils'
interface Props {
  selectedFun: Function
}
interface State {
  mnemonic: string
  mnemonicFiles: Array<any>
}
export default class ImportMnemonic extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      mnemonic: '',
      mnemonicFiles: []
    }
  }
  componentWillMount () {
    this.import()
  }
  import () {
    const path = RNFS.DocumentDirectoryPath
    RNFS.readDir(path)
    .then(ReadDirItem => {
      console.log(ReadDirItem)
      this.setState({mnemonicFiles: ReadDirItem})
    })
    .catch(err => showToast(err.message))
  }
  onSelect (index, value) {
    console.log(value)
    this.props.selectedFun(value)
  }
  render () {
    return (
      <View >
        <RadioGroup
          onSelect = {this.onSelect.bind(this)}
        >
          {this.state.mnemonicFiles.map(() => {
            <RadioButton value={'item1'} >
              <Text>This is item #1</Text>
            </RadioButton>
          })}
        </RadioGroup>
      </View>
      
    )
  }
}