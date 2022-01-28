import { GalleryItem } from "@prisma/client";
import type { ActionFunction, LinksFunction, LoaderFunction, MetaFunction } from "remix";
import { Link, useLoaderData, useCatch, redirect, useParams } from "remix";
import Footer from "~/components/footer";
import { getGalleryItem } from "~/utils/galleryItems";
import formStyles from "~/styles/forms.css";
import useForm from "~/utils/useForm";
import { useState } from "react";

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
  const [showImage, setShowImage] = useState(true);
  
  // Get Data
  const {item} = useLoaderData();   
  if (!item) {
      return <div> No Gallery Item Found </div>
  }

  // Handle Form Data
  const { inputs, handleChange } = useForm({
    name: item.name,
    description: item.description,
    isActive: item.isActive,
    availability: item.availability,
    tags: item.tags,
    coverImageUrl: item.coverImageUrl
  });

    function onChange(e: any) {
      console.log("Value Changed", e);
    }
   
    const toggleVisibility = () => setShowImage(!showImage)
    // function toggleVisibility(e: any) {
    //   console.log("Value Changed", e);
    //   const id = e.currentTarget.getAttribute('data-target');
    // }

    return (        
        <div className="container">
            <div className="header">
              <Link to="/">Back</Link>

              <h2>Editing Gallery Item "{item.name}"</h2>
            </div>
            
            {/* <p>Gallery Item {data.id}</p> */}
            <div className="form-container">
              <form>
                <fieldset>
                  {/* NAME */}
                  <div className="form-field">
                    <label htmlFor="name">
                      Name
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={inputs.name} 
                        onChange={handleChange} />
                    </label>
                  </div>

                  {/* IS ACTIVE */}
                  <div className="form-field">
                    <label>
                      Is Active - (Show or Hide from Homepage)
                      <select 
                        id="isActive"
                        name="isActive"
                        value={inputs.isActive}  
                        onChange={handleChange}>                  
                          <option value="true">Yes</option>                  
                          <option value="false">No</option>                  
                      </select>                 
                    </label>                
                  </div>  

                  {/* DESCRIPTION */}
                  <div className="form-field">
                  <label>
                    Description
                    <textarea 
                      id="description"
                      name="description"
                      placeholder="Enter a description for this gallery item"
                      value={inputs.description} 
                      onChange={handleChange}>                      
                    </textarea>
                  </label>
                  </div>

                  {/* AVAILABILITY */}
                  <div className="form-field">
                    <label>
                      Availability - (For Sale, Sold, Not For Sale)
                      <select 
                        id="availability"
                        name="availability"
                        value={inputs.availability}
                        onChange={handleChange}>                  
                          <option value="For Sale">For Sale</option>                  
                          <option value="Sold">Sold</option>
                          <option value="Not For Sale">Not For Sale</option>
                      </select>                
                    </label>
                  </div>  

                  {/* TAGS */}
                  <div className="form-field">
                    <label>
                      Tags - (comma separated)
                      <input 
                        type="text" 
                        id="tags"
                        name="tags"
                        value={inputs.tags} 
                        onChange={handleChange} />
                    </label>
                  </div>

                  {/* COVER IMAGE */}
                  <div className="form-field">

                    <label onClick={toggleVisibility} data-target="coverImage">Cover Image</label>                                       
                    <div className={showImage ? 'image-container' : 'image-container hidden'}>
                      <img 
                        id="coverImage"                       
                        src={inputs.coverImageUrl} />                     
                        </div>
                  </div>

                  <div className="form-field">
                    <label>
                      Cloud URL
                      <textarea 
                        id="coverImageUrl"
                        name="coverImageUrl"
                        value={inputs.coverImageUrl} 
                        onChange={handleChange} />
                    </label>                      
                  </div>
                </fieldset>
              </form>
            </div>
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