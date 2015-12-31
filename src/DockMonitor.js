const React = require('react');
const { cloneElement, Component, PropTypes } = React;
const Dock = require('react-dock');
const { POSITIONS } = require('./constants');
const { toggleVisibility, changePosition, changeSize } = require('./actions');
const reducer = require('./reducers');
const parseKey = require('parse-key');

class DockMonitor extends Component {
  static update = reducer;

  static propTypes = {
    defaultPosition: PropTypes.oneOf(POSITIONS).isRequired,
    defaultIsVisible: PropTypes.bool.isRequired,
    defaultSize: PropTypes.number.isRequired,
    toggleVisibilityKey: PropTypes.string.isRequired,
    changePositionKey: PropTypes.string.isRequired,
    fluid: PropTypes.bool,
    children: PropTypes.element,

    dispatch: PropTypes.func,
    monitorState: PropTypes.shape({
      position: PropTypes.oneOf(POSITIONS).isRequired,
      size: PropTypes.number.isRequired,
      isVisible: PropTypes.bool.isRequired,
      childMonitorState: PropTypes.any
    })
  };

  static defaultProps = {
    defaultIsVisible: true,
    defaultPosition: 'right',
    defaultSize: 0.3,
    fluid: true
  };

  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  matchesKey(key, event) {
    const charCode = event.keyCode || event.which;
    const char = String.fromCharCode(charCode);
    return key.name.toUpperCase() === char.toUpperCase() &&
      key.alt === event.altKey &&
      key.ctrl === event.ctrlKey &&
      key.meta === event.metaKey &&
      key.shift === event.shiftKey;
  }

  handleKeyDown(e) {
    const visibilityKey = parseKey(this.props.toggleVisibilityKey);
    const positionKey = parseKey(this.props.changePositionKey);

    if (this.matchesKey(visibilityKey, e)) {
      e.preventDefault();
      this.props.dispatch(toggleVisibility());
    } else if (this.matchesKey(positionKey, e)) {
      e.preventDefault();
      this.props.dispatch(changePosition());
    }
  }

  handleSizeChange(requestedSize) {
    this.props.dispatch(changeSize(requestedSize));
  }

  render() {
    const { monitorState, children, fluid, ...rest } = this.props;
    const { position, isVisible, size } = monitorState;
    const childProps = {
      ...rest,
      monitorState: monitorState.childMonitorState
    };

    return (
      <Dock position={position}
            isVisible={isVisible}
            size={size}
            fluid={fluid}
            onSizeChange={this.handleSizeChange}
            dimMode='none'>
        {cloneElement(children, childProps)}
      </Dock>
    );
  }
}

module.exports = DockMonitor;
