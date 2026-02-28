import { UserNavbar } from "./_components/navbar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <UserNavbar />
            <main className="grow">{children}</main>
        </div>
    );
}
