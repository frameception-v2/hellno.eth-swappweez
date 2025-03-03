export default function Frame({ searchParams }: { 
  searchParams: { 
    direction: string;
    amount: string;
    address: string;
    txHash: string;
  } 
}) {
  return (
    <div>
      <h1>Swap {searchParams.direction} Completed</h1>
      <p>Amount: {searchParams.amount}</p>
      <p>Transaction: {searchParams.txHash}</p>
      <a href="/frames/home">Start Over</a>
    </div>
  )
}
