import React from 'react'
import PropTypes from 'prop-types'
import {partial} from '../../lib/utils.js'

export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id)
  return (
    <li >
      <input type="checkbox" checked={props.isComplete} onChange={handleToggle}
      /> {props.name} 
    </li>
  )
}

TodoItem.propTypes = {
  isComplete: PropTypes.bool,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleToggle: PropTypes.func.isRequired
}
