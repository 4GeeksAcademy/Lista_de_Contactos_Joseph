const API_USER = "https://playground.4geeks.com/contact/agendas/joseph";
const API_CONTACTS = "https://playground.4geeks.com/contact/agendas/joseph/contacts";

const initialStore = () => ({
  contacts: [],
  userExists: false,
});

const storeReducer = (store, action) => {
  switch (action.type){
    case "set_user_exists":
      return {...store, userExists: action.payload };

      case "set_contacts":
        return{...store, contacts: Array.isArray(action.payload) ? action.payload : [], userExists: true,};

      case"add_contact":
      return {...store, contacts:[...store.contacts, action.payload]};

      case "update_contact":
        return {...store, contacts: store.contacts.map(c => c.id === action.payload.id ? action.payload : c),
        };
      case "delete_contact":
        return{...store, contacts: store.contacts.filter (c=> c.id !== action.payload),};
        default: return store;
  }
};

export const actions= (dispatch) => ({
getUser: async () => {
  try{ const res= await fetch(API_USER);
    if (res.status ===404) {
      dispatch ({ type: "set_user_exists", payload: false});
      return;
    }

    dispatch ({type:"set_user_exists", payload: true});
   } catch (err) {
        console.error( err);
      }
    },

    createUser: async () => {
      try {
        await fetch(API_USER, { method: "POST"});
        dispatch({ type:"set_user_exists", payload: true});
      }catch (err) {
        console.error("createUser error:", err);
      }
    },
    deleteUser: async () => {
      try {
      await fetch(API_USER, {method:"DELETE"});
      dispatch({ type:"set_user_exists", payload: false});
      dispatch({type: "set_contacts", payload: []});
      } catch (err) {
      console.error("deleteUser error",err); 
      }
    },
    getContacts: async () => {
      try{
        const res = await fetch (API_USER);
        if(res.status ===404){
          dispatch({type: "set_user_exists", payload: false });
          return;
        }
        const data= await res.json();
        dispatch({ type: "set_contacts", payload: data.contacts || []});
      } catch (err) {
        console.error("getContacts error", err);
      }
    },
    addContact: async (contact) => {
      try{
        const res= await fetch (API_CONTACTS,  {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({...contact,label:"friend"}),   
        });
      }
      catch (err) {
        console.error(err);
      }
    },
    updateContact: async (id, contact) => {
      try {
        const res= await fetch (`${API_CONTACTS}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contact),
        });
        const data = await res.json();
        dispatch ({ type: "update_contact", payload: data});
      }catch (err) {
      console.error("updateContact error:", err);
      }
    },
   deleteContact: async (id) => {
    try {
      await fetch (`${API_CONTACTS}/${id}`, {method:"DELETE"});
      dispatch ({ type: "delete_contact", payload: id});
    } catch (err) {
      console.error("deleteContact error:", err);
    }
   },
});

export {initialStore};
export default storeReducer;