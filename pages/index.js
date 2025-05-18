import dynamic from 'next/dynamic'

const PaginaGeradorEstampa = dynamic(() => import('../PaginaGeradorEstampa'), {
  ssr: false
})

export default function Home() {
  return <PaginaGeradorEstampa />
}