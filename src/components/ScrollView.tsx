import React, { CSSProperties, useContext } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const ScrollView = ({ children, ...restProps }: Props) => {
  return (
    <div className='scrollView-outer'>
      <div className='scrollView-inner' {...restProps}>
        {children}
      </div>
    </div>
  );
};

export default ScrollView;
