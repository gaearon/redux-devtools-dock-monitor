import { CHANGE_POSITION, CHANGE_SIZE, TOGGLE_VISIBILITY } from './actions';
import { POSITIONS } from './constants';

function position(state, action, props) {
  const s = state || props.defaultPosition;
  return (action.type === CHANGE_POSITION) ?
    POSITIONS[(POSITIONS.indexOf(s) + 1) % POSITIONS.length] :
    s;
}

function size(state, action, props) {
  const s = state || props.defaultSize;
  return (action.type === CHANGE_SIZE) ?
    action.size :
    s;
}

function isVisible(state, action, props) {
  const s = state || props.defaultIsVisible;
  return (action.type === TOGGLE_VISIBILITY) ?
    !state :
    s;
}

function childMonitorState(state, action, props) {
  const child = props.children;
  return child.type.reducer(state, action, child.props);
}

export default function reducer(state = {}, action, props) {
  return {
    position: position(state.position, action, props),
    isVisible: isVisible(state.isVisible, action, props),
    size: size(state.size, action, props),
    childMonitorState: childMonitorState(state.childMonitorState, action, props)
  };
}
