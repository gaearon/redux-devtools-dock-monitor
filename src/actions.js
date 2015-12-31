const TOGGLE_VISIBILITY = '@@redux-devtools-log-monitor/TOGGLE_VISIBILITY';
function toggleVisibility() {
  return { type: TOGGLE_VISIBILITY };
}

const CHANGE_POSITION = '@@redux-devtools-log-monitor/CHANGE_POSITION';
function changePosition() {
  return { type: CHANGE_POSITION };
}

const CHANGE_SIZE = '@@redux-devtools-log-monitor/CHANGE_SIZE';
function changeSize(size) {
  return { type: CHANGE_SIZE, size: size };
}

module.exports = {
  TOGGLE_VISIBILITY,
  toggleVisibility,
  CHANGE_POSITION,
  changePosition,
  CHANGE_SIZE,
  changeSize
};
