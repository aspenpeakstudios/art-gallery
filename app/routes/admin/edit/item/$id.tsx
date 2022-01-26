import { GalleryItem } from "@prisma/client";
import type { ActionFunction, LinksFunction, LoaderFunction, MetaFunction } from "remix";
import { Link, useLoaderData, useCatch, redirect, useParams } from "remix";
import Footer from "~/components/footer";
import { getGalleryItem } from "~/utils/galleryItems";
import formStyles from "~/styles/forms.css";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: formStyles}];
  };

// SEO
export const meta: MetaFunction = ({ data }: { data: LoaderData | undefined; }) => {
  if (!data) {
    return {
      title: "No Gallery Item",
      description: "No Gallery Item found"
    };
  }
  return {
    title: `Editing Gallery Item "${data.item.name}"`,
    description: `Editing Gallery Item ${data.item.name}`
  };
};


// TYPES
type LoaderData = { 
  id: string,
  item: GalleryItem };


// LOAD DATA
// [Get the id from the URL and find in database]
export const loader: LoaderFunction = async ({
  request,
  params
}) => {
    console.log("GalleryItem Loader: ", params);

    const id = params.id || "";
    const galleryItem = await getGalleryItem(id);
    console.log("GalleryItem: ", galleryItem);

    const data: LoaderData = { id: id, item: galleryItem }

    return data;
}


// HTML
export default function GalleryItemRoute() {

    function onChange(e: any) {
      console.log("Value Changed", e);
    }

    const {item} = useLoaderData(); 
    
    //const hasData = data?.id == null || data?.id == undefined;
    console.log("GalleryItem Data: ", item);

    if (!item) {
        return <div> No Gallery Item Found </div>
    }

    return (        
        <div className="form-container">
            <div className="header">
              <Link to="/">Back</Link>

              <h2>Editing Gallery Item "{item.name}"</h2>
            </div>
            
            {/* <p>Gallery Item {data.id}</p> */}
            <form>
              {/* NAME */}
              <div className="form-field">
                <label>Name</label>
                <input type="text" value={item.name} onChange={onChange} />
              </div>

              {/* IS ACTIVE */}
              <div className="form-field">
                <label>Is Active - (Show or Hide from Homepage)</label>                
                <select value={item.isActive}  onChange={onChange}>                  
                  <option value="true">Yes</option>                  
                  <option value="false">No</option>                  
                </select>                 
              </div>  

              {/* DESCRIPTION */}
              <div className="form-field">
              <label>Description</label>
              <textarea value={item.description} onChange={onChange}></textarea>
              </div>

              {/* AVAILABILITY */}
              <div className="form-field">
                <label>Availability - (For Sale, Sold, Not For Sale)</label>
                <select value={item.availability}  onChange={onChange}>                  
                  <option value="For Sale">For Sale</option>                  
                  <option value="Sold">Sold</option>
                  <option value="Not For Sale">Not For Sale</option>
                </select>                
              </div>  

              {/* TAGS */}
              <div className="form-field">
                <label>Tags - (comma separated)</label>
                <input type="text" value={item.tags} onChange={onChange} />
              </div>

              {/* COVER IMAGE */}
              <div className="form-field">
                <label>Cover Image</label>
                <img src={item.coverImageUrl} />
                <label>Cloud URL</label>
                <input type="text" value={item.coverImageUrl} onChange={onChange} />
              </div>
            </form>
            <Footer />
        </div>
    );
  }


// ========================================================================


// CATCH BOUNDARY
export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  console.log("CATCH_BOUNDARY in $jokeId.tsx");
  switch (caught.status) {
    case 404: {
      return (
        <div className="error-container">
            Gallery item {params.id} not found.
        </div>
      );
    }
    case 401: {
      return (
        <div className="error-container">
          Error loading gallery item {params.id}
        </div>
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}


// ERROR BOUNDARY
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  const { jokeId } = useParams();
  return (
    <div className="error-container">{`There was an error loading gallery item by the id ${jokeId}. Sorry.`}</div>
  );
}