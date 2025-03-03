interface PageProps {
  searchParams: Record<string, string>;
}

export default function Frame({ searchParams }: PageProps) {
  // Preserve direction in hidden field
  return (
    <div>
      <h1>Enter Amount ({searchParams.direction})</h1>
      <form action="/frames/confirm" method="POST">
        <input type="hidden" name="direction" value={searchParams.direction} />
        <input 
          type="text"
          name="amount"
          placeholder="0.00"
          required
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  )
}
