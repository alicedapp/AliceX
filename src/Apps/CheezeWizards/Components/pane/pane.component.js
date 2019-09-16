// @flow
import type { ComponentType } from "react"
import styled from "styled-components/native"

type Props = {
  isBeingDragged: boolean
}

const Box: ComponentType<Props> = styled.TouchableOpacity`
  width: ${props => props.width};
  height: ${props => props.height};
  align-items: center;
  flex-direction: row;
  transform: ${props => (props.isBeingDragged ? "scale(1.2)" : "scale(1)")};
`

Box.defaultProps = {
  isBeingDragged: false
}

export default Box
