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
      title: "No Event",
      description: "No Event found"
    };
  }
  return {
    title: `Editing Event "${data}"`,
    description: `Editing Event ${data}`
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
    console.log("Event Loader: ", params);

    return params.id;
}


// HTML
export default function GalleryItemRoute() {
    const data = useLoaderData(); 
    
    //const hasData = data?.id == null || data?.id == undefined;
    console.log("Event Data: ", data);

    if (!data) {
        return <div> No Event Found </div>
    }

    return (        
        <div>
            <h2>Admin \ Edit \ Event</h2>
            <p>Event {data}</p>
            <Footer />
        </div>
    );
  }


// CATCH BOUNDARY
export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  console.log("CATCH_BOUNDARY in $id.tsx");
  switch (caught.status) {
    case 404: {
      return (
        <div className="error-container">
            Event {params.id} not found.
        </div>
      );
    }
    case 401: {
      return (
        <div className="error-container">
          Error loading Event {params.id}
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
  const { id } = useParams();
  return (
    <div className="error-container">{`There was an error loading Event by the id ${id}. Sorry.`}</div>
  );
}