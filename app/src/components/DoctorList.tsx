import { useState, useTransition } from 'react';
import { useGetDoctorsQuery } from '../store/api/doctorsApi';
import { DoctorCard } from './DoctorCard';
import { DoctorSlots } from './DoctorSlots';
import type { Doctor } from '../types';

export function DoctorList() {
  const { data: doctors, isLoading, isError, refetch } = useGetDoctorsQuery();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSelectDoctor = (doctor: Doctor) => {
    startTransition(() => {
      setSelectedDoctor(doctor);
    });
  };

  const handleCloseSlots = () => {
    setSelectedDoctor(null);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading doctors...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-container">
        <h2>Unable to load doctors</h2>
        <p>Please check your connection and try again.</p>
        <button onClick={() => refetch()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="doctor-list-container">
      <header className="header">
        <h1>Doctor Slots</h1>
        <p>Select a doctor to view available slots</p>
      </header>

      <div className="doctors-grid">
        {doctors?.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onSelect={handleSelectDoctor}
          />
        ))}
      </div>

      {selectedDoctor && (
        <div className="modal-overlay" onClick={handleCloseSlots}>
          <div onClick={(e) => e.stopPropagation()}>
            <DoctorSlots
              doctorId={selectedDoctor.id}
              doctorName={selectedDoctor.name}
              onClose={handleCloseSlots}
            />
          </div>
        </div>
      )}

      {isPending && <div className="transition-indicator">Loading...</div>}
    </div>
  );
}
