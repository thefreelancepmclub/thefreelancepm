// import { useState } from 'react';
import NextGig from "./NextGig";
// import JobFilter from "./JobFilter";
import JobBoardContainer from "./job-board-container";

export default function JobBoard() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <NextGig />

      <JobBoardContainer />

      {/* Footer - Newsletter */}
    </div>
  );
}
