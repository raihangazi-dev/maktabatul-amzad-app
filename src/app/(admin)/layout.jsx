export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <aside>Admin Sidebar</aside>
      <main>{children}</main>
    </div>
  );
}