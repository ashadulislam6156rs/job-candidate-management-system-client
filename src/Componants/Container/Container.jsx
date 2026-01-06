import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`${className} max-w-7xl mx-auto px-5 md:px-7`}>{children}</div>
  );
};

export default Container;
