import builder from "../builder"

function createNode(...funcs) {
  let obj = {};

  funcs.forEach(node => {
    if (typeof node == "string") obj.type = node
    else if (node.type == "attr") {
      if (!obj.attribute) obj.attribute = [];
      obj.attribute.push(node.body);      
    }
    else if (node.child) {
      const position = builder.position + 1;
      node.child.forEach(() => {
      builder.get(index).set(parent, position);
      })
    }
    else obj = { ...obj, ...node } 
  })

  builder.push(obj);
  return builder.position;
}

export default createNode;
