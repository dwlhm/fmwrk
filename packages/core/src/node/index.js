import createNode from "./create.node"; 

export function div(...args) createNode("div", ...args)
export function p(...args) createNode("p", ...args)
export function button(...args) createNode("button", ...args)
