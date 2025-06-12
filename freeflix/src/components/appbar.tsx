import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";

export const AppBar = () => {
    return (
        <header className="w-full fixed top-0 left-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-2xl font-bold text-primary">
                        UfersaFlix
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};