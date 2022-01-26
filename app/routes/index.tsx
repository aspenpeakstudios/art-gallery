import { Link, LinksFunction, MetaFunction, useLoaderData } from "remix";
import Footer from "~/components/footer";
import ImageGrid from "~/components/grid";
import Welcome from "~/components/welcome";
import { GalleryItem } from "@prisma/client";
import { getGalleryItems } from "~/utils/galleryItems";
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


// LOADER
export const loader = () => {
  return getGalleryItems();
}


export default function Index() {
  const galleryItems: GalleryItem[] = useLoaderData();

  return (
    <div>
      
      {/* WELCOME */}
      <Welcome />

      {/* GRID OF ART  */}
      <ImageGrid items={galleryItems} />      
      
      {/* FOOTER */}
      <Footer />
    </div>
  );
}
