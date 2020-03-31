import React, {Component, ReactElement} from 'react'
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native'
import { px, colors, fontSize } from '../Constant/style';
import SingleTableHeader from './SingleTableHeader'

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  rowList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: px.paddingContent,
    paddingRight: px.paddingContent,
    width: width
  },
  tableHeader: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  tableContent: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  blackBgRow: {
    backgroundColor: '#000'
  },
  whiteFont: {
    color: colors.font.main
  },
  headerText: {
    textAlign: 'left',
    color: colors.table.header.color
  },
  contentText: {
    textAlign: 'left',
    color: colors.font.main,
    fontSize: fontSize.normal
  }
})
interface FieldItem {
  label: string
  key: any
  formate?: Function
  textStyle?: Function
  ownComp?: Function
}
interface Props {
  addon?: ReactElement
  tableName?: string
  data: Array<any>
  field: Array<FieldItem>
}

interface State {
  cellWidthStyle: object
}

export default class TableList extends Component<Props, State> {
  constructor (props: object) {
    super(props as Props)
    this.state = {
      cellWidthStyle:{width: (width - 2 * px.paddingContent) / this.props.field.length}
    }
  }
  HeaderComp () {
    return (
      <View style={[styles.rowList, styles.tableHeader, styles.blackBgRow]}>
        {this.props.field.map((item,keyIndex) => 
          <View style={this.state.cellWidthStyle} key={keyIndex}><Text style={styles.headerText}>{item.label}</Text></View>
        )}
      </View>
    )
  }
  colCellData (listItem, key, index) {
    if (key === 'index_custom') {
      return index + 1
    }
    return listItem[key]
  }
  keyArray (item, listItem) {
    let tempValueArr = []
    item.key.map((keyItem) => {
      tempValueArr.push(listItem[keyItem])
    })
    return item.formate(tempValueArr)
  }
  renderItem (item: {item: any, index: number}) {
    const index = item.index
    const listItem = item.item
    const bgStyle = index % 2 === 1 && styles.blackBgRow
    
    return (
      <View style={[styles.rowList, styles.tableContent, bgStyle]}>
        {this.props.field.map((item, i) => 
          item.key?
          <View key={i} style={this.state.cellWidthStyle}>
            {
              item.key instanceof Array?
              this.keyArray(item, listItem):
              (item.ownComp? item.ownComp({...listItem, index_custom: index}): <Text style={[styles.contentText, item.textStyle? item.textStyle(this.colCellData(listItem, item.key, index)): {}]}>{item.formate? item.formate(this.colCellData(listItem, item.key, index)): this.colCellData(listItem, item.key, index)}</Text>)
            }
          </View>
          :null
        )}
        <View style={this.state.cellWidthStyle}>{this.props.addon || null}</View>
      </View>
    )
  }
  render () {
    return (
      <View>
        {this.props.tableName?
          (
            <SingleTableHeader
              text={this.props.tableName}
            />
          ):
          null
        }
        <FlatList
          keyExtractor={(item,index) => index.toString()}
          ListHeaderComponent={this.HeaderComp.bind(this)}
          data={this.props.data}
          renderItem={(item) => this.renderItem(item)}
        />
      </View>
    )
  }
}