export default (nodeName, ...args) => {
  let obj = {
    n_type: nodeName
  }

  args.forEach(v => {
    obj = { ...obj, ...v}
  })

  return obj
}
