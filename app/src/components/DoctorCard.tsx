import type { Doctor } from '../types';
import { normalizeName } from '../utils/nameNormalizer';

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, onSelect }: DoctorCardProps) {
  const normalizedName = normalizeName(doctor.name);

  return (
    <div 
      className={`doctor-card ${doctor.error ? 'has-error' : ''}`}
      onClick={() => onSelect(doctor)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(doctor)}
    >
      <div className="doctor-avatar">
        {normalizedName.charAt(0)}
      </div>
      <div className="doctor-info">
        <h3>{normalizedName}</h3>
        <span className="doctor-id">ID: {doctor.id}</span>
      </div>
      {doctor.error && (
        <div className="error-badge" title="Sync error">⚠</div>
      )}
    </div>
  );
}
