import React from "react";
import PropTypes from "prop-types";

interface GridProps {
  children: JSX.Element | JSX.Element[] | false;
  style?: any;
  col: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
  px?: number;
  py?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
  mx?: number;
  my?: number;
}

const Grid = (props: GridProps) => {
  const width = Math.round(props.col * (100 / 12));
  const ratio = 12;

  const parseProp = (aProp?: number) => {
    if (!aProp) return "0px";
    return String(aProp * ratio) + "px";
  };

  var paddingL = parseProp(props.pl);
  var paddingR = parseProp(props.pr);
  var paddingT = parseProp(props.pt);
  var paddingB = parseProp(props.pb);

  var marginL = parseProp(props.ml);
  var marginR = parseProp(props.mr);
  var marginT = parseProp(props.mt);
  var marginB = parseProp(props.mb);

  if (props.px) {
    paddingL = paddingR = String(props.px * ratio) + "px";
  }
  if (props.py) {
    paddingT = paddingB = String(props.py * ratio) + "px";
  }
  if (props.mx) {
    marginL = marginR = String(props.mx * ratio) + "px";
  }
  if (props.my) {
    marginT = marginB = String(props.my * ratio) + "px";
  }
  const gridStyle = {
    ...props.style,
    display: "inline-block",
    boxSizing: "border-box",
    verticalAlign: "top",
    width: `${width}%`,
    paddingLeft: paddingL,
    paddingRight: paddingR,
    paddingTop: paddingT,
    paddingBottom: paddingB,

    marginLeft: marginL,
    marginRight: marginR,
    marginTop: marginT,
    marginBottom: marginB,
  };
  return (
    <div className={"Grid"} style={gridStyle}>
      {props.children}
    </div>
  );
};

const paddingAndMarginPropType = PropTypes.oneOf([0, 1, 2, 3, 4]);

Grid.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  col: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),

  mx: paddingAndMarginPropType,
  my: paddingAndMarginPropType,
  ml: paddingAndMarginPropType,
  mt: paddingAndMarginPropType,
  mr: paddingAndMarginPropType,
  mb: paddingAndMarginPropType,

  px: paddingAndMarginPropType,
  py: paddingAndMarginPropType,
  pl: paddingAndMarginPropType,
  pt: paddingAndMarginPropType,
  pr: paddingAndMarginPropType,
  pb: paddingAndMarginPropType,
};

Grid.defaultProps = {
  col: 12,
};

export default Grid;
