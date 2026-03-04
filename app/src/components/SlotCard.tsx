import type { Slot } from '../types';

interface SlotCardProps {
  slot: Slot;
}

export function SlotCard({ slot }: SlotCardProps) {
  const startDate = new Date(slot.start);
  const endDate = new Date(slot.end);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className="slot-card">
      <div className="slot-date">{formatDate(startDate)}</div>
      <div className="slot-time">
        {formatTime(startDate)} - {formatTime(endDate)}
      </div>
    </div>
  );
}
