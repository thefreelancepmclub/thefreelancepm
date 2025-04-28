import CanceledPage from "./_components/cancel";

export default function Home() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center p-4">
      <CanceledPage
        title="Oops! Your Payment Wasn’t "
        highlightedWord="Completed !"
        description="Thank you for your payment. Your plan has been upgraded! Please check your email for a payment confirmation & invoice."
        buttonText="Home"
        buttonHref="/"
      />
    </main>
  );
}
