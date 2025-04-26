import Link from "next/link";

const DashboardFooter = () => {
  return (
    <footer className="border-t bg-white p-4 text-center text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <p>© 2023 The FreelancePM Club all rights reserved</p>
        <span>•</span>
        <Link href="#" className="hover:underline">
          Privacy Policy
        </Link>
        <span>•</span>
        <Link href="#" className="hover:underline">
          Terms & Condition
        </Link>
      </div>
    </footer>
  );
};

export default DashboardFooter;
