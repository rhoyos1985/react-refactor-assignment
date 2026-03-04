import { useGetDoctorSlotsQuery } from '../store/api/doctorsApi';
import { SlotCard } from './SlotCard';
import { shouldReportErrors } from '../utils/nameNormalizer';

interface DoctorSlotsProps {
  doctorId: number;
  doctorName: string;
  onClose: () => void;
}

export function DoctorSlots({ doctorId, doctorName, onClose }: DoctorSlotsProps) {
  const { data: slots, isLoading, isError, error } = useGetDoctorSlotsQuery(doctorId);

  if (isError && shouldReportErrors()) {
    console.error('Error fetching slots for doctor', { doctorId, error });
  }

  return (
    <div className="doctor-slots-modal">
      <div className="modal-header">
        <h2>Slots for {doctorName}</h2>
        <button onClick={onClose} className="close-btn">×</button>
      </div>
      
      <div className="modal-content">
        {isLoading && <div className="loading">Loading slots...</div>}
        
        {isError && (
          <div className="error">
            Unable to fetch slots. Please try again later.
          </div>
        )}
        
        {slots && slots.length === 0 && (
          <div className="no-slots">No available slots</div>
        )}
        
        {slots && slots.length > 0 && (
          <div className="slots-grid">
            {slots.map((slot, index) => (
              <SlotCard key={`${slot.start}-${index}`} slot={slot} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
