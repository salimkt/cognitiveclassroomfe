import { createContext } from "react";
import type { Session, User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
});
