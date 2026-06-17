import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  checkAdminStatus: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = () => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const loginTime = localStorage.getItem('adminLoginTime');
    
    console.log('AdminContext - Checking admin status:', { loggedIn, loginTime });
    
    // Auto-logout after 24 hours
    if (loggedIn && loginTime) {
      const hoursSinceLogin = (Date.now() - parseInt(loginTime)) / (1000 * 60 * 60);
      console.log('AdminContext - Hours since login:', hoursSinceLogin);
      if (hoursSinceLogin > 24) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminLoginTime');
        setIsAdmin(false);
        console.log('AdminContext - Auto-logout due to timeout');
      } else {
        setIsAdmin(true);
        console.log('AdminContext - Admin is logged in');
      }
    } else {
      setIsAdmin(false);
      console.log('AdminContext - Admin is not logged in');
    }
  };

  useEffect(() => {
    checkAdminStatus();
    // Listen for storage changes (for multi-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminLoggedIn' || e.key === 'adminLoginTime') {
        checkAdminStatus();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin, checkAdminStatus }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
