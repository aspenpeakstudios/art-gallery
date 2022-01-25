import { Links, LinksFunction, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "remix";
import type { MetaFunction } from "remix";
import globalStyles from "./styles/global.css";
import footerStyles from "./styles/footer.css";
import fontStyles from "./styles/fonts.css";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: globalStyles},
            { rel: "stylesheet", href: footerStyles},
            { rel: "stylesheet", href: fontStyles }];
  };


export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />        
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
