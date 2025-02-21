import localFont from 'next/font/local'
import './globals.css'

import Providers from './Providers';

export const metadata = {
  title: 'Enigma',
  description: 'Enigma is a non-profit research organization based at Stanford University, leveraging deep learning for neuroscientific insight',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
