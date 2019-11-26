// @flow
import React, { PureComponent } from "react"
import {View, Text, Image} from "react-native"
import { NativeMethodsMixinType } from "react-native/Libraries/Renderer/shims/ReactNativeTypes"
import { DraggableObject } from "./types"
import {switchcase} from "../../Utils";

type Props = {
  draggable: DraggableObject,
  // Called when user taps on a tag
  onPress: (draggable: DraggableObject) => void,
  // Called after a tag is rendered
  onRender: (
    draggable: DraggableObject,
    screenX: number,
    screenY: number,
    width: number,
    height: number
  ) => void,
  renderItem: (item: DraggableObject, onPress: void) => void
}

export default class Draggable extends PureComponent {
  props: Props

  container: ?NativeMethodsMixinType

  // getTagStyle = (): {} => ({
  //   ...styles.draggable,
  //   ...(this.props.draggable.isBeingDragged ? styles.tagBeingDragged : {}),
  // });

  // Call view container's measure function to measure tag position on the screen
  onLayout = (): void => {
    this.container && this.container.measure(this.onMeasure)
  }

  renderItem = (item, onPress) =>  switchcase({
    "fire": <Image source={require('../../Assets/fire-list.png')} style={{
      resizeMode: 'contain',
      width: 40,
      height: 40,
      marginVertical: 10
    }}/>,
    "water": <Image source={require('../../Assets/water-list.png')} style={{
      resizeMode: 'contain',
      width: 40,
      height: 40,
      marginVertical: 10
    }}/>,
    "wind": <Image source={require('../../Assets/earth-list.png')} style={{
      resizeMode: 'contain',
      width: 40,
      height: 40,
      marginVertical: 10
    }}/>,
  })(item.name);

  // Pass tag coordinates up to the parent component
  onMeasure = (
    x: number,
    y: number,
    width: number,
    height: number,
    screenX: number,
    screenY: number
  ): void => {
    this.props.onRender(this.props.draggable, screenX, screenY, width, height)
  }

  onPress = (): void => {
    this.props.onPress(this.props.draggable)
  }

  render() {
    const { draggable } = this.props;
    return (
      <View ref={el => (this.container = el)} onLayout={this.onLayout}>
        {this.renderItem(draggable, this.onPress)}
      </View>
    )
  }
}
