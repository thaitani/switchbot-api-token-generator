import { encode } from "https://deno.land/std/encoding/base64.ts";
import "https://deno.land/std@0.178.0/dotenv/load.ts";

const token = Deno.env.get("TOKEN") as string;
const secret = Deno.env.get("SECRET") as string;
const t = Date.now();

const nonce = "requestID";
const data = token + t + nonce;

const encoder = new TextEncoder();
const keyBuf = encoder.encode(secret);

const key = await crypto.subtle.importKey(
  "raw",
  keyBuf,
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign", "verify"],
);

const dataBuf = encoder.encode(data);
const result = await crypto.subtle.sign("HMAC", key, dataBuf.buffer);
const sign = encode(new Uint8Array(result));

console.log(`Authorization: ${token}`);
console.log(`sign: ${sign}`);
console.log(`nonce: ${nonce}`);
console.log(`t: ${t}`);
