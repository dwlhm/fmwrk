import { generate, build_view, build_route } from "core";
import { button, div, p, title, html, body, head } from "core/node.js";
import { text, child } from "core/attributes.js";
import { route } from "core/fragments.js";
import fs from "fs"

const app = generate(
  html(
    child(
      head(child(title(text("Aplikasi Counter Page")))),
      body(
        child(
          div(
            child(
              div(p(text("Aplikasi Couter"))),
              div(
                child(
                  button(text("Counter Up!")),
                  p(text("0")),
                  button(text("Counter Down!"))
                )
              ),
              div(child(button(text("reset")))),
              route("/", div(
                child(
                  p(
                    text("Ini Halaman Home")
                  )
                )
              )),
              route("/profil", div(
                child(
                  p(
                    text("Ini Halaman Profil")
                  ),
                  route("/dwi", p(
                    text("Hai Dwi!")
                  )),
                  route("/ilham", p(
                    text("Hai Ilham")
                  ))
                )
              ))
            )
          )
        )
      )
    )
  )
);

console.log("app_schema: ", app)

//const html_str = build_view(app)

build_route(app)

//console.log(html_str)
// builder(
//     div(
//         child(
//             route("/",
//                 div(
//                     text("Hai"),
//                     child(
//                         div(
//                             text("bag 1")
//                         ),
//                         div(
//                             text("bag 2")
//                         )
//                     )
//                 )
//             ),

//             route("/home",
//                 div(
//                     text("Home"),
//                     child(
//                         p(
//                             text("Wellcome Home!")
//                         )
//                     )
//                 )
//             )
//         )
//     )
// )
