import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { DoctorList } from '../src/components/DoctorList';
import { doctorsApi } from '../src/store/api/doctorsApi';

// Mock the API hooks
vi.mock('../src/store/api/doctorsApi', async () => {
  const actual = await vi.importActual('../src/store/api/doctorsApi');
  return {
    ...actual,
    useGetDoctorsQuery: vi.fn(),
  };
});

import { useGetDoctorsQuery } from '../src/store/api/doctorsApi';

const createTestStore = () =>
  configureStore({
    reducer: {
      [doctorsApi.reducerPath]: doctorsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(doctorsApi.middleware),
  });

describe('DoctorList', () => {
  it('should show loading state', () => {
    vi.mocked(useGetDoctorsQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: vi.fn(),
    } as ReturnType<typeof useGetDoctorsQuery>);

    render(
      <Provider store={createTestStore()}>
        <DoctorList />
      </Provider>
    );

    expect(screen.getByText('Loading doctors...')).toBeInTheDocument();
  });

  it('should show error state', () => {
    vi.mocked(useGetDoctorsQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: vi.fn(),
    } as ReturnType<typeof useGetDoctorsQuery>);

    render(
      <Provider store={createTestStore()}>
        <DoctorList />
      </Provider>
    );

    expect(screen.getByText('Unable to load doctors')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('should render doctors when loaded', () => {
    vi.mocked(useGetDoctorsQuery).mockReturnValue({
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ],
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    } as ReturnType<typeof useGetDoctorsQuery>);

    render(
      <Provider store={createTestStore()}>
        <DoctorList />
      </Provider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should display doctor IDs', () => {
    vi.mocked(useGetDoctorsQuery).mockReturnValue({
      data: [{ id: 42, name: 'Test Doctor' }],
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    } as ReturnType<typeof useGetDoctorsQuery>);

    render(
      <Provider store={createTestStore()}>
        <DoctorList />
      </Provider>
    );

    expect(screen.getByText('ID: 42')).toBeInTheDocument();
  });
});
