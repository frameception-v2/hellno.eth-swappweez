export default function Frame({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const direction = searchParams.direction;
  const nextUrl = `/frames/confirm?direction=${direction}`;
  
  return (
    <div>
      <h1>Enter Amount ({direction})</h1>
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
