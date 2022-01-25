import { MetaFunction, Outlet } from "remix";
import Footer from "~/components/footer";


// SEO
export const meta: MetaFunction = () => {  
  return {
    title: `Art Gallery - Admin`,
    description: `Viewing Art Gallery Admin`
  };
};


export default function AdminRoute() {
    return (
        <div>
          <h2>Admin \ Index</h2>          
          <Footer />          
        </div>
      );
}