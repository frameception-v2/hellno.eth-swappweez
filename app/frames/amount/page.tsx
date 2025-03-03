export default function Frame({ searchParams }: { searchParams: { direction: string } }) {
  const nextUrl = `/frames/confirm?direction=${searchParams.direction}`;
  
  return (
    <div>
      <h1>Enter Amount ({searchParams.direction})</h1>
      <form action={nextUrl} method="GET">
        <input 
          type="text"
          name="amount"
          placeholder="0.00"
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  )
}
