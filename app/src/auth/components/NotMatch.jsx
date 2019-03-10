import React from 'react';
import { Link } from 'react-router-dom';

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
      <h1 className="text-white mb-0">404</h1>
      <h2 className="text-white mb-5">Page not found</h2>
      <Link className="btn btn-light" to="/">
        <span className="text-primary">Back to Loji</span>
      </Link>
    </section>
  );
}
