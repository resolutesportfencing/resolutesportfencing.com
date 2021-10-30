import Image from 'next/image'

export function Logo() {
  return (
    <div className="mx-auto px-3">
      <Image
        src="/fencer_salute.png"
        alt="Fencer saluting"
        height={60}
        width={15} 
      />
    </div>
  )
}