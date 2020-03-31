import React, {Component} from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { px, App, colors, fontSize } from '../../Constant/style'
import ButtonGhost from '../../Components/ButtonGhost'
import ButtonIcon from '../../Components/ButtonIcon'
import TableList from '../../Components/TableList'
import {nextBroadcaseTime, showToast} from '../../Tools/utils'
import { Api_List, Api_MyList } from '../../Apis/Bid'
import { Api_EditNickName } from '../../Apis/User'
import Dialog, { DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog'
import Input from '../../Components/Input'
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: App.bg,
    paddingBottom: px.paddingContent
  },
  title: {
    color: colors.font.main,
    fontSize: fontSize.xl
  },
  content: {
    color: colors.font.explain,
    fontSize: fontSize.large,
    lineHeight: 22,
    marginTop: 10
  },
  summary: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: px.paddingContent,
    paddingRight: px.paddingContent,
    backgroundColor: colors.listBg,
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: fontSize.small,
    color: colors.font.label,
    width: 90,
    textAlign: 'left'
  },
  value: {
    fontSize: fontSize.large,
    color: colors.font.main
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: px.paddingContent,
    marginTop: 15,
    alignItems: 'center'
  },
  dialogBtnText: {
    fontSize: fontSize.normal,
    color: colors.font.label
  }
})

interface Props {
  navigation: any
}
interface State {
  data: {
    list: Array<any>
    total: number
    myRank: number
    nickname: string
    totalCost: string
  },
  myad: string
  visibleDialog: boolean
  nickname: string
}
export default class Bidding extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      data: {
        list: [],
        total: 0,
        myRank: 0,
        nickname: '',
        totalCost: '0'
      },
      myad: '',
      visibleDialog: false,
      nickname: ''
    }
  }
  componentDidMount () {
    this.getData()
    this.getMyAd()
  }
  dialogControl (value: boolean) {
    this.setState({
      visibleDialog: value
    })
  }
  nickNameInput (value) {
    if (value.length > 10) {
      return
    }
    this.setState({
      nickname: value
    })
  }
  async setNickName () {
    let res = await Api_EditNickName(this.state.nickname, {loading: true})
    if (res.success) {
      this.setState({
        data: {...this.state.data, nickname: this.state.nickname}
      })
    }
    this.dialogControl(false)
  }
  async getData () {
    let res = await Api_List()
    if (res.success) {
      this.setState({
        data: res.data,
        nickname: res.data.nickname
      })
    }
  }
  async getMyAd () {
    let res = await Api_MyList()
    if (res.success) {
      if (res.data.total > 0) {
        this.setState({
          myad: res.data.list[0]._id
        })
      }
    }
  }
  editAd () {
    if (this.state.myad) {
      console.log('this.state.myad: ', this.state.myad);
      this.props.navigation.navigate('EditAd', {myad: this.state.myad})
    } else {
      showToast('您尚未拥有可编辑的广告')
    }
  }
  render () {
    const content = `
            VOC VID是基于对VOC项目及生态系统抱有信仰，通过以信任为基石的VID链接构建起共识生态，并且在生态中享有高额的理财回报。
    `
    const field = [
      {
        label: '名次',
        key: 'index_custom',
        ownComp: ({index_custom, isSelf}) => {
          if (isSelf) {
            return (<Text style={{color: colors.font.main}}>*{index_custom + 1}</Text>)
          }
          return (<Text style={{color: colors.font.main}}>{index_custom + 1}</Text>)
        }
      },
      {label: 'VID', key: 'vid'},
      {label: '竞价金额', key: 'unitPrice'},
      {
        label: '剩余次数',
        key: 'leftAmount',
        ownComp: ({leftAmount, unitPrice}) => {
          return (<Text style={{color: colors.font.main}}>{Math.floor(leftAmount / unitPrice)}</Text>)
        }
      }
    ]
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={{paddingLeft: px.paddingContent, paddingRight: px.paddingContent}}>
          <Text style={styles.title}>竞价头条规则</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
        
        <View style={styles.summary}>
          <View style={styles.row}>
          <View style={styles.cell}>
              <Text style={styles.label}>当前总数</Text>
              <Text style={[styles.value, {width: 80}]}>{this.state.data.total}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>我的昵称</Text>
              {
                this.state.data.nickname?
                <Text style={[styles.value, {width: 80}]}>{this.state.data.nickname}</Text>:
                <Icon style={[styles.value, {width: 80}]} name="md-create" color={colors.font.main} size={14} onPress={() => this.dialogControl(true)}/>
              }
            </View>
            
          </View>
          <View style={[styles.row, {marginTop: 15}]}>
            <View style={styles.cell}>
              <Text style={styles.label}>我的排名</Text>
              <Text style={styles.value}>{this.state.data.myRank || '-'}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>广告消费总额</Text>
              <Text style={[styles.value, {width: 80}]}>{this.state.data.totalCost}</Text>
            </View>
          </View>
        </View>
      
        <View style={styles.btns}>
          
          <ButtonIcon
            style={{marginLeft: 15}}
            text='编辑头条'
            pressFun={()=> this.editAd()}
          />
          <ButtonGhost
            style={{marginLeft: 15}}
            text='发布头条'
            pressFun={() => this.props.navigation.navigate('CreateAd')}
          />
        </View>
      
        <View>
          <TableList 
            tableName='目前的竞价头条排名'
            field={field}
            data={this.state.data.list}
          />
        </View>
        </ScrollView>
        <Dialog
          height={190}
          visible={this.state.visibleDialog}
          footer={
            <DialogFooter>
              <DialogButton
                textStyle={styles.dialogBtnText}
                text="取消"
                onPress={() => this.dialogControl(false)}
              />
              <DialogButton
                textStyle={styles.dialogBtnText}
                text="确认"
                onPress={() => this.setNickName()}
              />
            </DialogFooter>
          }
          dialogTitle={<DialogTitle textStyle={{fontSize: fontSize.large}} title="输入昵称（只允许设置一次）" />}
        >
          <DialogContent>
            <Input
              inputTextColor={'#000'}
              label=''
              value={this.state.nickname}
              textChange={this.nickNameInput.bind(this)}
            ></Input>
          </DialogContent>
        </Dialog>
      </View>
    )
  }
}