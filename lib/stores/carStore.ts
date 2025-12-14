import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Car } from '@/types/car';

export interface FilterState {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

const initialFilters: FilterState = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
};

interface CarStore {
  formFilters: FilterState;
  appliedFilters: FilterState;
  favorites: Car[];

  setFormFilter: (name: keyof FilterState, value: string) => void;
  setAppliedFilters: () => void;
  resetFilters: () => void;
  toggleFavorite: (car: Car) => void;
}

export const useCarStore = create<CarStore>()(
  persist(
    (set, get) => ({
      // ---------- state ----------
      formFilters: initialFilters,
      appliedFilters: initialFilters,
      favorites: [],

      // ---------- actions ----------
      setFormFilter: (name, value) =>
        set(state => {
          if (state.formFilters[name] === value) return state;

          return {
            formFilters: {
              ...state.formFilters,
              [name]: value,
            },
          };
        }),

      setAppliedFilters: () =>
        set(state => ({
          appliedFilters: {
            ...state.formFilters,
            brand:
              state.formFilters.brand === 'all' ? '' : state.formFilters.brand,
          },
        })),

      resetFilters: () =>
        set(() => ({
          formFilters: initialFilters,
          appliedFilters: initialFilters,
        })),

      toggleFavorite: car =>
        set(state => {
          const isFavorite = state.favorites.some(fav => fav.id === car.id);

          return {
            favorites: isFavorite
              ? state.favorites.filter(fav => fav.id !== car.id)
              : [...state.favorites, car],
          };
        }),
    }),
    {
      name: 'car-favorites',
      partialize: state => ({ favorites: state.favorites }),
    }
  )
);
