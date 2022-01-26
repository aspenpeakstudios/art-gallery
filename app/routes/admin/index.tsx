import { GalleryItem } from "@prisma/client";
import { LinksFunction, MetaFunction, Outlet, useLoaderData } from "remix";
import Footer from "~/components/footer";
import { getGalleryItems } from "~/utils/galleryItems";
import tableStyles from "~/styles/tables.css";
import { MouseEventHandler } from "react";
import { Navigate, NavigationType } from "react-router";
import { useNavigate } from "react-router-dom";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: tableStyles}];
  };

// SEO
export const meta: MetaFunction = () => {  
  return {
    title: `Art Gallery - Admin`,
    description: `Viewing Art Gallery Admin`
  };
};


// LOADER
export const loader = () => {
  return getGalleryItems();
}


export default function AdminRoute() {
    const galleryItems: GalleryItem[] = useLoaderData();
    console.log(galleryItems);

    let navigate = useNavigate();

    // const handleClick: (arg0: string) => MouseEventHandler<HTMLTableRowElement> | undefined(id: string) {
    //   console.log(id);      
    // }

    function handleClick(e: any) {      
      const id = e.currentTarget.getAttribute('data-id');
      navigate(`/admin/edit/item/${id}`, {replace: true})
    }

    return (
        <div>
          <h2>Admin \ Index</h2>      
          <h2>All Gallery Items</h2>    
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Image</th><th>Name</th><th>Description</th><th>Is Active</th>
                </tr>
              </thead>
              <tbody>
                {galleryItems.map((item, index) => (
                  // <tr key={item.id} onClick={handleClick(item.id)}>
                  <tr key={index} data-id={item.id} onClick={handleClick} >
                    <td className="center">{index+1}</td>
                    <td className="center image">
                      <img src={item.coverImageUrl} alt={item.description} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td className="center">
                      {item.isActive ? "Yes" : "No"}
                    </td>
                  </tr> 
                ))}
              </tbody>

            </table>
          </div>

          <h2>All Gallery Events</h2>    

          <Footer />          
        </div>
      );
}