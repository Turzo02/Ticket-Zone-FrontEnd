import React from 'react';

const Forbidden = () => {
    return (
        <div className="min-h-screen max-w-7xl mx-auto flex items-center justify-center p-4 bg-base-200 text-base-content">
            <div className="text-center max-w-lg p-8 space-y-8 bg-base-200 rounded-2xl shadow-2xl border border-base-200">
                

                {/* 2. Main Title */}
                <h1 className="text-6xl font-extrabold text-error">
                    403
                </h1>

                {/* 3. Subtitle / Message */}
                <h2 className="text-3xl font-bold text-warning">
                    ACCESS FORBIDDEN
                </h2>

                <p className="text-lg text-base-content/80">
                    You do not have the necessary permissions to view this page.
                </p>
            
            </div>
        </div>
    );
};

export default Forbidden;