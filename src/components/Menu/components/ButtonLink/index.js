import React from 'react';

export default function ButtonLink({ className, href, children }) {
  return(
    <a className={className} href={href}>
      {children}
    </a>
  );
}