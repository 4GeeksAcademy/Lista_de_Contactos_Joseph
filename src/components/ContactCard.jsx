import { Link } from "react-router-dom";

const ContactCard = ({ contact, onDelete }) => {
    return (
        <div className="d-flex align-items-center border p-3 mb-2">

            <div className="flex-grow-1">
                <h5 className="mb-1">{contact.name}</h5>

                <p className="mb-1">
                    <i className="fa-solid fa-location-dot me-2"></i>
                    {contact.address}
                </p>

                <p className="mb-1">
                    <i className="fa-solid fa-phone-flip me-2"></i>
                    {contact.phone}
                </p>

                <p className="mb-0">
                    <i className="fa-solid fa-envelope me-2"></i>
                    {contact.email}
                </p>
            </div>

            <div className="ms-auto d-flex gap-3 align-items-center">

                <Link
                    to={`/edit/${contact.id}`}
                    className="text-decoration-none text-dark"
                >
                    <i className="fa-solid fa-pen action-icon"></i>
                </Link>

                <i
                    className="fa-solid fa-trash action-icon"
                    onClick={() => onDelete(contact.id)}
                ></i>

            </div>
        </div>
    );
};

export default ContactCard;
