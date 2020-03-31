import React, {Component} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Clipboard, ScrollView, Switch } from 'react-native';
import Input from '../../Components/Input'
import ButtonGhost from '../../Components/ButtonGhost'
import { px, App, colors, fontSize } from '../../Constant/style';
import { inputFloat, inputInt, showToast, formatCurrency } from '../../Tools/utils';
import { Api_Publish } from '../../Apis/Bid';
import LocalValidate from '../../Components/LocalValidate'
import HocWalletBanlance from '../../Components/HocWalletBanlance'
// import RichEditor from '../../Components/RichEditor'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    padding: px.paddingContent,
    paddingTop: 0,
  },
  cellSpace: {
    marginTop: 20
  }
})

interface Props {
  navigation: any
  asset: any
}
interface State {
  formData: {
    unitPrice: string
    title: string
    content: string
    link: string
    costAmount: string
    contentIsLink: boolean
  }
  count: string
  localValidateMsg: string
  modalVisible: boolean
}
class CreateAd extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      formData: {
        unitPrice: '',
        title: '',
        content: '',
        link: '',
        costAmount: '',
        contentIsLink: false
      },
      count: '',
      localValidateMsg: '',
      modalVisible: false
    }
  }
  getBanlanceByCurrency (currency: string) {
    let banlance = '0'
    if (this.props.asset.length > 0) {
      let currencyObj = this.props.asset.find(item => item.currency === currency)
      if (currencyObj) {
        banlance = currencyObj.available 
      }
    }
    return banlance
  }
  titleChange(value) {
    this.setState({
      formData: {...this.state.formData, title: value}
    })
  }
  contentChange (value) {
    console.log('content', value)
    this.setState({
      formData: {...this.state.formData, content: value}
    })
  }
  preview () {
    if (this.state.formData.contentIsLink) {
      this.props.navigation.navigate('LinkUri', {type: 'uri', uri: this.state.formData.content})
    } else {
      this.props.navigation.navigate('LinkUri', {type: 'html', data: this.state.formData.content})
    }
  }
  showModal () {
    console.log('showModal')
    this.setState({
      modalVisible: true
    })
  }
  modalAction (res) {
    console.log(res)
    switch (res.action) {
      case 'close':
        this.setState({
          modalVisible: false
        })
        break;
      case 'save':
        this.contentChange(res.data)
        this.setState({
          modalVisible: false
        })
        break;
      default:
        break;
    }
  }
  addressChange (value) {
    this.setState({
      formData: {...this.state.formData, link: value}
    })
  }
  async paste () {
    let content = await Clipboard.getString()
    this.contentChange(content)
  }
  localValidate () {
    for(let key in this.state.formData) {
      if (key !== 'costAmount' && key !== 'link' && key !== 'contentIsLink' && this.state.formData[key].trim() === '') {
        this.setState({
          localValidateMsg: '所有项都必填，请检查后重试'
        })
        return false
      }
    }
    if (Number(this.state.formData.unitPrice) * Number(this.state.count) === 0) {
      this.setState({
        localValidateMsg: '观看每次付费，期望被观看数必须大于0'
      })
      return false
    }
    
    return true
  }
  countChange (value) {
    this.setState({
      count: inputInt(value)
    })
  }
  switchContentType (value) {
    this.setState({
      formData: {...this.state.formData, contentIsLink: value}
    })
  }
  payChange (value) {
    this.setState({
      formData: {...this.state.formData, unitPrice: inputFloat(value)}
    })
  }
 pub () {
    if (!this.localValidate()) {
      return
    }
    this.setState({
      formData: {...this.state.formData, costAmount: (Number(this.state.formData.unitPrice) * Number(this.state.count)).toString()}
    }, async () => {
      console.log(this.state.formData)
      let res = await Api_Publish(this.state.formData, {loading: true})
      if (res.success) {
        showToast('发布成功')
        this.props.navigation.navigate('HeadLine')
      }
    })
    
  }
  render () {
    return (
      <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          label='标题'
          textChange={this.titleChange.bind(this)}
        />
        {/* <ButtonGhost style={styles.cellSpace} text='编辑内容' pressFun={this.showModal.bind(this)}/> */}
        <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}, styles.cellSpace]}>
          <Text style={{color: colors.font.explain, fontSize: fontSize.small}}>广告内容是否内嵌外部网页</Text>
          <Switch value={this.state.formData.contentIsLink} onValueChange={this.switchContentType.bind(this)}></Switch>
        </View>
        <Input
          style={styles.cellSpace}
          label='内容（200字以内）'
          minHeight={80}
          laeblAddon = {<Text style={{color: colors.font.active}} onPress={() => this.preview()}>预览</Text>}
          numberOfLines={6}
          multiline={true}
          textChange={this.contentChange.bind(this)}
          value={this.state.formData.content}
          right={<TouchableOpacity onPress={this.paste.bind(this)}><Text style={{color: colors.font.active}}>粘贴</Text></TouchableOpacity >}
        />
        <Input
        style={styles.cellSpace}
          label='链接地址(若无，可不填)'
          textChange={this.addressChange.bind(this)}
        />
        <Input
          style={styles.cellSpace}
          label='观看每次付费'
          type='numeric'
          value={this.state.formData.unitPrice}
          textChange={this.payChange.bind(this)}
        />
        <Input
          style={styles.cellSpace}
          label='期望最多被观看次数'
          type='numeric'
          value={this.state.count}
          textChange={this.countChange.bind(this)}
        />
        <LocalValidate text={this.state.localValidateMsg} />
        <Text style={{fontSize: fontSize.small, marginTop: 10, lineHeight: 20, color: colors.font.label}}>本次广告总支出=观看每次付费价格X期望被观看最多次数，请确保当前余额＞本次广告总支出</Text>
        <Text style={{fontSize: fontSize.small, marginTop: 10, lineHeight: 20, color: colors.font.label}}>钱包余额： {formatCurrency(this.getBanlanceByCurrency('VOCD'))} VOCD</Text>
        <View style={{alignItems: 'flex-end'}}>
          <ButtonGhost
            style={{marginTop: 40}}
            text="发布"
            pressFun={this.pub.bind(this)}
          />
        </View>
        {/* <RichEditor
          visible={this.state.modalVisible}
          btnAction={this.modalAction.bind(this)}
        /> */}
      </ScrollView>
      </View>
    )
  }
}

export default HocWalletBanlance(CreateAd)