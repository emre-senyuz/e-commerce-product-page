import { useId } from 'react';
import type { Finish } from './product';
export default function Headphones({ finish, view = 0 }: { finish: Finish; view?: number }) {
  const id = useId().replaceAll(':', '');
  return <svg viewBox="0 0 600 540" role="img" aria-label={`${finish.name} headphones, ${['front three-quarter view', 'side detail', 'headband detail', 'travel case'][view]}`}>
    <defs>
      <linearGradient id={`${id}band`} x1="0" x2="1"><stop stopColor={finish.dark}/><stop offset=".35" stopColor={finish.color}/><stop offset=".6" stopColor="#eee9de"/><stop offset="1" stopColor={finish.dark}/></linearGradient>
      <linearGradient id={`${id}cup`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f2eee6"/><stop offset=".3" stopColor={finish.color}/><stop offset="1" stopColor={finish.dark}/></linearGradient>
      <filter id={`${id}shadow`}><feGaussianBlur stdDeviation="13"/></filter>
    </defs>
    <ellipse cx="302" cy="459" rx="155" ry="19" fill="#423a2e" opacity=".16" filter={`url(#${id}shadow)`}/>
    {view === 3 ? <g transform="rotate(-12 300 280)"><rect x="132" y="141" width="336" height="269" rx="103" fill={`url(#${id}cup)`}/><rect x="141" y="149" width="318" height="252" rx="96" fill="none" stroke={finish.dark} strokeWidth="2"/><path d="M250 146v-18q50-30 100 0v18" fill="none" stroke={finish.dark} strokeWidth="10"/><text x="300" y="286" textAnchor="middle" fill={finish.dark} fontSize="20" letterSpacing="6">forma</text></g> : <g transform={view === 1 ? 'translate(70 -30) rotate(22 300 270) scale(.9 1.05)' : view === 2 ? 'translate(-85 55) scale(1.3)' : 'rotate(-17 300 270)'}>
      <path d="M161 319V220C161 54 438 54 438 220v99" fill="none" stroke={finish.dark} strokeWidth="39"/>
      <path d="M161 310V220C161 54 438 54 438 220v90" fill="none" stroke={`url(#${id}band)`} strokeWidth="29"/>
      <path d="M177 204C188 86 409 83 422 204" fill="none" stroke={finish.color} strokeWidth="13"/>
      <path d="M160 245v94M437 245v94" stroke="#aaa79f" strokeWidth="16"/>
      <rect x="132" y="280" width="75" height="149" rx="37" fill={finish.dark}/><rect x="123" y="273" width="63" height="153" rx="31" fill={`url(#${id}cup)`}/>
      <rect x="369" y="274" width="77" height="154" rx="37" fill={finish.dark}/><rect x="390" y="266" width="80" height="159" rx="39" fill={`url(#${id}cup)`}/>
      <rect x="402" y="278" width="55" height="134" rx="27" fill="none" stroke={finish.color} strokeWidth="1.5"/>
      <text x="433" y="353" textAnchor="middle" transform="rotate(90 433 353)" fill={finish.dark} fontSize="12" letterSpacing="3">forma</text>
      <circle cx="431" cy="393" r="3" fill={finish.dark}/><path d="M415 402h9" stroke={finish.dark} strokeWidth="3" strokeLinecap="round"/>
    </g>}
  </svg>;
}
