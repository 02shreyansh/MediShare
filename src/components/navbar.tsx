import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Menu, X, PlusCircle, ShoppingCart, Trash2 } from 'lucide-react';
import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme } = useTheme();

  const ModeToggle = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="font-bold text-2xl text-primary">Medishare</div>
        </Link>
        {/* desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/sell" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <PlusCircle size={18} />
            <span>Sell Medicine</span>
          </Link>
          <Link to="/buy" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <ShoppingCart size={18} />
            <span>Buy Medicine</span>
          </Link>
          <Link to="/dispose" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Trash2 size={18} />
            <span>Dispose Medicine</span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Link to="/login">
            <Button variant="outline" size="sm">Login</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Register</Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-4 px-4 shadow-md">
          <nav className="flex flex-col gap-4">
            <Link to="/sell" className="flex items-center gap-2 text-muted-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              <PlusCircle size={18} />
              <span>Sell Medicine</span>
            </Link>
            <Link to="/buy" className="flex items-center gap-2 text-muted-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart size={18} />
              <span>Buy Medicine</span>
            </Link>
            <Link to="/dispose" className="flex items-center gap-2 text-muted-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              <Trash2 size={18} />
              <span>Dispose Medicine</span>
            </Link>
            <div className="flex gap-2 pt-2">
              <Link to="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/register" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Register</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
