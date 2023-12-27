import createNode from "./createNode.js"

const div = (...args) => {
  return createNode("div", ...args)
}

export default div;
