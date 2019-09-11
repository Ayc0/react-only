import * as React from "react";

import { sanitize, Breakpoints } from "./sanitize";

const defaultBreakpoints: Breakpoints = {
  xs: [0, 575, "px"], // Extra small devices (portrait phones)
  sm: [576, 767, "px"], // Small devices (landscape phones)
  md: [768, 991, "px"], // Medium devices (tablets)
  lg: [992, 1199, "px"], // Large devices (desktops)
  xl: [1200, Infinity, "px"] // Extra large devices (large desktops)
};

export const BreakpointsContext = React.createContext<Breakpoints>(
  defaultBreakpoints
);

interface BreakpointsProviderProps {
  breakpoints?: Breakpoints;
  additionalBreakpoints?: Breakpoints;
}

export const BreakpointsProvider: React.FunctionComponent<
  BreakpointsProviderProps
> = ({
  breakpoints = defaultBreakpoints,
  additionalBreakpoints = {},
  children
}) => {
  const usedBreakpoints = {
    ...sanitize(breakpoints),
    ...sanitize(additionalBreakpoints)
  };
  return (
    <BreakpointsContext.Provider value={usedBreakpoints}>
      {children}
    </BreakpointsContext.Provider>
  );
};

BreakpointsProvider.displayName = "BreakpointsProvider";