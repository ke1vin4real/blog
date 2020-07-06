import { withRouter, SingletonRouter } from 'next/router';
import React from 'react';
import Layout from "../../components/Layout";

interface Props {
  router: SingletonRouter
}

class Post extends React.PureComponent<Props> {
  render() {
    const { router } = this.props;
    console.log(router)
    return (
      <Layout>
        <div>1</div>
      </Layout>
    );
  }
}

export default withRouter(Post);