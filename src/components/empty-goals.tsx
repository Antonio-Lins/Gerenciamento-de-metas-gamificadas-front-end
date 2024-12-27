import { Plus } from 'lucide-react'
import { DialogTrigger } from '@radix-ui/react-dialog'
import logo from '../assets/logo-in-orbit.svg'
import rocketLaunchIllustration from '../assets/rocket-launch-illustration.svg'
import { Button } from './ui/button'

export function EmptyGoals() {
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-6 px-4">
      <img
        src={logo}
        alt="Logo do in.orbit"
        className="w-40 h-auto"
      />

      <img
        src={rocketLaunchIllustration}
        alt="Ilustração de uma mulher controlando um lançamento de um foguete através de um controle remoto"
        className="w-72 h-auto"
      />

      <p className="text-zinc-300 leading-relaxed max-w-md text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button aria-label="Cadastrar nova meta">
          <Plus className="w-4 h-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </main>
  )
}
