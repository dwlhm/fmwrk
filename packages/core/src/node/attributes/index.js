export const className = (name) => { 
  return {
    className: name,
  };
};
export const id = (name) => {
  return {
    id: name,
  };
};
export const attribute = (key, val) => {
  const obj = {};
  obj[key] = val;

  return {
    type: "attr",
    body: obj,
  };
};
export const text = (text) => { 
  return {
    text: text,
  };
};
export const style = (obj) => {
  return {
    style: obj,
  };
};
export const onClick = (fn) => {
  return {
    onclick: fn,
  };
};

export const child = (...fns) => {
  return{
    child: fns
  }
}
