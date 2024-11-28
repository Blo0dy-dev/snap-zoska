import AuthGuard from "@/components/AuthGuard";

export const metadata = {
  title: "Private | Zoska",
  description: "Private layout for authenticated users",
};

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      {/* Minimalistic and centered styling */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "0 16px",
        }}
      >
        <main
          style={{
            maxWidth: "800px",
            width: "100%",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {children} {/* Render private pages */}
        </main>
        <footer
          style={{
            marginTop: "40px",
            fontSize: "0.875rem",
            color: "#888",
          }}
        >
          {/* Add any footer content here */}
        </footer>
      </div>
    </AuthGuard>
  );
}
