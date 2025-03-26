import { useEffect, useState } from "react";

export function useBlurIn(delay = 0) {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);
    
    return isVisible ? 'animate-blur-in opacity-100' : 'opacity-0 blur-sm';
}