"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AdminButton = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // Make a request to an admin-only endpoint
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000"}/admin`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        // If the request succeeds (status 200), user is admin
        if (response.ok) {
          console.log(response);
          setIsAdmin(true);
        }
      } catch (error) {
        // If request fails, user is not admin
        setIsAdmin(false);
      }
    };

    checkAdminAccess();
  }, []);

  // Only show button if user is admin
  if (!isAdmin) {
    return null;
  }

  return (
    <Link href="/admin">
      <Button
        variant="default"
        className="bg-primary hover:bg-primary/90 shadow-lg"
      >
        Admin
      </Button>
    </Link>
  );
};

export default AdminButton;
