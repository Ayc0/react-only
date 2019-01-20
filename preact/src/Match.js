// eslint-disable-next-line
import { h, Fragment } from 'preact';

// eslint-disable-next-line
import Only from './Only';

const parseChildren = (vNode) => {
  if (!vNode || !vNode.attributes) {
    return vNode;
  }
  const children = vNode.children ? vNode.children.map(parseChildren) : null;
  const {
    only, matchMedia, strict, ...attributes
  } = vNode.attributes;
  const clone = h(vNode.nodeName, attributes, children);
  if (!only && !matchMedia) {
    return clone;
  }
  return (
    <Only on={only || ''} matchMedia={matchMedia || ''} strict={strict}>
      {clone}
    </Only>
  );
};

export default ({ children, as, ...props }) => {
  if (!children) {
    return null;
  }
  const renderedComp = as || Fragment;
  return h(renderedComp, as ? props : null, children.map(parseChildren));
};
