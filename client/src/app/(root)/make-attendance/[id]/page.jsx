// app/status/[id]/page.js

"use client";

import React from 'react';

function Status({ params }) {
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold">Status</h1>
      <p className="text-lg mt-4">Appointment ID: {params.id}</p>
      {console.log(router.query)}
    </section>
  );
}

export default Status;
