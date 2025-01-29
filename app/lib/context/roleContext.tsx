'use client'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";

interface RoleContextType {
  role: string | null;
  setRole: (role: string) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
    const { data: session, status } = useSession();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      // Fetch the role and verify the email
      fetch(`http://reservehub3-1.eba-yd4q8y7m.us-east-1.elasticbeanstalk.com//api/auth/read/${session.user.email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Internal server error");
          }
          return response.json();
        })
        .then((data) => {
          const { verified_email, user_role } = data.body;

          // Check if the user's email is verified
          if (session.user?.email === verified_email) {
            setRole(user_role); // Set the role in context
          }
        })
        .catch((error) => {
          console.error("Error fetching role or verifying email:", error);
        });
    }
  }, [session, status]);
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
