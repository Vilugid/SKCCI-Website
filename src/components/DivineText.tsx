import React from 'react';
import { formatDivineWords } from '../utils/textFormatter';

interface DivineTextProps {
  children: React.ReactNode;
}

export const DivineText: React.FC<DivineTextProps> = ({ children }) => {
  // We need to recursively walk children and format text strings
  const formatChildren = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === 'string') {
      return formatDivineWords(node);
    }
    
    if (Array.isArray(node)) {
      return node.map((child, index) => (
        <React.Fragment key={index}>
          {formatChildren(child)}
        </React.Fragment>
      ));
    }
    
    if (React.isValidElement(node)) {
      const elementNode = node as React.ReactElement<any>;
      if (elementNode.props && elementNode.props.children) {
        return React.cloneElement(elementNode, {
          children: formatChildren(elementNode.props.children)
        });
      }
    }
    
    return node;
  };

  return <>{formatChildren(children)}</>;
};
