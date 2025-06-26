/**
 * Minimal stub so `new Stripe(...)` returns an object
 * with the bits your code might access in tests.
 * Feel free to expand later.
 */
function Stripe() {
    return {
      checkout: {
        sessions: {
          create: jest.fn().mockResolvedValue({
            id : "cs_test_dummy",
            url: "https://stripe.test/checkout",
          }),
        },
      },
    };
  }
  
  module.exports = Stripe;         // default export (CommonJS style)
  