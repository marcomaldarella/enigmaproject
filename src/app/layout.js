import localFont from 'next/font/local'
import './globals.css'

import Providers from './Providers';

export const metadata = {
  title: 'Enigma',
  description: 'Enigma is a non-profit research organization based at Stanford University, leveraging deep learning for neuroscientific insight',
  icons: {
    icon: '/favicon.ico',       // percorso del tuo favicon
    // apple: '/apple-touch-icon.png',   // se vuoi aggiungere icone Apple
    // shortcut: '/favicon-16x16.png',   // o altre formati
  },
}

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
