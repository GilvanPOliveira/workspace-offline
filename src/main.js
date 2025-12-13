import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/utilities.css";

import { AppShell } from "./ui/layouts/AppShell";
import { initRouter } from "./app/router";

const root = document.querySelector("#app");
root.appendChild(AppShell());

initRouter();
