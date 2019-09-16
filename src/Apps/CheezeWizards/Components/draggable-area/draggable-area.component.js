// @flow
import React, { PureComponent } from "react"
import {
  LayoutAnimation,
  PanResponder,
  UIManager,
  Platform
} from "react-native"
import Draggable from "../draggable"
import Container from "../container"
import type { DraggableObject, GestureState } from "../../types"
import { isPointWithinArea, moveArrayElement } from "../../helpers"

type Props = {
  items: DraggableObject[],
  animationDuration: number,
  // Called when user taps 'Add new' button
  onPressAddNew: () => void,
  // Passes these two callbacks down to Tag component
  onPress: (draggable: DraggableObject) => void,
  onRenderItem: (draggable: DraggableObject) => void,
  onDragEnd: sortedItems => DraggableObject[],
  renderItem: (item: DraggableObject, onPress: void) => void,
  useKey: "id"
}

type State = {
  items: DraggableObject[],
  dndEnabled: boolean
}

export default class extends PureComponent {
  props: Props

  static defaultProps = {
    animationDuration: 150,
    useKey: "id"
  }

  panResponder: PanResponder

  state: State = {
    items: null,
    dndEnabled: true
  }

  draggableBeingDragged: ?DraggableObject

  componentWillMount = () => {
    this.panResponder = this.createPanResponder()
    // https://facebook.github.io/react-native/docs/layoutanimation.html
    // We need to do this for Android so that the animation can work.
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  componentDidMount = () => {
    const { items } = this.props
    if (items && items.length > 0) {
      this.setState({ items })
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    const { items } = this.state
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: this.props.animationDuration
    })

    // keep items in local state up to date as props change.
    if (nextProps.items && items && nextProps.items.length !== items.length) {
      this.setState({ items: nextProps.items })
    }
  }

  createPanResponder = (): PanResponder => {
    return PanResponder.create({
      // handle drag gesture
      onMoveShouldSetPanResponder: (_, gestureState: GestureState) => {
        return this.onMoveShouldSetPanResponder(gestureState)
      },
      onPanResponderGrant: (_, gestureState: GestureState) => {
        return this.onPanResponderGrant()
      },
      onPanResponderMove: (_, gestureState: GestureState) => {
        return this.onPanResponderMove(gestureState)
      },
      // Handle drop gesture
      onPanResponderRelease: (_, gestureState: GestureState) => {
        return this.onPanResponderEnd()
      },
      onPanResponderTerminate: (_, gestureState: GestureState) => {
        return this.onPanResponderEnd()
      }
    })
  }

  // Find out if we need to start handling dragging gesture
  onMoveShouldSetPanResponder = (gestureState: GestureState): boolean => {
    const { dx, dy, moveX, moveY, numberActiveTouches } = gestureState

    // do not set pan respodner if a multi touch gesture is occuring.
    if (numberActiveTouches !== 1) return false

    // or if there was no movement since the gesture started.
    if (dx === 0 && dy === 0) return false

    // find the item below a user's finger at given coordinates.
    const draggable = this.findDraggableAtCoordinates(moveX, moveY)
    if (draggable) {
      // assign it to this.draggableBeingDragged while dragging
      this.draggableBeingDragged = draggable
      return true
    }
    return false
  }

  // handle when gesture is granted
  onPanResponderGrant = (): void => {
    this.updateDraggableState(this.draggableBeingDragged, {
      isBeingDragged: true
    })
  }

  // handle drag gesture
  onPanResponderMove = (gestureState: GestureState): void => {
    const { moveX, moveY } = gestureState
    // Do nothing if dnd is disabled
    if (!this.state.dndEnabled) {
      return
    }
    // Find the tag we're dragging the current tag over
    const draggedOverItem = this.findDraggableAtCoordinates(
      moveX,
      moveY,
      this.draggableBeingDragged
    )
    if (draggedOverItem) {
      this.swapTags(this.draggableBeingDragged, draggedOverItem)
    }
  }

  // called after gensture ends
  onPanResponderEnd = (): void => {
    this.updateDraggableState(this.draggableBeingDragged, {
      isBeingDragged: false
    })
    this.draggableBeingDragged = undefined
    if (this.props.onDragEnd) {
      this.props.onDragEnd(this.state.items)
    }
  }

  // Enable dnd back after the animation is over
  enableDndAfterAnimating = (): void => {
    setTimeout(this.enableDnd, this.props.animationDuration)
  }

  enableDnd = (): void => {
    this.setState({ dndEnabled: true })
  }

  // Find the tag at given coordinates
  findDraggableAtCoordinates = (
    x: number,
    y: number,
    exceptDraggable?: DraggableObject
  ): ?DraggableObject => {
    const { useKey } = this.props
    return this.state.items.find(draggable => {
      return (
        draggable.tlX &&
        draggable.tlY &&
        draggable.brX &&
        draggable.brY &&
        isPointWithinArea(
          x,
          y,
          draggable.tlX,
          draggable.tlY,
          draggable.brX,
          draggable.brY
        ) &&
        (!exceptDraggable || exceptDraggable[useKey] !== draggable[useKey])
      )
    })
  }

  swapTags = (
    draggedItem: DraggableObject,
    anotherItem: DraggableObject
  ): void => {
    const { useKey } = this.props
    this.setState((state: State) => {
      const draggedItemIndex = state.items.findIndex(item => {
        return item[useKey] === draggedItem[useKey]
      })

      const anotherItemIndex = state.items.findIndex(item => {
        return item[useKey] === anotherItem[useKey]
      })

      return {
        items: moveArrayElement(
          state.items,
          draggedItemIndex,
          anotherItemIndex
        ),
        dndEnabled: false
      }
    }, this.enableDndAfterAnimating)
  }

  // Update the tag in the state with given props
  updateDraggableState = (draggable: DraggableObject, props: Object): void => {
    const { useKey } = this.props

    this.setState((state: State) => {
      const index = state.items.findIndex(item => {
        return item[useKey] === draggable[useKey]
      })

      return {
        items: [
          ...state.items.slice(0, index),
          {
            ...state.items[index],
            ...props
          },
          ...state.items.slice(index + 1)
        ]
      }
    })
  }

  // Update draggable coordinates in the state
  onRenderDraggable = (
    draggable: DraggableObject,
    screenX: number,
    screenY: number,
    width: number,
    height: number
  ): void => {
    this.updateDraggableState(draggable, {
      tlX: screenX,
      tlY: screenY,
      brX: screenX + width,
      brY: screenY + height
    })
    if (this.props.onRenderItem) {
      this.props.onRenderItem(draggable)
    }
  }

  render() {
    const { onPress, onPressAddNew, useKey } = this.props
    const { items } = this.state
    return (
      <Container {...this.panResponder.panHandlers}>
        {items &&
          items.length > 0 &&
          items.map(item => {
            return (
              <Draggable
                key={item[useKey]}
                draggable={item}
                onPress={onPress}
                onRender={this.onRenderDraggable}
                renderItem={this.props.renderItem}
              />
            )
          })}
      </Container>
    )
  }
}
