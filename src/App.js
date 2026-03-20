import React, { useState } from "react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Separator } from "./components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { Lock, ShieldCheck } from "lucide-react";

const ACCESS_PASSWORD = "admin1234";

export default function App() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === ACCESS_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      return;
    }

    setError("Invalid password. Please try again.");
  };

  if (isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
        <Card className="w-full max-w-xl">
          <CardHeader className="space-y-3">
            <Badge className="w-fit">Access granted</Badge>
            <CardTitle className="text-3xl">Welcome to the website</CardTitle>
            <CardDescription>
              You are now logged in and can access protected content.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Separator className="mb-4" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Session unlocked successfully.
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <Badge variant="secondary" className="w-fit">
            Protected website
          </Badge>
          <CardTitle className="text-3xl">Sign in</CardTitle>
          <CardDescription>
            Enter your password to access the website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="hidden">
              <label htmlFor="username">Username</label>
              <input
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
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Login failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              <Lock className="h-4 w-4" aria-hidden="true" />
              Unlock website
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
