import React from 'react';

export function Spinner() {
  return (
    <div className="d-flex flex-grow-1 align-items-center justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
