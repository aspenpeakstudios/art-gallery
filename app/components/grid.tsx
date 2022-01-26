import { GalleryItem } from "@prisma/client";
import { Link, useNavigate } from "remix";


//https://res.cloudinary.com/drvcbv6ec/image/upload/q_auto,f_auto/v1643161406/gallery-items/lightrun_zltc8o.jpg
//https://res.cloudinary.com/drvcbv6ec/image/upload/v1643161406/gallery-items/lightrun_zltc8o.jpg

const imageArray = [
    { id: 1, coverImageUrl: "/../images/mountains.jpg", name: "Whitefish Ski Resort" },    
    // { id: 2, coverImageUrl: "/../images/ramp.jpg", name: "Glacier National Park 2" },  
    { id: 3, coverImageUrl: "/../images/lightrun.jpg", name: "Whitefish Ski Resort" },
    { id: 4, coverImageUrl: "/../images/badlands.jpg", name: "Badlands" },      
    
    // { id: 5, coverImageUrl: "/../images/mountains.jpg", name: "Mountains 5" },
    // { id: 6, coverImageUrl: "/../images/mountains.jpg", name: "Mountains 6" },
    // { id: 7, coverImageUrl: "/../images/mountains.jpg", name: "Mountains 7" },
    // { id: 8, coverImageUrl: "/../images/mountains.jpg", name: "Mountains 8" },
    // { id: 9, coverImageUrl: "/../images/mountains.jpg", name: "Mountains 9" },
    // { id: 10, coverImageUrl: "/../images/mountains.jpg", name: "Mountains 10" }    
]

export default function ImageGrid(props: any) {
    let navigate = useNavigate();
    
    let { items } = props;
    console.log(items);     
    if (items === null || items === undefined) {
      items = imageArray
    }

    function handleClick(e: any) {      
        const id = e.currentTarget.getAttribute('data-id');
        navigate(`/admin/edit/item/${id}`, {replace: true})
      }

    return (       
        <section className='masonry-with-columns'>
            {items.map( (item: GalleryItem) => (                
                // <div className="item">2</div>                        
                <div className="item" key={item.id} 
                    // style={{background: `center / contain no-repeat url(${item.coverImageUrl})`}}>
                    style={{background: `url(${item.coverImageUrl}) top left / cover`}}>

                    {/*  */}

                    <div className="overlay" data-id={item.id} onClick={handleClick}>                                          
                        <span>{item.name}</span>
                        {/* <div className="button-container">
                            <button data-id={item.id} onClick={handleClick}>
                                View
                            </button>
                            <button data-id={item.id} onClick={handleClick}>
                                Edit
                            </button>                            
                        </div> */}
                    </div>                        
                </div>
                    
            ))}
        </section>
    );
}