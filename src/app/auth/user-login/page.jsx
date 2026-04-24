export default function UserLoginPage() {
  return (
    <section className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 text-black">
      <h1 className="text-2xl font-bold">User Login</h1>
      <form className="mt-6 space-y-4">
        <input className="w-full rounded border border-gray-300 px-3 py-2" type="email" placeholder="Email" />
        <input className="w-full rounded border border-gray-300 px-3 py-2" type="password" placeholder="Password" />
        <button className="w-full rounded bg-black px-4 py-2 font-semibold text-white" type="submit">
          Login
        </button>
      </form>
    </section>
  );
}
