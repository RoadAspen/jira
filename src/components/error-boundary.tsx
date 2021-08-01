/** 错误边界
 * 从 react 16 开始，任何未呗错误边界捕获的错误，都会导致整个页面的崩溃。
 * 在事件处理中触发的error不会被捕获
 */

import React from "react";
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 当子组件跑出异常，这里会接受到并且调用， return 值会被 同步到  this.state
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  // 如果 error，就执行 fallback
  render() {
    const { error } = this.state;

    const { fallbackRender, children } = this.props;

    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
