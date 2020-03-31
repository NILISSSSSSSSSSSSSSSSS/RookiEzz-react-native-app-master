import React, {Component} from 'react'
import { Text, Modal, View } from 'react-native';
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor'
import ImagePicker from 'react-native-image-picker'
import ButtonGhost from '../Components/ButtonGhost'
import {App} from '../Constant/style'
import { uploadImage, showToast } from '../Tools/utils'
import store from '../Reducers/'

interface Props {
  visible: boolean
  btnAction: Function
}

export default class RichEditor extends Component<Props> {
  constructor (props: object) {
    super(props as Props)
  }
  private richtext
  componentWillUpdate (nextProps) {
    console.log(nextProps)
    if (nextProps.visible && this.richtext) {
      this.richtext.focusContent()
    }
  }
  componentDidMount () {
    if (this.richtext) {
      this.richtext.focusContent()
    }
  }
  insertImage () {
    const options = {
      title: '请选择图片来源',
      cancelButtonTitle:'取消',
      takePhotoButtonTitle:'拍照',
      chooseFromLibraryButtonTitle:'相册图片'
    }
    ImagePicker.showImagePicker(options, res => {
      console.log(res)
      if (res.didCancel) {
        console.log('cancel')
      }else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        store.dispatch({type: 'SET_LOADING', loading: true})
        uploadImage({uri: res.uri, fileName: res.fileName, type: res.type})
        .then(uploadRes => {
          store.dispatch({type: 'SET_LOADING', loading: false})
          if (uploadRes.success) {
            this.richtext.insertImage({src: `https://${uploadRes.data}`})
          } else {
            showToast(uploadRes.message)
          }
        })
        .catch(err => {
          store.dispatch({type: 'SET_LOADING', loading: false})
        })
      }
    });
  }
  async getContentHtml () {
    let res = await this.richtext.getContentHtml()
    console.log('res', res)
    this.props.btnAction({action: 'save', data: res})
  }
  render () {
    return (
      <View>
        <Modal
          transparent={false}
          animationType="slide"
          visible={this.props.visible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, padding: 10, backgroundColor: App.bg}}>
            <ButtonGhost text="关闭" pressFun={() => this.props.btnAction({action: 'close'})}/>
            <ButtonGhost text="保存" pressFun={() => this.getContentHtml()}/>
          </View>
          <RichTextEditor
            style={{marginTop: 20}}
            ref={(r) => this.richtext = r}
            hiddenTitle={true}
            insertImage={() => {console.log(123)}}
            initialContentHTML={''}
          />
          <RichTextToolbar
            getEditor={() => this.richtext}
            onPressAddImage={this.insertImage.bind(this)}
          />
        </Modal>
      </View>
    )
  }
}