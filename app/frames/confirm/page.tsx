export default function Frame({ searchParams }: { 
  searchParams: { 
    direction: string;
    amount: string;
  } 
}) {
  return (
    <div>
      <h1>Confirm {searchParams.direction}</h1>
      <p>Amount: {searchParams.amount}</p>
      <form action="/frames/result" method="GET">
        <input type="hidden" name="direction" value={searchParams.direction} />
        <input type="hidden" name="amount" value={searchParams.amount} />
        <input type="hidden" name="txHash" value="0xmock123456789" />
        <button type="submit">Confirm</button>
      </form>
    </div>
  )
}
