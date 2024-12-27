import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingGoals } from '../http/get-pending-goals'
import { createGoalCompletion } from '../http/create-goal-completion'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
  })

  if (isLoading) {
    return <p className="text-sm text-zinc-500">Carregando metas pendentes...</p>
  }

  if (!data?.pendingGoals?.length) {
    return <p className="text-sm text-zinc-500">Sem metas pendentes no momento.</p>
  }

  async function handleCreateGoalCompletion(goalId: string) {
    try {
      await createGoalCompletion({ goalId })

      queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    } catch {
      alert('Erro ao completar a meta. Tente novamente.')
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.pendingGoals.map(goal => (
        <OutlineButton
          key={goal.id}
          onClick={() => handleCreateGoalCompletion(goal.id)}
          disabled={(goal?.completionCount ?? 0) >= (goal?.desiredWeeklyFrequency ?? 1)}
        >
          <Plus className="w-4 h-4 text-zinc-600" />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  )
}
