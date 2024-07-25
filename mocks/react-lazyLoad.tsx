import React from "react";

const LazyLoad: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

LazyLoad.displayName = "LazyLoad";

export default LazyLoad;
