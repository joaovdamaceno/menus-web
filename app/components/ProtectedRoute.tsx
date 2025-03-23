import { useEffect, useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { useAuth } from '~/contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!isChecked) {
      const isValid = checkAuth();
      if (!isValid) {
        navigate('/login');
      }
      setIsChecked(true);
    }
  }, [checkAuth, navigate, isChecked]);

  return isAuthenticated && isChecked ? <>{children}</> : null;
}