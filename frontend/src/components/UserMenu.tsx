import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
    name: string;
}

export async function logout() {
  await fetch("http://localhost:8081/logout", {
    method: "POST",
    credentials: "include",
  });
}

export default function UserMenu({ name }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await logout();
    window.location.href = "/";
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded bg-gray-900 hover:bg-gray-600"
      >
        <span>{name}</span>
        <span className="text-sm">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
