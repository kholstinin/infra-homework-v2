import { createRoot } from "react-dom/client";
import { App } from "containers/app";

import('./data').then(({data}) => console.log(data));

const targetHTMLElement = document.getElementById("root");
const root = createRoot(targetHTMLElement!);
root.render(<App />);
