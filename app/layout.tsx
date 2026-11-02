import type { Metadata } from 'next';
import '../src/index.css';
export const metadata: Metadata = { title: 'Key Concepts Construction LLC', description: 'Custom homes, residential and commercial construction, remodels, and property management in the Greater Eastside.' };
export default function Layout({children}: {children: React.ReactNode}) {
 return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&display=swap" /></head><body>{children}</body></html>;
}
