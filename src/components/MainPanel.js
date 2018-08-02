// @flow
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import is from 'styled-is';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { Dispatch } from 'redux';
import { MdClose } from 'react-icons/md';

import { PLUGIN, toggleGUI } from '../store/actions';
import getBlocks from './getBlocks';

const Container = styled(Flex)`
  position: fixed;
  top: 0px;
  right: 0px;
  width: 30%;
  min-width: 200px;
  max-height: 100vh;
  overflow: auto;
  z-index: 3;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;

  ${is('closed')`
    display: none;
  `};

  ::-webkit-scrollbar {
    display: none;
  }
  font-family: Monospaced Number, Chinese Quote, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
`;
const TitleBar = styled(Flex)`
  height: 30px;
  min-height: 30px;
  background-color: rgba(255, 255, 255, 0.4);
  font-size: 24px;

  & svg {
    cursor: pointer;
  }
`;

type Props = {
  toggleGUI: () => void,
  opened?: boolean | void,
};
type State = {};
class MainPanel extends Component<Props, State> {
  render() {
    return (
      <Container column closed={!this.props.opened}>
        <TitleBar justifyEnd alignCenter>
          <MdClose onClick={this.props.toggleGUI} />
        </TitleBar>
        {getBlocks('history')}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { opened: state.ui?.[PLUGIN]?.opened };
}
function mapDispatchToProps(dispatch: Dispatch<*>) {
  return bindActionCreators({ toggleGUI }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPanel);
