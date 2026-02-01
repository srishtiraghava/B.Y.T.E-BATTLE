import { Moon, Sun, Menu, Swords } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../Theme/ThemeContext";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav
      className={`
        px-6 py-4 flex justify-between items-center border-b
        ${isDark
          ? "border-gray-700/30"
          : "border-gray-200 bg-white/80 backdrop-blur"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center shadow">
          <Swords className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight">
          <span className="text-emerald-600">Byte</span>Battle
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        {["Home", "Guide", "Level Sheet", "Profile"].map((item) => {
          const path =
            item === "Home"
              ? "/"
              : item === "Profile"
              ? "/profile"
              : `/${item.toLowerCase().replace(/\s+/g, "-")}`;

          return (
            <Link
              key={item}
              to={path}
              className={`font-medium transition ${
                isDark
                  ? "text-gray-400 hover:text-emerald-400"
                  : "text-gray-600 hover:text-emerald-600"
              }`}
            >
              {item}
            </Link>
          );
        })}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg border transition ${
            isDark
              ? "border-gray-600/50 hover:border-gray-500"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          {isDark ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-gray-700" />
          )}
        </button>

        {/* Login */}
        <button
          onClick={() => navigate("/login")}
          className={`
            px-5 py-2 rounded-lg font-medium transition
            ${isDark
              ? "border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
              : "border border-emerald-300 text-emerald-600 hover:bg-emerald-100"}
          `}
        >
          Login
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <Menu className="md:hidden text-gray-500" size={24} />
    </nav>
  );
};

export default Navbar;
