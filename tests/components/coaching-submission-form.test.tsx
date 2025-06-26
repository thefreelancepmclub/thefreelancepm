/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import CoachingForm from "@/app/(website)/coaching/_components/coaching-submission-form";

// --- lightweight mocks -------------------------------------------------
 jest.mock(
       "swr",
       () => ({
         __esModule: true,
         default: (key: string | null) => {
           if (key === "/api/currentSubscription") {
             return { data: { tier: "elite" } };
           }
           if (key === "/api/coaching/freeRemaining") {
             return { data: { freeRemaining: true } };
           }
           return { data: undefined };
         },
       }),
       { virtual: true }, // ← stops Jest resolving a real package
     );

// calendar & other heavy deps can stay un-mocked; JSDOM ignores layout

// -----------------------------------------------------------------------

it("does NOT render date/time pickers for Elite user with free slot", () => {
  render(<CoachingForm />);
  // use whatever labels you actually render on the pickers:
  expect(screen.queryByLabelText(/date/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/time/i)).not.toBeInTheDocument();
});
