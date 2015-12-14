import { CHANGE_POSITION, CHANGE_SIZE, TOGGLE_VISIBILITY } from './actions';
import { POSITIONS } from './constants';

function position(props, state = props.defaultPosition, action) {
  return (action.type === CHANGE_POSITION) ?
    POSITIONS[(POSITIONS.indexOf(state) + 1) % POSITIONS.length] :
    state;
}

function size(props, state = props.defaultSize, action) {
  return (action.type === CHANGE_SIZE) ?
    action.size :
    state;
}

function isVisible(props, state = props.defaultIsVisible, action) {
  return (action.type === TOGGLE_VISIBILITY) ?
    !state :
    state;
}

function childMonitorState(props, state, action) {
  const child = props.children;
  return child.type.update(child.props, state, action);
}

export default function reducer(props, state = {}, action) {
  return {
    position: position(props, state.position, action),
    isVisible: isVisible(props, state.isVisible, action),
    size: size(props, state.size, action),
    childMonitorState: childMonitorState(props, state.childMonitorState, action)
  };
}
