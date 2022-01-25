import { Link } from "remix";

const imageArray = [
    { id: 1, url: "/../images/mountains.jpg", name: "Mountains 1" },
    { id: 2, url: "/../images/mountains.jpg", name: "Mountains 2" },
    { id: 3, url: "/../images/mountains.jpg", name: "Mountains 3" },
    { id: 4, url: "/../images/mountains.jpg", name: "Mountains 4" },
    { id: 5, url: "/../images/mountains.jpg", name: "Mountains 5" },
    { id: 6, url: "/../images/mountains.jpg", name: "Mountains 6" },
    { id: 7, url: "/../images/mountains.jpg", name: "Mountains 7" },
    { id: 8, url: "/../images/mountains.jpg", name: "Mountains 8" },
    { id: 9, url: "/../images/mountains.jpg", name: "Mountains 9" },
    { id: 10, url: "/../images/mountains.jpg", name: "Mountains 10" }    
]

export default function ImageGrid() {
    console.log(imageArray);
    return (       
        <section className='masonry-with-columns'>
            {imageArray.map(item => (
                // <div className="item">2</div>                        
                <div className="item" key={item.id}>
                    <Link to={`/admin/edit/item/${item.id}`} >
                    {/* {item.id} */}
                    </Link>
                </div>
                    
            ))}

            {/* <div className="item">1</div>
            <div className="item">2</div>

            <div className="item">3</div>
            <div className="item">4</div>

            <div className="item">5</div>
            <div className="item">6</div>

            <div className="item">7</div>
            <div className="item">8</div>

            <div className="item">9</div>
            <div className="item">10</div>

            <div className="item">11</div>
            <div className="item">12</div>

            <div className="item">13</div>
            <div className="item">14</div>
            <div className="item">15</div>

            <div className="item">16</div> */}
        </section>
    );
}