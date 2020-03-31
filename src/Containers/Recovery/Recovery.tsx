import React, {Component} from 'react'
import { View, StyleSheet, Text, TextInput, TouchableWithoutFeedback } from 'react-native'
import {App, px, colors, fontSize} from '../../Constant/style'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import LocalValidate from '../../Components/LocalValidate'
import {Api_Login} from '../../Apis/User'
import {_setItem, _clear, _getItem} from '../../Tools/Storage'
import {password_regex} from '../../Constant/regular'
import { connect } from 'react-redux';
import { _state, _user } from '../../Constant/stateType';
import { Dispatch } from 'redux';
import { setUserBase } from '../../Reducers/User';
import ImportMnemonic from '../../Components/ImportMnemonic'
// import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
// import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import RNFS from 'react-native-fs'
import { showToast } from '../../Tools/utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    padding: px.paddingContent,
    paddingTop: 0,
  }
})
interface Props {
  navigation: any
  setUserBase: Function
}
interface State {
  mnemonic: string
  mnemonicErr: string
  password: string
  passwordErr: string
  showSelect: boolean
  mnemonicFiles: Array<any>
}
class NewWalletLast extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      mnemonic: '',
      mnemonicErr: '',
      password: '',
      passwordErr: '',
      showSelect: false,
      mnemonicFiles: []
    }
  }
  private popupDialog
  componentWillMount () {
    this.props.navigation.setParams({title: '恢复钱包'})
  }
  async clearStorage () {
    console.log("TCL: NewWalletLast -> clearStorage -> clearStorage")
    await _clear()
    let data = await _getItem('user')
    console.log("TCL: NewWalletLast -> clearStorage -> _clear", data)
    
  }
  async enter () {
    if (this.state.mnemonic === '') {
      this.setState({
        mnemonicErr: '助记次不能为空'
      })
    } else if (!new RegExp(password_regex.exp).test(this.state.password)) {
      this.setState({
        passwordErr: password_regex.errorText
      })
    } else {
      let res = await Api_Login(this.state.mnemonic, this.state.password, {loading: true})
      //  接口不通
      if (res.success) {
        let storageData = {
          token: res.data.token,
          vid: res.data.vid
        }
        if (this.props.setUserBase) {
          await _setItem('user', JSON.stringify(storageData))
          this.props.setUserBase(storageData)
        }
        this.props.navigation.navigate('Tabbars')
      }
    }
    
  }
  inputWord (value: string) {
    // value="visa property uncover immune smart whale wild very expand dress become sausage echo mind park coffee seek gather harbor conduct praise fix jump tail"
    this.setState({
      mnemonic: value,
      mnemonicErr: ''
    })
  }
  inputPwd (value: string) {
    this.setState({
      password: value,
      passwordErr: ''
    })
  }
  onSelect (index, value) {
    console.log(value)
    this.setState({
      mnemonic: value
    })
  }
  import () {
    const _this = this
    const path = RNFS.DocumentDirectoryPath
    RNFS.readDir(path)
    .then(ReadDirItem => {
      console.log(ReadDirItem)
      _this.setState({
        mnemonicFiles: ReadDirItem,
        showSelect: true
      })
    })
    .catch(err => showToast(err.message))
  }
  render () {
    return (
      <View style={styles.container}>
        <Input
          label='请输入你的助记词(用空格隔开)'
          numberOfLines={4}
          multiline={true}
          value={this.state.mnemonic}
          textChange={this.inputWord.bind(this)}
          // right={<TouchableWithoutFeedback onPress={() => this.import()}><Text style={{color: colors.font.main}}>导入</Text></TouchableWithoutFeedback>}
        />
        <LocalValidate text={this.state.mnemonicErr}/>
        <Input
          style={{marginTop: 20, marginBottom: 20}}
          label='请输入恢复密码'
          secureTextEntry={true}
          textChange={this.inputPwd.bind(this)}
        />
        <LocalValidate text={this.state.passwordErr}/>
        {/* <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          visible={this.state.showSelect}
          haveOverlay={true}
          width={0.5}
          height={0.5}
          dismissOnTouchOutside={true}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }>
          <RadioGroup
            onSelect = {this.onSelect.bind(this)}
          >
            {this.state.mnemonicFiles.map((index, value) => {
              <RadioButton value={value.path} index={index}>
                <Text>{value.name}</Text>
              </RadioButton>
            })}
          </RadioGroup>
        </PopupDialog> */}
        
        <Button type='light' pressFun={this.enter.bind(this)}>进入VOC</Button>
      </View>
    )
  }
}
const mapStateToProps = (state: _state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUserBase: (data: _user) => dispatch(setUserBase(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewWalletLast as React.ComponentType)