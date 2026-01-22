import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AGENDA = "joseph";

const AddContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (!id) return;

        fetch(`https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts`)
            .then(res => res.json())
            .then(data => {
                const found = data.contacts?.find(
                    c => c.id === parseInt(id)
                );

                if (found) {
                    setContact({
                        name: found.name || "",
                        email: found.email || "",
                        phone: found.phone || "",
                        address: found.address || ""
                    });
                }
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!contact.name || !contact.email || !contact.phone) {
            alert("Nombre, correo y teléfono son obligatorios");
            return;
        }

        const isEdit = Boolean(id);

        const url = isEdit
            ? `https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts/${id}`
            : `https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts`;

        const method = isEdit ? "PUT" : "POST";

        const cleanContact = {
            name: contact.name.trim(),
            email: contact.email.trim(),
            phone: contact.phone.trim(),
            address: contact.address?.trim() || "N/A"
        };

        const bodyData = isEdit
            ? cleanContact
            : { ...cleanContact, agenda_slug: AGENDA };

        try {
            const resp = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyData)
            });

            console.log("STATUS:", resp.status);

            if (!resp.ok) {
                const error = await resp.json();
                console.error("ERROR API:", error);
                return;
            }

            navigate("/");
        } catch (err) {
            console.error("ERROR FETCH:", err);
        }
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Editar contacto" : "Agregar contacto"}</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    placeholder="Nombre completo"
                    value={contact.name}
                    onChange={e => setContact({ ...contact, name: e.target.value })}
                    required
                />

                <input
                    className="form-control mb-2"
                    placeholder="Correo"
                    value={contact.email}
                    onChange={e => setContact({ ...contact, email: e.target.value })}
                    required
                />

                <input
                    className="form-control mb-2"
                    placeholder="Teléfono"
                    value={contact.phone}
                    onChange={e => setContact({ ...contact, phone: e.target.value })}
                    required
                />

                <input
                    className="form-control mb-3"
                    placeholder="Dirección"
                    value={contact.address}
                    onChange={e => setContact({ ...contact, address: e.target.value })}
                />

                <button className="btn btn-primary" type="submit">
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default AddContact;
