import { MetaFunction } from "remix";
import Footer from "~/components/footer";


// SEO
export const meta: MetaFunction = () => {  
    return {
      title: `Art Gallery - About`,
      description: `Viewing Art Gallery About`
    };
  };

  
export default function AboutRoute() {
    return (        
        <div>
            <h2>Home \ About</h2>            
            <Footer />
        </div>
    );
}