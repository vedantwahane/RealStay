import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, BookOpen, Menu, Globe, Home, Badge as Balloon, Bell } from 'lucide-react';

export function Header() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">T</span>
          </div>
          <span className="font-bold text-xl text-primary">RealStay</span>
        </Link>

        {/* Top-level categories like Airbnb: Homes, Experiences, Services */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => navigate('/')}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors border-b-2 pb-1 ${
              isActive('/') ? 'text-primary border-primary' : 'text-muted-foreground border-transparent hover:text-primary'
            }`}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            <Home className="h-4 w-4" /> Homes
          </button>
          <button
            onClick={() => navigate('/experiences')}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors border-b-2 pb-1 ${
              isActive('/experiences') ? 'text-primary border-primary' : 'text-muted-foreground border-transparent hover:text-primary'
            }`}
            aria-current={isActive('/experiences') ? 'page' : undefined}
          >
            <Balloon className="h-4 w-4" /> Experiences
          </button>
          <button
            onClick={() => navigate('/services')}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors border-b-2 pb-1 ${
              isActive('/services') ? 'text-primary border-primary' : 'text-muted-foreground border-transparent hover:text-primary'
            }`}
            aria-current={isActive('/services') ? 'page' : undefined}
          >
            <Bell className="h-4 w-4" /> Services
          </button>
        </nav>

        <div className="flex items-center space-x-2">
          {/* Hamburger menu with Become a host */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={() => navigate('/host')}>Become a host</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contact">Help Centre</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Globe className="mr-2 h-4 w-4" /> Language & Region
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link to="/my-bookings" className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>My Bookings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
