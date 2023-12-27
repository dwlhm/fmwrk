let elements = [];

function builder(func) {
  return {
    push: (element) => elements.push(element),
    position: () => elements.length - 1,
    get: (index) => {
      return {
        content: elements[index],
        set: (key, value) => elements[index][key] = value,
      }
    },
    generateJson: () => console.log(elements)
  }
}

export {
  builder
}
