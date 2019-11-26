// @flow
import React, { PureComponent } from "react"
import { View, Text } from "react-native"
import type { NativeMethodsMixinType } from "react-native/Libraries/Renderer/shims/ReactNativeTypes"
import type { DraggableObject } from "../types"

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
    const { draggable } = this.props
    return (
      <View ref={el => (this.container = el)} onLayout={this.onLayout}>
        {this.props.renderItem(draggable, this.onPress)}
      </View>
    )
  }
}
