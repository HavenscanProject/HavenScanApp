import { Link, useLocation } from 'react-router-dom';
import { Activity, TrendingUp, Lightbulb, Menu as MenuIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';

export function Navigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Activity },
    { path: '/realtime', label: 'Real-time Data', icon: TrendingUp },
    { path: '/maintenance', label: 'Maintenance', icon: Lightbulb },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl text-gray-900">Home Sensor Monitor</h1>
            </div>
          </div>

          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
                >
                  <MenuIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Menu</span>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {navItems.map(({ path, label, icon: Icon }) => (
                  <DropdownMenuItem asChild key={path}>
                    <Link
                      to={path}
                      className={`flex items-center gap-2 w-full ${
                        isActive(path)
                          ? 'text-gray-900'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
