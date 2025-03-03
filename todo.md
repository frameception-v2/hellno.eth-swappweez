- [x] Task 1: Create frame navigation components  
  File: app/frames/[page]/page.tsx  
  Action: Create 4 files (home/amount/confirmation/result)  
  Description: Implement basic frame routing structure with initial mock buttons  
  ```tsx
  // Home screen example
  export default function Frame({ searchParams }: { searchParams: URLSearchParams }) {
    return <div>Buy/Sell buttons → /frames/amount?direction=buy</div>
  }
  ```
  Completion: Can navigate Home → Amount → Confirm → Result with mock data

- [x] Task 2: Create swap API endpoint shell  
  File: app/api/swap/route.ts  
  Action: Create POST handler with Zod validation  
  Description: Basic endpoint structure with mock response  
  ```ts
import { validateSwapRequest } from "~/middleware/validateSwap";
  
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = validateSwapRequest(body);
    return Response.json({ success: true, txHash: '0x...' });
  } catch (error) {
    return Response.json(
      { success: false, error: error.errors },
      { status: error.status || 500 }
    );
  }
  }
  ```
  Completion: API returns 200 with mock txHash for valid POST requests

- [x] Task 3: Implement token swap execution  
  File: lib/swap.ts  
  Action: Add executeSwap function with ethers.js  
  Description: Real contract interaction using TOKEN_CONFIG  
  ```ts
  export async function executeSwap(amount: string, address: string) {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(TOKEN_CONFIG.address, ABI);
    const tx = await contract.swap(amount, address);
    return { txHash: tx.hash };
  }
  ```
  Completion: executeSwap returns real testnet transaction hashes

- [x] Task 4: Add state persistence between frames  
  File: app/frames/amount/page.tsx  
  Action: Modify all frame components  
  Description: Pass state through URL params and metadata  
  ```tsx
  // Amount screen example
  export default function Frame({ searchParams }: { searchParams: { direction: string } }) {
    const nextUrl = `/frames/confirm?direction=${searchParams.direction}`;
    return <form action={nextUrl}>...</form>
  }
  ```
  Completion: Full context (direction/amount/txHash) preserved through navigation

- [x] Task 5: Implement validation middleware  
  File: middleware/validateSwap.ts  
  Action: Create validation layer  
  Description: Add regex and address checks  
  ```ts
  export function validateSwapRequest(req: Request) {
    const amount = req.body.amount;
    if (!/^\d+\.?\d*$/.test(amount)) throw new Error('Invalid amount');
    if (!ethers.isAddress(req.body.address)) throw new Error('Invalid address');
  }
  ```
  Completion: API returns 400 for non-numeric amounts/invalid addresses

- [ ] Task 6: Create transaction result UI  
  File: app/frames/result/page.tsx  
  Action: Add txHash display and error messages  
  ```tsx
  export default function ResultFrame({ searchParams }) {
    return (
      <div>
        {searchParams.success ? (
          <a href={`${BLOCK_EXPLORER}/${searchParams.txHash}`}>View Transaction</a>
        ) : (
          <div>Error: {searchParams.error}</div>
        )}
      </div>
    )
  }
  ```
  Completion: Users see blockchain explorer link or error message

- [ ] Task 7: Add GeckoTerminal integration  
  File: app/frames/home/page.tsx  
  Action: Add chart button component  
  ```tsx
  <a href={TOKEN_CONFIG.geckoUrl} target="_blank">
    View Chart
  </a>
  ```
  Completion: Clicking button opens GeckoTerminal in new tab

- [ ] Task 8: Implement error handling  
  File: lib/swap.ts  
  Action: Add error monitoring in executeSwap  
  ```ts
  try {
    return await executeSwap(...);
  } catch (e) {
    if (e.message.includes('insufficient funds')) {
      return { error: 'Insufficient balance' };
    }
    return { error: 'Transaction failed' };
  }
  ```
  Completion: Clear error messages shown with retry button on Result screen
