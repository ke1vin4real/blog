import { withRouter, SingletonRouter } from 'next/router';
import React from 'react';

interface Props {
  router: SingletonRouter
}

class Post extends React.PureComponent<Props> {
  render() {
    return (<div />);
  }
}

export default withRouter(Post);