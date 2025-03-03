import { ethers } from "ethers";
import { z } from "zod";

const swapSchema = z.object({
  amount: z.string().refine((val) => /^\d+\.?\d*$/.test(val), 
  address: z.string().refine((val) => ethers.isAddress(val))
});

export function validateSwapRequest(body: unknown) {
  // Validate against schema
  const result = swapSchema.safeParse(body);
  
  if (!result.success) {
    const errors = result.error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    throw { status: 400, errors };
  }

  return result.data;
}
