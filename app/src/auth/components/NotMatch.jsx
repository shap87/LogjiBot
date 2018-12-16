import React from 'react';

export default function NotMatch() {
  return (
    <section
      className="d-flex
      flex-grow-1
      flex-column
      align-items-center
      justify-content-center
      bg-primary
      st-404"
    >
      <h1 className="text-white">404</h1>
      <h2 className="text-white">Page not found</h2>
    </section>
  );
}
