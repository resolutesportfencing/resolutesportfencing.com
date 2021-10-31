import fencerSalute from '../public/fencer_salute.png'

export function Logo() {
  return (
    <div className="mx-auto px-3">
      <img src={fencerSalute.src} alt="Fencer saluting" height={60} width={15} />
    </div>
  )
}