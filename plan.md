### Step 1: Implement Core Frame Navigation
```text
- Build: Basic frame structure with home/amount/confirmation/result screens routing
- Outcome: Can click through Buy/Sell → Amount → Confirm → Result (mock data) flow
```

### Step 2: Create Swap API Endpoint Shell
```text
- Build: POST /api/swap handler with request validation and mock response
- Outcome: API returns success/failure mock data with 200 status for valid requests
```

### Step 3: Implement Token Swap Execution
```text
- Build: Ethers.js contract interaction in executeSwap() using TOKEN_CONFIG.address
- Outcome: Real blockchain transactions with txHash returned (testnet validation)
```

### Step 4: Add State Management Between Frames
```text
- Build: Frame state persistence using metadata and URL params
- Outcome: Full context maintained through flow (direction/amount/txHash preserved)
```

### Step 5: Implement Input Validation Layer
```text
- Build: validateSwapRequest middleware with regex checks and address validation
- Outcome: API returns 400 errors for non-numeric amounts and invalid addresses
```

### Step 6: Create Transaction Feedback System
```text
- Build: Result screen with txHash link and error messages
- Outcome: Users see success/failure status with blockchain explorer link when available
```

### Step 7: Add GeckoTerminal Integration
```text
- Build: Chart button linking to TOKEN_CONFIG.geckoUrl
- Outcome: Clicking "View Chart" opens GeckoTerminal page in new tab
```

### Step 8: Implement Error Handling Scenarios
```text
- Build: Transaction monitoring and user-facing error messages
- Outcome: Clear feedback for insufficient funds/timeouts with retry option
```