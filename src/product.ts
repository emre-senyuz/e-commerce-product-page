export type FinishId = 'sand' | 'ink' | 'sage';
export interface Finish { id: FinishId; name: string; color: string; dark: string; stock: number }
export interface Product { id: string; name: string; price: number; finishes: Finish[] }
export interface CartItem { finish: FinishId; quantity: number }
export const product: Product = { id: 'forma-one', name: 'Forma One', price: 249, finishes: [
  { id: 'sand', name: 'Sandstone', color: '#d6c8b2', dark: '#8c7c67', stock: 8 },
  { id: 'ink', name: 'Midnight', color: '#42464b', dark: '#181b20', stock: 6 },
  { id: 'sage', name: 'Sage', color: '#a7b29b', dark: '#58664e', stock: 4 },
] };
export const money = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(amount);
export const storageKey = 'forma-cart-v1';
export function readCart(): CartItem[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
    if (!Array.isArray(raw)) return [];
    return product.finishes.flatMap(f => {
      const entry = raw.find((v: unknown) => typeof v === 'object' && v !== null && 'finish' in v && v.finish === f.id);
      if (!entry || typeof entry.quantity !== 'number' || !Number.isFinite(entry.quantity) || entry.quantity < 1) return [];
      return [{ finish: f.id, quantity: Math.min(f.stock, Math.floor(entry.quantity)) }];
    });
  } catch { return []; }
}
