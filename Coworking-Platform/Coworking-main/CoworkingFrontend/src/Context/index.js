import { createContext } from 'react';

// Provides a single shared `fetchUserDetails` function (see ContextProvider
// in Context/Provider.jsx) so any component can refresh the logged-in
// user's info after login/signup/profile changes.
const Context = createContext(null);

export default Context;
