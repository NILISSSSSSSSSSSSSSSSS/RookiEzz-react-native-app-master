import React, {Component} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Clipboard, ScrollView, Alert, Switch } from 'react-native';
import Input from '../../Components/Input'
import ButtonGhost from '../../Components/ButtonGhost'
import { px, App, colors, fontSize } from '../../Constant/style';
import { inputFloat, inputInt, showToast, formatCurrency } from '../../Tools/utils';
import { Api_Edit, Api_Detail, Api_Charge } from '../../Apis/Bid';
import LocalValidate from '../../Components/LocalValidate'
import HocWalletBanlance from '../../Components/HocWalletBanlance'
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    padding: px.paddingContent,
    paddingTop: 0,
  },
  cellSpace: {
    marginTop: 20
  },
  dialogBtnText: {
    fontSize: fontSize.normal,
    color: colors.font.label
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
    contentIsLink: boolean
  }
  leftAmount: string
  chargeAmount: string
  visibleChargeDialog: boolean
  walletMoney: string
  count: string
  localValidateMsg: string
}
class EditAd extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      formData: {
        unitPrice: '',
        title: '',
        content: '',
        link: '',
        contentIsLink: false
      },
      leftAmount: '',
      chargeAmount: '',
      visibleChargeDialog: false,
      walletMoney: '',
      count: '',
      localValidateMsg: ''
    }
  }
  private chargeDialog
  componentWillMount () {
    let myad = this.props.navigation.getParam('myad')
    console.log('myad: ', myad);
    if (myad) {
      this.getInfo(myad)
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
  async getInfo (adId) {
    let res = await Api_Detail({adId})
    if (res.success) {
      this.setState({
        formData: {
          unitPrice: res.data.unitPrice,
          title: res.data.title,
          content: res.data.content,
          link: res.data.link,
          contentIsLink: res.data.contentIsLink
        },
        leftAmount: res.data.leftAmount
      })
    }
  }
  titleChange(value) {
    this.setState({
      formData: {...this.state.formData, title: value}
    })
  }
  contentChange (value) {
    this.setState({
      formData: {...this.state.formData, content: value}
    })
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
      if (key !== 'link' && key !== 'contentIsLink' && this.state.formData[key].trim() === '') {
        this.setState({
          localValidateMsg: '所有项都必填，请检查后重试'
        })
        return false
      }
    }
    if (Number(this.state.formData.unitPrice) === 0) {
      this.setState({
        localValidateMsg: '观看每次付费必须大于0'
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
  preview () {
    if (this.state.formData.contentIsLink) {
      this.props.navigation.navigate('LinkUri', {type: 'uri', uri: this.state.formData.content})
    } else {
      this.props.navigation.navigate('LinkUri', {type: 'html', data: this.state.formData.content})
    }
  }
  payChange (value) {
    this.setState({
      formData: {...this.state.formData, unitPrice: inputFloat(value)}
    })
  }
  chargeInput (value) {
    this.setState({
      chargeAmount: inputFloat(value)
    })
  }
  showChargeDialog () {
    console.log(this.chargeDialog)
    this.setState({
      visibleChargeDialog: true
    })
  }
  closeChargeDialog () {
    this.setState({
      visibleChargeDialog: false
    })
  }
  async charge () {
    if (this.state.chargeAmount === '') {
      return
    }
    let res = await Api_Charge(this.state.chargeAmount, {loading: true})
    console.log('res=', res)
    if (res.success) {
      showToast('充值成功')
      this.setState({
        visibleChargeDialog: false,
        leftAmount: (Number(this.state.leftAmount) + Number(this.state.chargeAmount)).toString(),
        walletMoney: this.state.walletMoney
        ? (Number(this.state.walletMoney) - Number(this.state.chargeAmount)).toString()
        : (Number(this.getBanlanceByCurrency('VOCD')) - Number(this.state.chargeAmount)).toString()
      })
    }
  }
  pub () {
    if (!this.localValidate()) {
      return
    }
    this.setState({
      formData: this.state.formData
    }, async () => {
      console.log(this.state.formData)
      let res = await Api_Edit(this.state.formData, {loading: true})
      if (res.success) {
        showToast('修改成功')
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
          value={this.state.formData.title}
          textChange={this.titleChange.bind(this)}
        />
        <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}, styles.cellSpace]}>
          <Text style={{color: colors.font.explain, fontSize: fontSize.small}}>广告内容是否内嵌外部网页</Text>
          <Switch value={this.state.formData.contentIsLink} onValueChange={this.switchContentType.bind(this)}></Switch>
        </View>
        <Input
          style={styles.cellSpace}
          label='内容（200字以内）'
          laeblAddon = {<Text style={{color: colors.font.active}} onPress={() => this.preview()}>预览</Text>}
          numberOfLines={6}
          minHeight={80}
          multiline={true}
          value={this.state.formData.content}
          textChange={this.contentChange.bind(this)}
          right={<TouchableOpacity onPress={this.paste.bind(this)}><Text style={{color: colors.font.active}}>粘贴</Text></TouchableOpacity >}
        />
        <Input
          style={styles.cellSpace}
          label='链接地址（若无，可不填）'
          value={this.state.formData.link}
          textChange={this.addressChange.bind(this)}
        />
        <Input
          style={styles.cellSpace}
          label='观看每次付费'
          value={this.state.formData.unitPrice}
          textChange={this.payChange.bind(this)}
        />
        <LocalValidate text={this.state.localValidateMsg} />
        <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 10, flexWrap: 'wrap'}}>
          <Text style={{fontSize: fontSize.small, color: colors.font.label}}>广告余额： {formatCurrency(this.state.leftAmount)} VOCD</Text>
          <Text style={{color: colors.font.active, marginLeft: 10}} onPress={() => this.showChargeDialog()}>充值</Text>
        </View>
        <Text style={{fontSize: fontSize.small, marginTop: 10, lineHeight: 20, color: colors.font.label}}>最大可充值数： {formatCurrency(this.state.walletMoney || this.getBanlanceByCurrency('VOCD'))} VOCD</Text>
        <View style={{alignItems: 'flex-end'}}>
          <ButtonGhost
            style={{marginTop: 40}}
            text="发布"
            pressFun={this.pub.bind(this)}
          />
        </View>
        </ScrollView>
        <Dialog
          height={190}
          visible={this.state.visibleChargeDialog}
          footer={
            <DialogFooter>
              <DialogButton
                textStyle={styles.dialogBtnText}
                text="取消"
                onPress={() => this.closeChargeDialog()}
              />
              <DialogButton
                textStyle={styles.dialogBtnText}
                text="确认"
                onPress={() => this.charge()}
              />
            </DialogFooter>
          }
          dialogTitle={<DialogTitle textStyle={{fontSize: fontSize.large}} title="输入充值数量" />}
        >
          <DialogContent>
            <Input
              inputTextColor={'#000'}
              label=''
              value={this.state.chargeAmount}
              textChange={this.chargeInput.bind(this)}
            ></Input>
          </DialogContent>
        </Dialog>
      </View>
    )
  }
}

export default HocWalletBanlance(EditAd)