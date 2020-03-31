import React, {Component} from 'react'
import {ScrollView, Text} from 'react-native'
import {App} from '../Constant/style'
import {isBottom} from '../Tools/utils'
import { colors } from '../Constant/style'

interface Props {
  navigation: any
}
interface State {
  isBottom: boolean
  isLoading: boolean
  data: Array<any>
  page: number
  data2: Array<any>
  page2: number
  tabIndex: number
  loadingText: String
  loadingText2: String
  tempData: Array<any>
  tempData2: Array<any>
}
const HocRequestAndMore = (OldComp, api, api2?:any, list1HasPage = true):any => {
    class NewComp extends Component<Props, State> {
      constructor (props: object) {
        super(props as Props)
        this.state = {
          isBottom: false,
          isLoading: false,
          data: [],
          page: 0,
          tempData: [],
          data2: [],
          page2: 0,
          tempData2: [],
          tabIndex: 0,
          loadingText: '加载中...',
          loadingText2: '加载中...'
        }
      }
      private _navListener
      componentWillUnmount () {
        this._navListener.remove()
      }
      componentWillMount () {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          this.setState({
            page: 0,
            page2: 0
          }, () => {
            this.getData()
            this.getData2()
          })
        })
      }
      _contentViewScroll(e: any){
        const index = this.state.tabIndex
        
        if (isBottom(e) && !this.state.isLoading) {
          console.log('list1HasPage', list1HasPage)
          if (index === 0 && list1HasPage) {
            this.getData()
          } else if (index === 1) {
            this.getData2()
          } else {
            this.setState({
              loadingText: '暂无更多'
            })
          }
        }
      }
      changeIndex (index) {
        if (index === 0) {
          this.setState({
            tabIndex: index,
            data2: [],
            data: this.state.tempData
          })
        } else {
          this.setState({
            tabIndex: index,
            data: [],
            data2: this.state.tempData2
          })
        }
      }
      async getData2 () {
        if (!api2) {
          return
        }
        this.setState({
          isLoading: true,
          loadingText2: '加载中...'
        })
        let res = await api2({page: this.state.page2, limit: 20})
        if (res.success) {
          let curData = res.data.list
          let data2 = []
          if (this.state.page2 === 0) {
            data2 = curData
          } else {
            data2 = this.state.data2.concat(curData)
          }
          this.setState({
            data2: this.state.tabIndex === 0? []: data2,
            tempData2: data2,
            page2: this.state.page2 + 1
          })
          if(curData.length < 20) {
            this.setState({
              loadingText2: '暂无更多'
            })
          } else {
            this.setState({
              loadingText2: '上拉加载更多'
            })
          }
        }
        this.setState({
          isLoading: false
        })
      }
      async getData () {
        this.setState({
          isLoading: true,
          loadingText: '加载中...'
        })
        let res = await api({page: this.state.page, limit: 20})
        if (res.success) {
          let curData = res.data.list
          let data = []
          if (this.state.page === 0) {
            data = curData
          } else {
            data = this.state.data.concat(curData)
          }
          this.setState({
            data: data,
            tempData: data,
            page: this.state.page + 1
          })
          if(curData.length < 20) {
            this.setState({
              loadingText: '暂无更多'
            })
          } else {
            this.setState({
              loadingText: '上拉加载更多'
            })
          }
        }
        this.setState({
          isLoading: false
        })
      }
      render () {
        return (
          <ScrollView
            style={{flex: 1,backgroundColor: App.bg,paddingTop: 0}}
            onMomentumScrollEnd = {this._contentViewScroll.bind(this)}
          >
            <OldComp {...this.props} data={this.state.data} data2={this.state.data2} changeIndex={this.changeIndex.bind(this)}/>
            <Text style={{alignSelf: 'center', color: colors.font.label, paddingTop: 10, paddingBottom: 10}}>{this.state.tabIndex === 0? this.state.loadingText: this.state.loadingText2}</Text>
          </ScrollView>
        )
      }
    }
    return NewComp
  
}

export default HocRequestAndMore