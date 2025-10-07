import * as React from "react";

export default function Maintenance(): React.ReactElement {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          We'll be back soon!
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Kaluzny I.T. is currently undergoing scheduled maintenance.
          <br />
          We appreciate your patience and understanding.
          <br />
          Please check back later.
        </p>
        <div className="mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
