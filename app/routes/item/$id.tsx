import type { ActionFunction, LoaderFunction, MetaFunction } from "remix";
import { Link, useLoaderData, useCatch, redirect, useParams } from "remix";
import Footer from "~/components/footer";


// SEO
export const meta: MetaFunction = ({
  data
}: {
  data: LoaderData | undefined;
}) => {
  if (!data) {
    return {
      title: "No Gallery Item",
      description: "No Gallery Item found"
    };
  }
  return {
    title: `Gallery Item "${data}"`,
    description: `Viewing Gallery Item ${data}`
  };
};


// TYPES
type LoaderData = { id: string | undefined };


// LOAD DATA
// [Get the id from the URL and find in database]
export const loader: LoaderFunction = async ({
  request,
  params
}) => {
    console.log("GalleryItem Loader: ", params);

    return params.id;
}


// HTML
export default function GalleryItemRoute() {
    const data = useLoaderData(); 
    
    //const hasData = data?.id == null || data?.id == undefined;
    console.log("GalleryItem Data: ", data);

    if (!data) {
        return <div> No Gallery Item Found </div>
    }

    return (        
        <div>
            <h2>Gallery Item {data}</h2>
            <Footer />
        </div>
    );
  }


// ==================================================================


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