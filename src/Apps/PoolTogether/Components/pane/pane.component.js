// @flow
import type { ComponentType } from "react"
import styled from "styled-components/native"

type Props = {
  isBeingDragged: boolean
}

const Box: ComponentType<Props> = styled.TouchableOpacity`
  width: ${props => props.width};
  height: ${props => props.height};
  margin-horizontal: 10;
  margin-vertical: 10;
  align-items: center;
  flex-direction: row;
  background-color: ${props => (props.isBeingDragged ? "red" : "#444")};
  transform: ${props => (props.isBeingDragged ? "scale(1.2)" : "scale(1)")};
`

Box.defaultProps = {
  isBeingDragged: false
}

export default Box
