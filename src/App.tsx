import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Headphones as HeadphonesIcon, Leaf, Minus, Plus, ShieldCheck, ShoppingBag, Truck, Volume2, X } from 'lucide-react';
import Headphones from './Headphones';
import Overlay from './Overlay';
import { money, product, readCart, storageKey, type CartItem, type FinishId } from './product';

function Stepper({ value, max, onChange, label }: { value: number; max: number; onChange: (value: number) => void; label: string }) {
  return <div className="stepper" role="group" aria-label={label}><button aria-label={`Decrease ${label}`} disabled={value <= 1} onClick={() => onChange(value - 1)}><Minus size={15}/></button><span aria-live="polite">{value}</span><button aria-label={`Increase ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}><Plus size={15}/></button></div>;
}
export default function App() {
  const [finishId, setFinishId] = useState<FinishId>('sand');
  const [view, setView] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>(readCart);
  const [overlay, setOverlay] = useState<'cart' | 'checkout' | null>(null);
  const [storageError, setStorageError] = useState(false);
  const finish = product.finishes.find(f => f.id === finishId)!;
  const inCart = cart.find(i => i.finish === finishId)?.quantity ?? 0;
  const available = finish.stock - inCart;
  const count = cart.reduce((n, i) => n + i.quantity, 0);
  const subtotal = count * product.price;
  useEffect(() => { try { localStorage.setItem(storageKey, JSON.stringify(cart)); setStorageError(false); } catch { setStorageError(true); } }, [cart]);
  function addToCart() {
    if (!available) return;
    const amount = Math.min(quantity, available);
    setCart(items => { const found = items.some(i => i.finish === finishId); return found ? items.map(i => i.finish === finishId ? { ...i, quantity: Math.min(finish.stock, i.quantity + amount) } : i) : [...items, { finish: finishId, quantity: amount }]; });
    setQuantity(1); setOverlay('cart');
  }
  function updateCart(id: FinishId, value: number) {
    const stock = product.finishes.find(f => f.id === id)!.stock;
    setCart(items => items.map(i => i.finish === id ? { ...i, quantity: Math.max(1, Math.min(stock, value)) } : i));
  }
  return <>
    <div className="announcement">A little less noise. A lot more you. <span>Complimentary shipping on every order <ArrowRight size={12}/></span></div>
    <header className="site-header"><a className="wordmark" href="#" aria-label="Forma home">forma<span>®</span></a><nav aria-label="Main navigation"><a className="active" href="#product">Headphones</a><a href="#details">The details</a><a href="#collection">Our collection</a></nav><button className="cart-button" onClick={() => setOverlay('cart')} aria-label={`Open shopping bag, ${count} items`}><span>Bag</span><ShoppingBag size={19}/><span className="cart-count">{count}</span></button></header>
    <main>
      <div className="breadcrumb"><a href="#collection">Collection</a><ChevronRight size={12}/><span>Forma One</span></div>
      <section id="product" className="product-layout">
        <div className="gallery"><div className="hero-art"><span className="eyebrow art-label">LESS NOISE. MORE FEELING.</span><span className="edition">01 / EVERYDAY ESSENTIALS</span><Headphones finish={finish} view={view}/><div className="art-footer"><span>Designed for your own rhythm.</span><span>{String(view + 1).padStart(2, '0')} / 04</span></div></div>
          <div className="thumbnails" aria-label="Product image gallery">{['The full picture', 'A closer look', 'Comfort, considered', 'Ready to go'].map((label, i) => <button key={label} className={view === i ? 'thumbnail selected' : 'thumbnail'} onClick={() => setView(i)} aria-label={`Show ${label.toLowerCase()}`} aria-pressed={view === i}><Headphones finish={finish} view={i}/><span>{label}</span></button>)}</div>
          <div className="gallery-note"><Leaf size={15}/><span>Thoughtful materials. A lighter footprint.</span></div>
        </div>
        <div className="product-info"><div className="eyebrow orange">FIND YOUR FREQUENCY</div><h1>Forma One<span>Your world. In tune.</span></h1><a className="rating" href="#reviews"><span className="stars" aria-label="4.8 out of 5 stars">★★★★★</span><strong>4.8</strong><span>128 sample reviews</span></a><div className="price">{money(product.price)}<span>USD · All the essentials, included.</span></div><p className="description">Find a little space in a busy world. Immersive sound, beautifully quiet moments, and all-day comfort. Made to move with you, wherever your day takes you.</p>
          <div className="finish-label">Color — <strong>{finish.name}</strong></div><div className="swatches" aria-label="Choose finish">{product.finishes.map(f => <button key={f.id} style={{ backgroundColor: f.color }} className={finishId === f.id ? 'swatch selected' : 'swatch'} aria-label={f.name} aria-pressed={finishId === f.id} onClick={() => { setFinishId(f.id); setQuantity(1); }}>{finishId === f.id && <Check size={17} color={f.id === 'ink' ? 'white' : '#383b31'}/>}</button>)}</div>
          <div className="stock"><span/>{available > 0 ? `In stock · ${available} available to add` : 'All available units are in your bag'}</div><div className="purchase-row"><Stepper value={Math.min(quantity, Math.max(1, available))} max={available} onChange={setQuantity} label="product quantity"/><button className="primary add-button" onClick={addToCart} disabled={!available}> {available ? 'Add to bag' : 'Stock limit reached'}<ShoppingBag size={18}/></button></div><p className="delivery"><Truck size={15}/>Free shipping · Ships in 1–2 business days</p>
          <div className="features"><span><Volume2/>Adaptive noise cancellation</span><span><HeadphonesIcon/>40 hours of listening</span><span><ShieldCheck/>2-year limited warranty</span><span><Leaf/>Recycled aluminum details</span></div>
          <div id="details" className="accordions"><details><summary>Shipping & returns <Plus size={16}/></summary><p>Demo policy: complimentary standard shipping within the US, with delivery in 3–5 business days after dispatch. Returns accepted within 30 days in original condition. This portfolio storefront does not fulfill orders.</p></details><details><summary>The finer details <Plus size={16}/></summary><dl><div><dt>Drivers</dt><dd>40 mm dynamic</dd></div><div><dt>Connectivity</dt><dd>Bluetooth 5.3 / USB-C audio</dd></div><div><dt>Battery</dt><dd>Up to 40 hours, ANC off</dd></div><div><dt>Weight</dt><dd>255 g</dd></div><div><dt>In the box</dt><dd>Headphones, case, USB-C cable</dd></div></dl></details></div>
        </div>
      </section>
      <section className="brand-strip"><span className="eyebrow">GOOD SOUND. NO COMPROMISE.</span><h2>A quieter world.<br/><em>A fuller experience.</em></h2><p>From the first note to the last train home, every detail is designed to help you feel more of what you love.</p><div className="sound-lines" aria-hidden="true">{Array.from({ length: 25 }, (_, i) => <i key={i} style={{ height: `${20 + Math.sin(i * .65) ** 2 * 70}px` }}/>)}</div></section>
      <section id="reviews" className="reviews"><div><span className="eyebrow">THE LISTENING NOTES</span><h2>Good things get heard.</h2><p>Illustrative reviews for this fictional product.</p></div><div className="review-score"><strong>4.8<span>/ 5</span></strong><span className="stars">★★★★★</span><span>Based on 128 sample reviews</span></div><blockquote><div className="stars" aria-label="5 out of 5 stars">★★★★★</div>“The kind of headphones you forget you're wearing. Until your favorite song comes on.”<footer>Alex M. <span>· Sample review</span></footer></blockquote></section>
      <section id="collection" className="collection"><div className="section-heading"><div><span className="eyebrow">BETTER TOGETHER</span><h2>A few good companions.</h2></div><span>Collection preview · Not available to purchase</span></div><div className="related-grid">{[{ name: 'Forma Case', type: 'A soft landing for your sound.', kind: 'case', price: 39 }, { name: 'Forma Stand', type: 'Everything in its right place.', kind: 'stand', price: 59 }, { name: 'Forma Cable', type: 'A beautiful connection.', kind: 'cable', price: 19 }].map(item => <article key={item.name}><div className={`accessory-art ${item.kind}`} role="img" aria-label={`Illustration of ${item.name}`}><div className="accessory-object"/><span>COMING SOON</span></div><div className="related-name"><h3>{item.name}</h3><span>{money(item.price)}</span></div><p>{item.type}</p></article>)}</div></section>
    </main>
    <footer className="site-footer"><a className="wordmark" href="#">forma<span>®</span></a><p>Sound, beautifully considered.</p><span>© {new Date().getFullYear()} Forma. A fictional storefront demo.</span><a href="#product">Back to the good stuff <ArrowUpRight size={15}/></a></footer>
    {overlay === 'cart' && <Overlay title={`Your bag (${count})`} onClose={() => setOverlay(null)} drawer>{cart.length ? <><div className="cart-items">{cart.map(item => { const f = product.finishes.find(v => v.id === item.finish)!; return <div className="cart-item" key={item.finish}><div className="cart-art"><Headphones finish={f}/></div><div><h3>{product.name}</h3><p>{f.name}</p><strong>{money(product.price * item.quantity)}</strong><Stepper value={item.quantity} max={f.stock} onChange={v => updateCart(item.finish, v)} label={`${f.name} quantity`}/><small>Maximum {f.stock} available</small></div><button className="icon-button remove" aria-label={`Remove ${f.name} headphones`} onClick={() => setCart(items => items.filter(i => i.finish !== item.finish))}><X size={17}/></button></div>; })}</div><div className="cart-summary"><div><strong>Subtotal</strong><strong>{money(subtotal)}</strong></div><p>Free shipping. Any taxes are not calculated in this demo.</p><button className="primary" onClick={() => setOverlay('checkout')}>Checkout demo <ArrowRight size={17}/></button><button className="text-button" onClick={() => setOverlay(null)}>Continue exploring</button></div></> : <div className="empty-cart"><ShoppingBag size={42} strokeWidth={1}/><h3>A little quiet is waiting.</h3><p>Your bag is empty. Find your favorite finish and make room for better sound.</p><button className="primary" onClick={() => setOverlay(null)}>Explore Forma One <ArrowRight size={17}/></button></div>}{storageError && <p role="status" className="storage-warning">Browser storage is unavailable. Your bag will only be saved for this visit.</p>}</Overlay>}
    {overlay === 'checkout' && <Overlay title="Just a little demonstration." onClose={() => setOverlay(null)}><div className="demo-icon"><ShieldCheck size={32}/></div><p className="modal-copy">This is a portfolio storefront for a fictional product. Payments are not processed, no order is placed, and no payment or personal information is collected.</p><div className="demo-total"><span>Your demo subtotal</span><strong>{money(subtotal)}</strong></div><p className="muted">Your bag is saved so you can keep exploring.</p><button className="primary" onClick={() => setOverlay('cart')}>Return to bag <ArrowRight size={17}/></button></Overlay>}
  </>;
}

