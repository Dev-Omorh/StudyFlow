import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { setAuthToken } from "../services/api";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifySession } = useAuth();
  const token = searchParams.get("token");

  useEffect(() => {
    let isCurrent = true;
    const completeSignIn = async () => {
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }
      setAuthToken(token);
      await verifySession();
      if (isCurrent) {
        navigate("/", { replace: true });
      }
    };
    completeSignIn();
    return () => {
      isCurrent = false;
    };
  }, [navigate, token, verifySession]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500 dark:bg-slate-950 dark:text-slate-400">
      Completing sign in...
    </main>
  );
}
