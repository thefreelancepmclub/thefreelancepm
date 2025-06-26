import {
    render,
    screen,
    waitForElementToBeRemoved,
  } from "@testing-library/react";
  import userEvent from "@testing-library/user-event";
  import CoachingForm from "@/app/(website)/coaching/_components/coaching-submission-form";
  
  /* ── stub window.fetch ─────────────────────────────── */
  let realFetch: typeof fetch;
  
  beforeAll(() => {
    realFetch = global.fetch;
  
    global.fetch = jest.fn(async (input: RequestInfo) => {
      const url = input.toString();
  
      if (url.endsWith("/api/currentSubscription")) {
        return new Response(
          JSON.stringify({ data: { tier: "lite" } }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }
      if (url.endsWith("/api/coaching/freeRemaining")) {
        return new Response(
          JSON.stringify({ freeRemaining: false }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }
      return new Response("{}", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as unknown as typeof fetch;
  });
  
  afterAll(() => {
    global.fetch = realFetch;
  });
  
  /* ── stub postJSON (already present) ───────────────── */
  jest.mock("@/lib/fetcher", () => ({
    postJSON: async () => ({
      success: true,
      calendlyUrl: "https://example.com",
      message: "ok",
    }),
  }));

  /* ← NEW — stub the server-action the component calls */
jest.mock("@/action/coaching/create-coaching", () => ({
      createCoaching: jest.fn().mockResolvedValue({
        success: true,
        calendlyUrl: "https://example.com",
        message: "ok",
      }),
    }));
  
  it("scrolls into view when Calendly shows", async () => {
    render(<CoachingForm />);
  
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/loading subscription/i),
    );
  
    await userEvent.type(screen.getByLabelText(/first name/i), "A");
    await userEvent.type(screen.getByLabelText(/last name/i), "B");
    await userEvent.type(screen.getByLabelText(/^email/i), "a@b.dev");
    await userEvent.type(
      screen.getByLabelText(/phone number/i),
      "+1 111 111 1111",
    );
    await userEvent.click(screen.getByLabelText(/career guidance/i));
  
    await userEvent.click(screen.getByRole("button", { name: /confirm/i }));
  
    expect(await screen.findByRole("region")).toBeInTheDocument();
  });
  