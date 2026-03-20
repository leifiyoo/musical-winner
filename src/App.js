import React, { useEffect, useRef, useState } from "react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Separator } from "./components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { Section } from "./components/ui/section";
import { Muted } from "./components/ui/typography";
import { Loader2, Lock, ShieldCheck } from "lucide-react";

const ACCESS_PASSWORD = "admin1234";

export default function App() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);
  const [error, setError] = useState("");
  const checkTimeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isCheckingPassword) {
      return;
    }

    setError("");
    setIsCheckingPassword(true);

    checkTimeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) {
        return;
      }

      if (password === ACCESS_PASSWORD) {
        setIsAuthenticated(true);
        setError("");
        setIsCheckingPassword(false);
        return;
      }

      setError("Invalid password. Please try again.");
      setIsCheckingPassword(false);
    }, 800);
  };

  if (isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
        <Section className="max-w-xl animate-in fade-in-0 duration-500">
          <Card className="w-full">
          <CardHeader className="space-y-3 animate-in fade-in-0 slide-in-from-bottom-1 duration-500">
            <Badge className="w-fit">Access granted</Badge>
            <CardTitle className="text-3xl">Welcome to the website</CardTitle>
            <CardDescription>
              You are now logged in and can access protected content.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Separator className="mb-4" />
            <Muted className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Session unlocked successfully.
            </Muted>
          </CardContent>
          </Card>
        </Section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <Section className="max-w-md animate-in fade-in-0 duration-500">
        <Card className="w-full">
        <CardHeader className="space-y-3 animate-in fade-in-0 slide-in-from-bottom-1 duration-500">
          <Badge variant="secondary" className="w-fit">
            Protected website
          </Badge>
          <CardTitle className="flex items-center gap-2 text-3xl">
            <Lock className="h-6 w-6" aria-hidden="true" />
            Sign in
          </CardTitle>
          <CardDescription>
            Enter your password to access the website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="hidden">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
                autoComplete="username"
                tabIndex="-1"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                disabled={isCheckingPassword}
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Login failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isCheckingPassword}>
              {isCheckingPassword ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Checking password...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" aria-hidden="true" />
                  Unlock website
                </>
              )}
            </Button>
          </form>
        </CardContent>
        </Card>
      </Section>
    </main>
  );
}
