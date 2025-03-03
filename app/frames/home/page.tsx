export default function Frame({ searchParams }: { searchParams: URLSearchParams }) {
  return (
    <div>
      <h1>Swap Interface</h1>
      <form action="/frames/amount" method="GET">
        <input type="hidden" name="direction" value="buy" />
        <button type="submit">Buy</button>
      </form>
      <form action="/frames/amount" method="GET">
        <input type="hidden" name="direction" value="sell" />
        <button type="submit">Sell</button>
      </form>
    </div>
  )
}
