function App() {
  return (
    <div className="min-h-dvh bg-stone-50 text-stone-900">
      <main className="mx-auto max-w-md p-4">
        <header className="flex items-center justify-between py-2">
          <h1 className="text-2xl font-semibold">My wishlist</h1>
          <button
            type="button"
            aria-label="Add item"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-500 text-2xl text-white shadow-sm active:bg-rose-600"
          >
            +
          </button>
        </header>
        <p className="mt-8 text-center text-stone-500">No items yet.</p>
      </main>
    </div>
  )
}

export default App
