import React from 'react';
import Layout from '@theme/Layout';
import ChatWidgetInjector from '@site/src/components/ChatWidgetInjector';

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props}>{props.children}</Layout>
      <ChatWidgetInjector />
    </>
  );
}
