export interface Doctor {
  id: number;
  name: string;
  error?: boolean;
}

export interface Slot {
  id?: number;
  doctorId: number;
  start: string;
  end: string;
  createdAt?: string;
}

export interface DoctorsApiResponse {
  doctors: Doctor[];
}

export interface SlotsApiResponse {
  slots: Slot[];
}
