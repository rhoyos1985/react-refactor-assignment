import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Doctor, Slot } from '../../types';

export const doctorsApi = createApi({
  reducerPath: 'doctorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const credentials = btoa('docplanner:docplanner');
      headers.set('Authorization', `Basic ${credentials}`);
      return headers;
    },
  }),
  tagTypes: ['Doctors', 'Slots'],
  endpoints: (builder) => ({
    getDoctors: builder.query<Doctor[], void>({
      query: () => '/doctors',
      providesTags: ['Doctors'],
    }),

    getDoctorSlots: builder.query<Slot[], number>({
      query: (doctorId) => `/doctors/${doctorId}/slots`,
      providesTags: (_result, _error, doctorId) => [
        { type: 'Slots', id: doctorId },
      ],
    }),
  }),
});

export const { 
  useGetDoctorsQuery, 
  useGetDoctorSlotsQuery,
  useLazyGetDoctorSlotsQuery,
} = doctorsApi;
