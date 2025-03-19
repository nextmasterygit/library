import React, { ReactNode } from 'react';

interface ExtractedComponents {
  matches: ReactNode[];
  rest: ReactNode[];
}

export const extractChildComponents = (
  children: ReactNode,
  markers: string | string[] = '__Childrens',
): ExtractedComponents => {
  const markerArray = Array.isArray(markers) ? markers : [markers];
  const matches: ReactNode[] = [];
  const rest: ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      rest.push(child);
      return;
    }

    // Get the component type. If lazy-loaded, resolve it.
    let compType: any = child.type;
    if (compType.$$typeof === Symbol.for('react.lazy')) {
      compType = compType._init(compType._payload);
    }

    // Check if the component type has any of the marker properties
    const isMatch = markerArray.some((marker) => !!compType[marker]);
    if (isMatch) {
      matches.push(child);
    } else {
      rest.push(child);
    }
  });

  return { matches, rest };
};
