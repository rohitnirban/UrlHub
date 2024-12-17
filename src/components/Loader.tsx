import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="loader-icon w-16 h-16" />
        </div>
    );
};

export default Loader;