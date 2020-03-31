import React, {Component} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import RowList from '../../Components/RowList'
import Tag from '../../Components/Tag'
import {App, px, colors, fontSize} from '../../Constant/style'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import LocalValidate from '../../Components/LocalValidate'
import {_setItem} from '../../Tools/Storage'
import { connect } from 'react-redux';
import { _state, _user } from '../../Constant/stateType';
import { Dispatch } from 'redux';
import { setUserBase } from '../../Reducers/User';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    padding: px.paddingContent
  },
  explain: {
    color: colors.font.explain,
    fontSize: fontSize.small
  }
})
interface Props {
  navigation: any
  setUserBase: Function
}
interface State {
  mnemonic: string  //  顺序正常的初始助记词
  sortMnemonic: string  //  乱序的助记词
  selectMnemonic: string  //  用户排序的助记词
  errorText: any
}
class NewWalletLast extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      mnemonic: '',
      sortMnemonic: '',
      selectMnemonic: '',
      errorText: null
    }
  }
  componentDidMount () {
    const words = this.props.navigation.getParam('mnemonic')
    const sortWords = this.sortWords(words)
    this.setState({
      mnemonic: words,
      sortMnemonic: sortWords
    })
    this.props.navigation.setParams({title: '创建钱包-最后一步'})
  }
  async enter () {
    if (this.state.selectMnemonic === this.state.mnemonic) {
      let storageData = {
        token: this.props.navigation.getParam('token')
      }
      if (this.props.setUserBase) {
        await _setItem('user', JSON.stringify(storageData))
        this.props.setUserBase(storageData)
      }
      this.props.navigation.navigate('Tabbars')
    } else {
      const words = this.props.navigation.getParam('mnemonic')
      const sortWords = this.sortWords(words)
      this.setState({
        errorText: '助记词错误，请重新输入',
        selectMnemonic: '',
        sortMnemonic: sortWords
      })
    }
  }
  input (item: string) {
    let sortMnemonicArray = this.state.sortMnemonic.split(' ')
    let index = sortMnemonicArray.indexOf(item)
    sortMnemonicArray.splice(index, 1)
    this.setState({
      sortMnemonic: sortMnemonicArray.join(' '),
      selectMnemonic: this.state.selectMnemonic + (this.state.selectMnemonic === ''?`${item}` : ` ${item}`)
    })
    
  }
  delete (item: string) {
    let selectMnemonicArray = this.state.selectMnemonic.split(' ')
    let index = selectMnemonicArray.indexOf(item)
    selectMnemonicArray.splice(index, 1)
    this.setState({
      selectMnemonic: selectMnemonicArray.join(' '),
      sortMnemonic: this.state.sortMnemonic + (this.state.sortMnemonic === ''?`${item}` : ` ${item}`)
    })
  }
  sortWords (words) {
    let newWords = words.split(' ')
    newWords = newWords.sort(function() {
      return .5 - Math.random();
    });
    return newWords.join(' ')
  }
  render () {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={{color: colors.font.label}}>按顺序点击下方助记词后进入</Text>
          <RowList>
            {this.state.selectMnemonic === ''? null: 
            this.state.selectMnemonic.split(' ').map(item => 
              <TouchableOpacity
                onPress={() => this.delete(item)}
                key={item}
              >
                <Tag key={item} text={item} isSelected/>
              </TouchableOpacity>
            )}
          </RowList>
          <LocalValidate text={this.state.errorText} />
          <Button style={{marginTop: 20, marginBottom: 10}} type='light' pressFun={this.enter.bind(this)}>进入VOC</Button>
        </View>
        <RowList>
          {this.state.sortMnemonic === ''? null:
          this.state.sortMnemonic.split(' ').map(item => 
            <TouchableOpacity
              onPress={() => this.input(item)}
              key={item}
            >
              <Tag key={item} text={item} />
            </TouchableOpacity>
          )}
        </RowList>
      </ScrollView>
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