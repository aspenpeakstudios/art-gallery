import { Link, LinksFunction } from "remix"

export default function Footer() {
    return (
        <section className="footer">
            <p>Footer</p>
            <p>Home</p>
            <ul>
                <li> <Link to="/">Home</Link> </li>
                <li> <Link to="/about">About</Link> </li>
                <li> <Link to="/item/123">Gallery Item</Link> </li>
            </ul>
            <hr></hr>
            <p>Admin</p>
            <ul>
                <li> <Link to="/admin">Admin</Link> </li>
                {/* <li> <Link to="/admin/edit/item/123">Edit Item</Link> </li> */}
                <li> <Link to="/admin/edit/event/ABC">Edit Event</Link> </li>                
            </ul>

        </section>
    );
}
