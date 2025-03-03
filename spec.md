### 1. Core Functionality
**Main User Flow**:
1. Initial swap interface with buy/sell options
2. Amount input screen
3. Transaction confirmation
4. Success/failure feedback
5. GeckoTerminal chart link access

**Required API Endpoints**:
- `POST /api/swap`: Handles token swap execution
```typescript
interface SwapRequest {
  userAddress: string;
  amount: string;
  direction: 'buy' | 'sell';
}

interface SwapResponse {
  status: 'success' | 'failure';
  txHash?: string;
  error?: string;
}
```

**Key Data Structures**:
- Fixed token config:
```typescript
const TOKEN_CONFIG = {
  address: '0x09acde9bf1eb84b4a611978e6a08f2adf0521262',
  name: 'pweez',
  geckoUrl: 'https://www.geckoterminal.com/base/pools/0xb8371616896e5953f7425d71c047cd3df738c379'
};
```

### 2. Implementation Approach
**Frame Structure**:
1. **Home Screen**:
   - "Buy pweez" / "Sell pweez" buttons
   - "View Chart" button linking to GeckoTerminal

2. **Amount Screen**:
   - Text input for token amount
   - "Confirm" button

3. **Confirmation Screen**:
   - Display amount + direction
   - "Execute Swap" button

4. **Result Screen**:
   - Transaction status with txHash link
   - "Restart" button

**API Integration**:
- Blockchain RPC for swap execution
- On-chain contract interaction with `TOKEN_CONFIG.address`
- GeckoTerminal static URL from config

**State Management**:
- Use Next.js server-side state with frame handlers
- Maintain swap context through POST redirects
- Store temporary state in frame metadata:
```typescript
interface FrameState {
  direction?: 'buy' | 'sell';
  amount?: string;
  txHash?: string;
}
```

### 3. Technical Considerations
**API Authentication**:
- Wallet address validation through Farcaster signed message
- No API keys needed (public blockchain interaction)

**Critical Error Scenarios**:
1. Insufficient balance handling
2. Invalid amount formatting
3. Transaction timeout
4. Network congestion failures

**Error Mitigation**:
- Input validation middleware:
```typescript
const validateSwapRequest = (req: SwapRequest) => {
  if (!/^\d+\.?\d*$/.test(req.amount)) throw 'Invalid amount';
  if (!isValidEthAddress(req.userAddress)) throw 'Invalid address';
};
```
- Transaction monitoring with retry logic
- Clear error messages in frame responses

**Swap Execution Flow**:
```typescript
// Simplified swap handler
export async function executeSwap(request: SwapRequest) {
  const contract = new ethers.Contract(
    TOKEN_CONFIG.address,
    ['function swapExactTokensForETH(uint amountIn, ...)'],
    provider
  );
  
  const tx = await contract.swapExactTokensForETH(
    ethers.parseEther(request.amount),
    { value: calculateSwapValue(request) }
  );
  
  return { txHash: tx.hash };
}
```