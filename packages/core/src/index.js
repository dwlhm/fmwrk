import fs from "fs"

const build_view = (app, outDir) => {
  let elements = [];
  let pages = {};

  app.view.forEach(element => {
    const {n_type, parent, text, ...attributes} = element
    let node = [];
    if (n_type == "html") {
      node.push("<!DOCTYPE html>")
      node.push("<html>");
      node.push("</html>")
    } else {
      node.push(`<${n_type}`)
      Object.keys(attributes).forEach(v => {
        node.push(` ${v}="${attributes[v]}"`)
      })
      node.push(`>${text || ""}`);
      node.push(`</${n_type}>`);
      
    }
    if (parent !== undefined) elements[parent].splice(-1,0,node);
    
    elements.push(node);
  });

  try {
    if (!fs.existsSync(`./dist${outDir}`)) {
      fs.mkdirSync(`./dist${outDir}`)
    }
    fs.promises.writeFile(`./dist${outDir || ""}/index.html`, elements[0].flat(10).join(""))
    
  } catch (error) {
    console.error("build_view error: ", error)
  }


  return elements[0].flat(10).join("")
};

function generate(app, schema, parent_index) {
  if (!schema) schema = {};
  let node_index = parent_index > -1 ? parent_index : -1;

  const { child, ...app_component } = app;

  if (app_component.n_type)
    [schema, node_index] = generate_node(
      app_component,
      schema,
      node_index,
      parent_index
    );

  if (Array.isArray(child)) {
    child.forEach((child_component) => {
      schema = generate(child_component, schema, node_index);
    });
  }

  if (app_component.f_type)
    schema = generate_fragment(app_component, schema, parent_index)

  return schema;
}

function generate_node(component, schema, node_index, parent_index) {
  if (parent_index > -1) component.parent = parent_index;

  if (!Array.isArray(schema.view)) schema.view = [];
  schema.view.push(component);
  node_index = schema.view.length - 1;

  return [schema, node_index];
}

function generate_fragment(component, schema, parent_index) {
  if (component.f_type == "route") {
    if (!schema.route) schema.route = {};

    const generated_view = generate(component.view)
   
    schema.route[component.path] = {
      view: generated_view.view,
      parent: parent_index,
      ...generated_view.route
    } 
  
  }

  return schema
}

function build_route(app, path_parent, view_parent) {

  //console.log(app)
  if (!app.route) return new Error("No route detected!")

  let app_schema = {}

  console.log("path_parent: ", path_parent)
  if (path_parent == undefined) {
    Object.keys(app.route).forEach(path => {
      console.log(`p: ${path_parent || ""}${path}`)
      let view_index = app.view.length;

      let schema = [...app.view]
      let { view, parent, ...fragment} = app.route[path]
      let order = []
      view.forEach(component => {
        order.push(view_index)
        if (component.parent == undefined) component.parent = parent
        else component.parent = order[component.parent]

        schema.push(component);
      
        view_index++;
      })

      if (Object.keys(fragment).length > 0) build_route({route: fragment}, path, schema)
      build_view({view: schema}, `/${path}`)
    })
  } else {
    console.log("child_path: ", app, view_parent)
    Object.keys(app.route).forEach(path => {
      console.log(`p: ${path_parent || ""}${path}`)
      let view_index = view_parent.length;

      let schema = [...view_parent]
      let { view, parent, ...fragment} = app.route[path]
      let order = []
      view.forEach(component => {
        order.push(view_index)
        if (component.parent == undefined) component.parent = parent
        else component.parent = order[component.parent]

        schema.push(component);
      
        view_index++;
      })

      if (Object.keys(fragment).length > 0) build_route({route: fragment}, path)
      console.log(schema)
      build_view({view: schema}, `${path_parent || ""}${path}`)
    })
  }
}

function build_route_begin(app) {
  let app_schema = {}

  Object.keys(app.route).forEach(path => {
    console.log("path: ",path)
    build_route_begin(app.route[path])
  })


  return app_schema
}

export { build_view, generate, build_route };
