# AI Coding Agent Instructions for Lista de Contactos

## Architecture Overview
This is a React contact list app using Vite, React Router, and a centralized store with `useReducer` and Context API. Key files:
- `src/store.js`: Defines reducer, initial state, and async actions (getContacts, addContact, updateContact, deleteContact) that fetch from `https://playground.4geeks.com/apis/fake/contact/agenda/joseph`
- `src/hooks/useGlobalReducer.jsx`: Custom hook providing `store` and `dispatch` via Context
- `src/routes.jsx`: Router config with `/` (Contact list), `/add` (AddContact modal), `/edit/:id` (AddContact modal for edit)
- Components in `src/components/`, pages in `src/pages/`

## State Management Pattern
Use `useGlobalReducer()` to access global state. Actions are functions from `actions(dispatch)` that handle API calls and dispatch reducer actions. Example:
```jsx
const { store, dispatch } = useGlobalReducer();
const { addContact } = actions(dispatch);
addContact({ name: "John", email: "john@example.com", phone: "123", address: "Addr" });
```

## Component Patterns
- Pages use `useEffect` to fetch data on mount (e.g., `getContacts()` in Contact.jsx)
- Forms use local `useState` for form data, `handleChange` for inputs, `handleSubmit` to call store actions
- Modals use Bootstrap classes (e.g., `modal fade`, `data-bs-toggle`) for add/edit/delete interactions
- ContactCard renders contact details with edit/delete buttons triggering modals

## Development Workflow
- Start dev server: `npm run dev` (Vite on port 3000)
- Build: `npm run build` (outputs to `dist/`)
- Lint: `npm run lint` (ESLint with React rules)
- Deploy: Use Vercel with `vercel --prod`

## Conventions
- Import store actions as `{ actions } from "../store"` and destructure needed functions
- Use Bootstrap 5 classes for styling (included in index.html)
- FontAwesome icons via CDN for UI elements
- No local state persistence; all data via API and global store
- Edit functionality reuses AddContact component with URL params, but modals are handled inline

## Key Files to Reference
- `src/pages/Contact.jsx`: Main list view with ContactCard mapping
- `src/pages/AddContact.jsx`: Modal form for add/edit (note: edit modal not fully implemented in ContactCard)
- `src/components/ContactCard.jsx`: Individual contact display with delete modal</content>
<parameter name="filePath">/workspaces/Lista_de_Contactos_Joseph/.github/copilot-instructions.md