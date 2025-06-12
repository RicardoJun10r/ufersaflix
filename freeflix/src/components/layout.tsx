import React from "react";
import { AppBar } from "./appbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 font-sans antialiased">
            <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 80%, hsl(var(--primary)) 0%, transparent 50%),
                                    radial-gradient(circle at 80% 20%, hsl(var(--accent)) 0%, transparent 50%),
                                    radial-gradient(circle at 40% 40%, hsl(var(--muted)) 0%, transparent 50%)`,
                }} />
            </div>

            <AppBar />

            <main className="relative pt-16">
                <div className="container mx-auto p-4 md:p-6">
                    {children}
                </div>
            </main>

            <footer className="relative mt-20 border-t bg-background/50 backdrop-blur-sm">
                <div className="container mx-auto p-6 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} UfersaFlix. Desenvolvido com ❤️ para a comunidade UFERSA.</p>
                </div>
            </footer>
        </div>
    );
}