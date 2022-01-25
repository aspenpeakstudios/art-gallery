import { Link, LinksFunction, MetaFunction } from "remix";
import Footer from "~/components/footer";
import ImageGrid from "~/components/grid";
import Welcome from "~/components/welcome";
import homeStyles from "../styles/home.css";

// STYLES
export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: homeStyles}];
};


// SEO
export const meta: MetaFunction = () => {  
  return {
    title: `Art Gallery - Home`,
    description: `Viewing Art Gallery Home`
  };
};


export default function Index() {
  return (
    <div>
      
      {/* WELCOME */}
      <Welcome />

      {/* GRID OF ART  */}
      <ImageGrid />      
      
      {/* FOOTER */}
      <Footer />
    </div>
  );
}
