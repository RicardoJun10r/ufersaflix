import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { Search, Film } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const AppBar = () => {
    return (
        <header className="w-full fixed top-0 left-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
                        <Film className="h-8 w-8 text-primary" />
                        UfersaFlix
                    </Link>
                </div>

                <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Buscar filmes e séries..."
                            className="pl-10 bg-muted/50 border-muted focus:bg-background transition-colors"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Search className="h-4 w-4" />
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};