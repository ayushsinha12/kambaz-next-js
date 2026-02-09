// app/(kambaz)/account/layout.tsx
import AccountNavigation from "./accountNavigation";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="row">
      <div className="col-2">
        <AccountNavigation />
      </div>
      <div className="col-10">{children}</div>
    </div>
  );
}